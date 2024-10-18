package results

import (
	"encoding/json"
	"net/http"
	"slices"
	"verivote/api/database"
	"verivote/api/utils"
)

// Get godoc
//
//	@Summary		Gets results of a poll
//	@Description	Calculates the results of the poll specified by its ID. Automatically decides how to evaluate the
//	@Description	poll by its type.
//	@Tags			polls
//	@Produce		json
//	@Param			id	path		string	true	"Poll ID"
//	@Success		200	{object}	utils.PollSummary
//	@Failure		403	{object}	nil
//	@Failure		500	{object}	nil
//
//	@Router			/results/{id} [get]
func Get(w http.ResponseWriter, id string) {

	poll, ok := database.GetPollById(id)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	votes, ok := database.GetVotesByPollId(id)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var results []int32
	switch poll.Method {
	case 0:
		results = utils.GetInstantRunoffResults(votes, len(poll.Options))
	case 1:
		results = utils.GetPositionalVotingResults(votes, len(poll.Options))
	case 2:
		results = utils.GetScoreVotingResults(votes, len(poll.Options))
	case 3, 4:
		results = utils.GetApprovalOrPluralityVotingResults(votes, len(poll.Options))
	default:
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var maxVotes int
	switch poll.Method {
	case 0, 3, 4:
		maxVotes = len(votes)
	case 1:
		maxVotes = len(votes) * len(poll.Options)
	case 2:
		maxVotes = len(votes) * 10
	}

	var winners []int32
	maxValue := slices.Max(results)
	if poll.Majority && maxValue > int32(maxVotes)/2 {
		for i, r := range results {
			if r == maxValue {
				winners = append(winners, int32(i))
			}
		}
	}

	summary := utils.PollSummary{
		Name:        poll.Name,
		Method:      poll.Method,
		VoterCount:  len(votes),
		Winners:     winners,
		Options:     poll.Options,
		Results:     results,
		ClosingDate: poll.OpenUntil,
	}

	err := json.NewEncoder(w).Encode(summary)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
}
