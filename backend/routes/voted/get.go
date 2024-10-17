package voted

import (
	"encoding/json"
	"net/http"
	"verivote/api/database"
	"verivote/api/utils"
)

// Get godoc
//
//	@Summary		Checks if a user has voted in a poll
//	@Description	Checks if a user (based on IP) has voted in a poll (provided in path).
//	@Tags			votes
//	@Produce		json
//	@Accept			plain
//	@Param			id	path		string	true	"Poll ID"
//	@Success		200	{object}	boolean
//	@Failure		400	{object}	nil
//	@Failure		404	{object}	nil
//
//	@Router			/voted/{id} [get]
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
