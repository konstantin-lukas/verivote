package poll

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
)

var methods = []string{"Instant-Runoff", "Positional Voting", "Score Voting", "Approval Voting", "Plurality Voting"}

func contains(slice []string, value string) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}

func containsInvalidStringSize(slice []string, min int, max int) bool {
	for _, v := range slice {
		if len(v) < min || len(v) > max {
			return true
		}
	}
	return false
}

func PostPoll(w http.ResponseWriter, r *http.Request) {

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
	votingMethod := form.Get("votingMethod")
	if !contains(methods, votingMethod) {
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
	/*majority := true
	if form.Get("majority") == "" {
		majority = false
	}*/

	// VALIDATE POLL CHOICES
	options := form["options[]"]
	if len(options) < 2 || len(options) > int(maxOptions) || containsInvalidStringSize(options, 0, 100) {
		http.Error(w, "Invalid poll choices", http.StatusBadRequest)
		return
	}

	w.Header().Set("Location", fmt.Sprintf("%s/poll/23985723897632908", os.Getenv("NEXT_PUBLIC_ORIGIN")))
	w.WriteHeader(http.StatusCreated)
}
