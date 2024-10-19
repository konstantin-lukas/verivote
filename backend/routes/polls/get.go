package polls

import (
	"encoding/json"
	"net/http"
	"verivote/api/database"
	"verivote/api/utils"
)

// Get godoc
//
//	@Summary		Returns a user's polls.
//	@Description	Retrieves all polls that a user created based on the email in their JWT token.
//	@Tags			polls
//	@Produce		json
//	@Success		200	{object}	[]utils.Poll
//	@Failure		400	{object}	nil
//	@Failure		404	{object}	nil
//
// @Security		JWTAuth
//
// @Router			/polls [get]
func Get(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("email").(string)
	if !utils.IsValidEmail(email) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	results, ok := database.GetPollsByEmail(email)
	if !ok {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	err := json.NewEncoder(w).Encode(results)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
}
