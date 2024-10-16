package utils_test

import (
	"testing"
	. "verivote/api/utils"
)

type testCase struct {
	Selection []int32
	Options   []string
	Expected  bool
}

var validateRankingTests = []testCase{
	{[]int32{2}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 1}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 4, 1}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 0, 1}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{2, 0, 0}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 0, 1, 0}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 0, 1, 3}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{}, []string{}, true},
}

func TestValidateRanking(t *testing.T) {
	for _, test := range validateRankingTests {
		vote := Vote{Selection: test.Selection}
		poll := Poll{Options: test.Options}
		ok := ValidateRanking(&vote, &poll)
		if ok != test.Expected {
			t.Fatalf("Unexpected result for vote %v and poll %v", vote.Selection, poll.Options)
		}
	}
}

var validateScoresTests = []testCase{
	{[]int32{2}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 9}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 9, 1}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{2, 9, 0}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 9, 11}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 9, 10}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{}, []string{}, true},
}

func TestValidateScores(t *testing.T) {
	for _, test := range validateScoresTests {
		vote := Vote{Selection: test.Selection}
		poll := Poll{Options: test.Options}
		ok := ValidateScores(&vote, &poll)
		if ok != test.Expected {
			t.Fatalf("Unexpected result for vote %v and poll %v", vote.Selection, poll.Options)
		}
	}
}

var validateApprovalTests = []testCase{
	{[]int32{2}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{2, 1}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{2, 1, 0}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{2, 1, 1}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 1, 0, -1}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{2, 1, 0, 3}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{}, []string{}, false},
}

func TestValidateApproval(t *testing.T) {
	for _, test := range validateApprovalTests {
		vote := Vote{Selection: test.Selection}
		poll := Poll{Options: test.Options}
		ok := ValidateApproval(&vote, &poll)
		if ok != test.Expected {
			t.Fatalf("Unexpected result for vote %v and poll %v", vote.Selection, poll.Options)
		}
	}
}

var validatePluralityTests = []testCase{
	{[]int32{2}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{3}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{0}, []string{"Sushi", "Pizza", "Pineapple"}, true},
	{[]int32{-1}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{}, []string{"Sushi", "Pizza", "Pineapple"}, false},
	{[]int32{1}, []string{"Pineapple"}, false},
	{[]int32{0}, []string{"Pineapple"}, true},
	{[]int32{0}, []string{}, false},
	{[]int32{}, []string{}, false},
}

func TestValidatePlurality(t *testing.T) {
	for _, test := range validatePluralityTests {
		vote := Vote{Selection: test.Selection}
		poll := Poll{Options: test.Options}
		ok := ValidatePlurality(&vote, &poll)
		if ok != test.Expected {
			t.Fatalf("Unexpected result for vote %v and poll %v", vote.Selection, poll.Options)
		}
	}
}
