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
	PollId  string  `json:"pollId"`
	Choices []int32 `json:"choices,omitempty"`
	Scores  []int32 `json:"scores,omitempty"`
	Ranking []int32 `json:"ranking,omitempty"`
}

func PostVote(w http.ResponseWriter, r *http.Request) {

	ip, ok := utils.GetClientIp(r)
	if !ok {
		http.Error(w, "Client IP Not Found", http.StatusBadRequest)
		return
	}

	// CHECK IF USER HAS VOTED BEFORE
	ipCheckCh := make(chan bool)
	go func() {
		collection := database.MongoClient.Database("verivote").Collection("votes")
		filter := bson.D{{"ip", ip}}
		result := collection.FindOne(context.TODO(), filter)
		ipCheckCh <- result.Err() == nil
	}()

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

	switch poll.Method {
	case 0, 1: // INSTANT-RUNOFF, POSITIONAL VOTING
	case 2: // SCORE VOTING
	case 3: // APPROVAL VOTING
	case 4: // PLURALITY VOTING

	}

	if <-ipCheckCh {
		http.Error(w, "You have already cast your vote", http.StatusForbidden)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
