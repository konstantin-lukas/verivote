package routes

import (
	"net/http"
	"verivote/api/routes/poll"
)

func HandlePoll(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		poll.PostPoll(w, r)
		return
	}
	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}
