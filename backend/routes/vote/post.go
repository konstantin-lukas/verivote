package vote

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"verivote/api/database"
	"verivote/api/utils"
)

type Vote struct {
	PollId    string  `json:"pollId"`
	Selection []int32 `json:"selection"`
}

func PostVote(w http.ResponseWriter, r *http.Request) {

	ip, ok := utils.GetClientIp(r)
	if !ok {
		http.Error(w, "Client IP Not Found", http.StatusBadRequest)
		return
	}

	var payload Vote
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	poll, ok := database.GetPollById(payload.PollId)
	if !ok {
		http.Error(w, "Unknown poll ID", http.StatusNotFound)
		return
	}

	collection := database.MongoClient.Database("verivote").Collection("votes")

	// THE MEANING OF THE VOTE SELECTION DEPENDS ON THE VOTING METHOD WHICH IS WHY WE MAKE DIFFERENT ASSERTIONS
	var doc bson.M
	switch poll.Method {
	case 0, 1: // INSTANT-RUNOFF, POSITIONAL VOTING
		// A: ASSERT THE RANKING HAS THE SAME LENGTH AS THE AMOUNT OF OPTIONS IN THE POLL
		if len(payload.Selection) != len(poll.Options) {
			http.Error(w, "Incorrect ranking", http.StatusBadRequest)
			return
		}
		// B: ASSERT THAT EACH OPTION IS CONTAINED IN THE RANKING
		for i := int32(0); i < int32(len(poll.Options)); i++ {
			containsValue := false
			for _, j := range payload.Selection {
				if i == j {
					containsValue = true
				}
			}
			if !containsValue {
				http.Error(w, "Incorrect ranking", http.StatusBadRequest)
				return
			}
		}
		// A AND B => THE SELECTION RANKS EACH AVAILABLE OPTION EXACTLY ONCE
	case 2: // SCORE VOTING
		// A: ASSERT THE SELECTION CONTAINS AS MANY SCORES AS THERE ARE OPTIONS IN THE POLL
		// B: ASSERT EACH OPTION IS ASSIGNED A SCORE FROM 1 TO 10
		if len(payload.Selection) != len(poll.Options) || utils.ContainsOutOfRangeValue(payload.Selection, 1, 10) {
			http.Error(w, "Incorrect scores", http.StatusBadRequest)
			return
		}
	case 3: // APPROVAL VOTING
		// A: ASSERT THE SELECTION CONTAINS AT LEAST ONE VOTE
		// B: ASSERT THE SELECTION CONTAINS NO MORE OPTIONS THAT IN THE POLL
		// C: ASSERT THAT ALL SELECTED CANDIDATES ARE IN THE POLL
		if len(payload.Selection) < 1 ||
			len(payload.Selection) > len(poll.Options) ||
			utils.ContainsOutOfRangeValue(payload.Selection, 0, int32(len(poll.Options)-1)) {
			http.Error(w, "Incorrect choices", http.StatusBadRequest)
			return
		}

		// D: ASSERT THAT THE SELECTION CONTAINS NO DUPLICATES
		for i, vi := range payload.Selection {
			for j, vj := range payload.Selection {
				if i != j && vi == vj {
					http.Error(w, "Incorrect choices", http.StatusBadRequest)
					return
				}
			}
		}
	case 4: // PLURALITY VOTING
		// A: ASSERT THAT EXACTLY ON CANDIDATE WAS SELECTED
		// B: ASSERT THAT ONLY VALID OPTIONS WERE SELECTED
		if len(payload.Selection) != 1 ||
			utils.ContainsOutOfRangeValue(payload.Selection, 0, int32(len(poll.Options)-1)) {
			http.Error(w, "Incorrect choice", http.StatusBadRequest)
			return
		}
	}
	doc = bson.M{
		"ip":        ip,
		"pollId":    poll.Id,
		"selection": payload.Selection,
	}

	_, err = collection.InsertOne(context.TODO(), doc)
	if err != nil {
		http.Error(w, "You have already voted", http.StatusForbidden)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
