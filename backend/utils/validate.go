package utils

func ValidateRanking(payload *Vote, poll *Poll) bool {
	// A: ASSERT THE RANKING HAS THE SAME LENGTH AS THE AMOUNT OF OPTIONS IN THE POLL
	if len(payload.Selection) != len(poll.Options) {
		return false
	}
	// B: ASSERT THAT EACH OPTION IS CONTAINED IN THE RANKING
	for i := int32(0); i < int32(len(poll.Options)); i++ {
		containsValue := false
		for _, j := range payload.Selection {
			if i == j {
				containsValue = true
			}
		}
		if !containsValue {
			return false
		}
	}
	// A AND B => THE SELECTION RANKS EACH AVAILABLE OPTION EXACTLY ONCE
	return true
}

func ValidateScores(payload *Vote, poll *Poll) bool {
	// A: ASSERT THE SELECTION CONTAINS AS MANY SCORES AS THERE ARE OPTIONS IN THE POLL
	// B: ASSERT EACH OPTION IS ASSIGNED A SCORE FROM 1 TO 10
	if len(payload.Selection) != len(poll.Options) || ContainsOutOfRangeValue(payload.Selection, 1, 10) {
		return false
	}
	return true
}

func ValidateApproval(payload *Vote, poll *Poll) bool {
	// A: ASSERT THE SELECTION CONTAINS AT LEAST ONE VOTE
	// B: ASSERT THE SELECTION CONTAINS NO MORE OPTIONS THAT IN THE POLL
	// C: ASSERT THAT ALL SELECTED CANDIDATES ARE IN THE POLL
	if len(payload.Selection) < 1 ||
		len(payload.Selection) > len(poll.Options) ||
		ContainsOutOfRangeValue(payload.Selection, 0, int32(len(poll.Options)-1)) {
		return false
	}

	// D: ASSERT THAT THE SELECTION CONTAINS NO DUPLICATES
	for i, vi := range payload.Selection {
		for j, vj := range payload.Selection {
			if i != j && vi == vj {
				return false
			}
		}
	}

	return true
}

func ValidatePlurality(payload *Vote, poll *Poll) bool {
	// A: ASSERT THAT EXACTLY ON CANDIDATE WAS SELECTED
	// B: ASSERT THAT ONLY VALID OPTIONS WERE SELECTED
	if len(payload.Selection) != 1 ||
		ContainsOutOfRangeValue(payload.Selection, 0, int32(len(poll.Options)-1)) {
		return false
	}
	return true
}
