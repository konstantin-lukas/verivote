package account

import (
	"net/http"
	"verivote/api/database"
)

// Delete godoc
//
//	@Summary		Deletes a user's polls and all related votes.
//	@Description	Tries to delete a user's polls and related votes if and only if the email in the provided auth matches the poll.
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
func Delete(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("email").(string)

	if !database.DeleteAccount(email) {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
