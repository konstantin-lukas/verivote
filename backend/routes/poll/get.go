package poll

import (
	"encoding/json"
	"net/http"
	"verivote/api/database"
)

// Get godoc
//
//	@Summary		Gets a single Poll from the database.
//	@Description	Retrieves a single poll by its ID in the path.
//	@Tags			polls
//	@Produce		json
//	@Param			id	path		string	true	"Poll ID"
//	@Success		200	{object}	utils.Poll
//	@Failure		404	{object}	nil
//
//	@Router			/poll/{id} [get]
func Get(w http.ResponseWriter, id string) {

	poll, ok := database.GetPollById(id)
	if !ok {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	err := json.NewEncoder(w).Encode(poll)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
}
