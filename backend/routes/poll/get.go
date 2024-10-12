package poll

import (
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"time"
	"verivote/api/database"
)

type Poll struct {
	Id        primitive.ObjectID `bson:"_id"`
	OpenUntil time.Time
	Name      string
	Options   []string
	Majority  bool
	Method    string
}

func GetPoll(w http.ResponseWriter, id string) {
	collection := database.MongoClient.Database("verivote").Collection("polls")
	hex, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid poll ID", http.StatusBadRequest)
		return
	}
	filter := bson.D{{"_id", hex}}
	response := collection.FindOne(context.TODO(), filter)

	var result Poll
	err = response.Decode(&result)
	if err != nil {
		http.Error(w, "Unknown poll ID", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(result)
	if err != nil {
		http.Error(w, "Unknown poll ID", http.StatusNotFound)
		return
	}
}
