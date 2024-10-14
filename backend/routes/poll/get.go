package poll

import (
	"encoding/json"
	"net/http"
	"verivote/api/database"
)

func GetPoll(w http.ResponseWriter, id string) {

	poll, ok := database.GetPollById(id)
	if !ok {
		http.Error(w, "Unknown poll ID", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(poll)
	if err != nil {
		http.Error(w, "Unknown poll ID", http.StatusNotFound)
		return
	}
}
