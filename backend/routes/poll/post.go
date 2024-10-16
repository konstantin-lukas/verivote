package poll

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	"verivote/api/database"
	"verivote/api/utils"
)

func Post(w http.ResponseWriter, r *http.Request) {

	maxOptions, err := strconv.ParseInt(os.Getenv("NEXT_PUBLIC_MAX_OPTIONS_PER_POLL"), 10, 64)
	if err != nil {
		http.Error(w, "Missing environment variables prevented processing the request", http.StatusInternalServerError)
		return
	}

	err = r.ParseForm()
	if err != nil {
		http.Error(w, "Unable to parse form data", http.StatusBadRequest)
		return
	}

	// VALIDATE VOTING METHOD
	form := r.PostForm
	v, err := strconv.ParseInt(form.Get("votingMethod"), 10, 32)
	votingMethod := int32(v)
	if err != nil || !utils.Contains(utils.VotingMethods, votingMethod) {
		http.Error(w, "Unknown voting method", http.StatusBadRequest)
		return
	}

	// VALIDATE DATE
	date := form.Get("date")
	parsedDate, err := time.Parse(time.RFC3339, date)
	if err != nil || parsedDate.Before(time.Now()) {
		http.Error(w, "Invalid date", http.StatusBadRequest)
		return
	}

	// VALIDATE NAME
	name := form.Get("name")
	if len(name) == 0 || len(name) > 200 {
		http.Error(w, "Invalid name", http.StatusBadRequest)
		return
	}

	// PARSE MAJORITY
	majority := true
	if form.Get("majority") == "" {
		majority = false
	}

	// VALIDATE POLL CHOICES
	options := form["options[]"]
	if len(options) < 2 || len(options) > int(maxOptions) || utils.ContainsInvalidStringSize(options, 0, 100) {
		http.Error(w, "Invalid poll choices", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("email").(string)
	if !utils.IsValidEmail(email) {
		http.Error(w, "Invalid JWT payload", http.StatusBadRequest)
		return
	}

	collection := database.MongoClient.Database("verivote").Collection("polls")

	doc := bson.M{
		"name":         name,
		"options":      options,
		"majority":     majority,
		"method":       votingMethod,
		"creationTime": time.Now(),
		"openUntil":    parsedDate,
		"userEmail":    email,
	}

	result, err := collection.InsertOne(context.TODO(), doc)
	if err != nil {
		log.Println(err)
		http.Error(w, "Database connection failed", http.StatusInternalServerError)
		return
	}

	id := result.InsertedID.(primitive.ObjectID).Hex()

	w.Header().Set("Location", fmt.Sprintf("%s/poll/%s", os.Getenv("NEXT_PUBLIC_ORIGIN"), id))
	w.WriteHeader(http.StatusCreated)
}
