package vote

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"verivote/api/database"
	"verivote/api/utils"
)

func Post(w http.ResponseWriter, r *http.Request) {

	ip, ok := utils.GetClientIp(r)
	if !ok {
		http.Error(w, "Client IP Not Found", http.StatusBadRequest)
		return
	}

	var payload utils.Vote
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
	ok = false
	switch poll.Method {
	case 0, 1: // INSTANT-RUNOFF, POSITIONAL VOTING
		ok = utils.ValidateRanking(&payload, &poll)
	case 2: // SCORE VOTING
		ok = utils.ValidateScores(&payload, &poll)
	case 3: // APPROVAL VOTING
		ok = utils.ValidateApproval(&payload, &poll)
	case 4: // PLURALITY VOTING
		ok = utils.ValidatePlurality(&payload, &poll)
	}

	if !ok {
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	doc := bson.M{
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
