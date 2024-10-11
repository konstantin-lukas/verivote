package routes

import (
	"fmt"
	"net/http"
	"os"
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

func HandlePoll(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		postPoll(w, r)
		return
	}
	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}

func postPoll(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Unable to parse form data", http.StatusBadRequest)
		return
	}

	form := r.PostForm
	votingMethod := form.Get("votingMethod")
	if !contains(methods, votingMethod) {
		http.Error(w, "Unknown voting method", http.StatusBadRequest)
		return
	}
	date := form.Get("date")
	parsedDate, err := time.Parse(time.RFC3339, date)
	if err != nil || parsedDate.Before(time.Now()) {
		http.Error(w, "Invalid date", http.StatusBadRequest)
		return
	}
	//name := form.Get("name")
	//majority := form.Get("majority")
	//options := form["options[]"]

	http.Redirect(w, r, fmt.Sprintf("%s/poll/23985723897632908", os.Getenv("ORIGIN")), http.StatusFound)
}
