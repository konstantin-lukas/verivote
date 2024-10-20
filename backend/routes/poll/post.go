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

// Post godoc
//
//	@Summary		Create a new poll.
//	@Description	Tries to create a new poll and on success returns a URI to the newly created poll.
//	@Tags			polls
//	@Accept			x-www-form-urlencoded
//	@Produce		plain
//	@Param			majority		formData	boolean		false	"Indicates whether a candidate needs a majority to win."
//	@Param			votingMethod	formData	int32		true	"A number representing the type of poll to create."
//	@Param			date			formData	string		true	"An RFC3339 datetime string indicating the closing date of the poll."
//	@Param			name			formData	string		true	"The title of the poll."
//	@Param			options			formData	[]string	true	"The options/candidates in the poll."
//	@Success		201				{object}	nil
//	@Failure		400				{object}	nil
//	@Failure		401				{object}	nil
//	@Failure		404				{object}	nil
//	@Failure		500				{object}	nil
//	@Header			201				{string}	Location	"/poll/{id}"
//
//	@Security		JWTAuth
//
//	@Router			/poll [post]
func Post(w http.ResponseWriter, r *http.Request) {

	maxOptions, err := strconv.ParseInt(os.Getenv("NEXT_PUBLIC_MAX_OPTIONS_PER_POLL"), 10, 64)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = r.ParseForm()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// VALIDATE VOTING METHOD
	form := r.PostForm
	v, err := strconv.ParseInt(form.Get("votingMethod"), 10, 32)
	votingMethod := int32(v)
	if err != nil || !utils.Contains(utils.VotingMethods, votingMethod) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// VALIDATE DATE
	date := form.Get("date")
	parsedDate, err := time.Parse(time.RFC3339, date)
	if err != nil || parsedDate.Before(time.Now()) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// VALIDATE NAME
	name := form.Get("name")
	if len(name) == 0 || len(name) > 200 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// PARSE MAJORITY
	majority := true
	if form.Get("majority") == "" {
		majority = false
	}

	// VALIDATE POLL CHOICES
	options := form["options"]
	if len(options) < 2 || len(options) > int(maxOptions) || utils.ContainsInvalidStringSize(options, 0, 100) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	email := r.Context().Value("email").(string)

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
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	id := result.InsertedID.(primitive.ObjectID).Hex()

	w.Header().Set("Location", fmt.Sprintf("%s/poll/%s", os.Getenv("NEXT_PUBLIC_ORIGIN"), id))
	w.WriteHeader(http.StatusCreated)
}
