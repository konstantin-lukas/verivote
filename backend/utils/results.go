package utils

// GetInstantRunoffResults - This function calculates the instant-runoff results for a list of Votes.
// It assumes that the Selection property of each vote is the same length n and contains the numbers from 0 to n-1 in
// arbitrary order without any duplicates.
// WARNING: This function modifies the input.
func GetInstantRunoffResults(votes []Vote, choiceCount int) []int32 {
	results := make([]int32, choiceCount)
	if len(votes) == 0 {
		return results
	}
	// DISTRIBUTE FIRST CHOICES
	for _, vote := range votes {
		results[vote.Selection[0]]++
	}
	// REDISTRIBUTE VOTES
	for round := 0; round < choiceCount; round++ {
		// A: CHECK IF A SINGLE CANDIDATE HAS A MAJORITY; IF SO QUIT
		// B: FIND THE FEWEST AMOUNT OF VOTES THAT'S NOT ZERO
		fewestVotes := int32(len(votes))
		for _, result := range results {
			if result > int32(len(votes))/2 { // A
				return results
			}
			if result > 0 && result < fewestVotes { // B
				fewestVotes = result
			}
		}

		// GET THE INDICES OF THE CANDIDATES WITH FEWEST VOTES
		var losers []int32
		for i, result := range results {
			if result == fewestVotes {
				losers = append(losers, int32(i))
			}
		}

		// REDISTRIBUTE VOTES FOR THE CANDIDATE(S) IN LAST PLACE
		for _, loser := range losers {
			for i := 0; i < len(votes); i++ {
				if votes[i].Selection[0] == loser {
					if len(votes[i].Selection) > 1 {
						results[loser]--
						results[votes[i].Selection[1]]++
						votes[i].Selection = votes[i].Selection[1:]
					}
				}
			}
		}
	}
	return results
}

// GetPositionalVotingResults - This function calculates the positional voting results for a list of Votes.
// It assumes that the Selection property of each vote is the same length n and contains the numbers from 0 to n-1 in
// arbitrary order without any duplicates.
func GetPositionalVotingResults(votes []Vote, choiceCount int) []int32 {
	results := make([]int32, choiceCount)
	if len(votes) == 0 {
		return results
	}
	for _, vote := range votes {
		for i, choice := range vote.Selection {
			results[choice] += int32(choiceCount - i)
		}
	}
	return results
}

// GetScoreVotingResults - This function calculates the score voting results for a list of Votes.
// It assumes that the Selection property of each vote is the same length and each element in the array is a value
// between 1 and 10
func GetScoreVotingResults(votes []Vote, choiceCount int) []int32 {
	results := make([]int32, choiceCount)
	for _, vote := range votes {
		for i, score := range vote.Selection {
			results[i] += score
		}
	}
	return results
}

// GetApprovalOrPluralityVotingResults - This function calculates the approval voting results for a list of Votes.
// It assumes that the Selection property of each vote contains at least one element and no more than the
// specified choiceCount. This function is a generalized version of the plurality voting approach and can be used
// to calculate the results of both an approval and a plurality vote.
func GetApprovalOrPluralityVotingResults(votes []Vote, choiceCount int) []int32 {
	results := make([]int32, choiceCount)
	for _, vote := range votes {
		for _, choice := range vote.Selection {
			results[choice]++
		}
	}
	return results
}