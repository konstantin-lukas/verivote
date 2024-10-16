package voted

import (
	"encoding/json"
	"net/http"
	"verivote/api/database"
	"verivote/api/utils"
)

func Get(w http.ResponseWriter, r *http.Request, id string) {
	ip, ok := utils.GetClientIp(r)
	if !ok {
		http.Error(w, "Client IP Not Found", http.StatusBadRequest)
		return
	}
	hasVoted := database.HasUserVoted(id, ip)
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(struct {
		HasVoted bool `json:"hasVoted"`
	}{hasVoted})
	if err != nil {
		http.Error(w, "Unknown poll ID", http.StatusNotFound)
		return
	}
}
