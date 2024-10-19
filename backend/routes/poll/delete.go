package poll

import (
	"net/http"
	"verivote/api/database"
	"verivote/api/utils"
)

// Delete godoc
//
//	@Summary		Deletes a poll.
//	@Description	Tries to delete a poll by ID if and only if the email in the provided auth matches the poll.
//	@Tags			polls
//	@Param			id	path		string	true	"Poll ID"
//	@Success		204	{object}	nil
//	@Failure		400	{object}	nil
//	@Failure		401	{object}	nil
//	@Failure		404	{object}	nil
//
//	@Security		JWTAuth
//
//	@Router			/poll [post]
func Delete(w http.ResponseWriter, r *http.Request, id string) {

	email := r.Context().Value("email").(string)
	if !utils.IsValidEmail(email) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !database.DeletePoll(id, email) {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
