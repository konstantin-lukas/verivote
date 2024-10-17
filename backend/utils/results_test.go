package utils_test

import (
	"reflect"
	"testing"
	. "verivote/api/utils"
)

type resultTestCase struct {
	Votes       []Vote
	Expected    []int32
	ChoiceCount int
}

var instantRunoffTests = []resultTestCase{
	// SINGLE VOTE
	{[]Vote{
		{Selection: []int32{1, 3, 2, 0}},
	}, []int32{0, 1, 0, 0}, 4},
	// REGULAR VOTES
	{[]Vote{
		{Selection: []int32{1, 0, 3, 2}},
		{Selection: []int32{1, 2, 0, 3}},
		{Selection: []int32{2, 3, 0, 1}},
		{Selection: []int32{2, 3, 1, 0}},
		{Selection: []int32{0, 3, 2, 1}},
	}, []int32{0, 2, 3, 0}, 4},
	// TWO LOSING CANDIDATES IN FIRST ROUND
	{[]Vote{
		{Selection: []int32{0, 1, 2}},
		{Selection: []int32{2, 1, 0}},
	}, []int32{0, 2, 0}, 3},
	// TIE
	{[]Vote{
		{Selection: []int32{0, 1}},
		{Selection: []int32{1, 0}},
	}, []int32{1, 1}, 2},
	// NO VOTES
	{[]Vote{}, []int32{0, 0}, 2},
}

func TestInstantRunoffResults(t *testing.T) {
	for _, test := range instantRunoffTests {
		if result := GetInstantRunoffResults(test.Votes, test.ChoiceCount); !reflect.DeepEqual(result, test.Expected) {
			t.Fatalf("Unexpected result; Received: %v, Expected: %v", result, test.Expected)
		}
	}
}

var positionalVotingTests = []resultTestCase{
	// NO VOTES
	{[]Vote{}, []int32{0, 0, 0, 0}, 4},
	// SINGLE VOTE
	{[]Vote{
		{Selection: []int32{1, 3, 2, 0}},
	}, []int32{1, 4, 2, 3}, 4},
	// REGULAR VOTES
	{[]Vote{
		{Selection: []int32{1, 3, 2, 0}},
		{Selection: []int32{2, 1, 0, 3}},
		{Selection: []int32{1, 2, 0, 3}},
		{Selection: []int32{3, 2, 0, 1}},
		{Selection: []int32{0, 3, 1, 2}},
	}, []int32{11, 14, 13, 12}, 4},
	// TIE
	{[]Vote{
		{Selection: []int32{0, 1}},
		{Selection: []int32{1, 0}},
	}, []int32{3, 3}, 2},
}

func TestPositionalVotingResults(t *testing.T) {
	for _, test := range positionalVotingTests {
		if result := GetPositionalVotingResults(test.Votes, test.ChoiceCount); !reflect.DeepEqual(result, test.Expected) {
			t.Fatalf("Unexpected result; Received: %v, Expected: %v", result, test.Expected)
		}
	}
}

var scoreVotingTests = []resultTestCase{
	// NO VOTES
	{[]Vote{}, []int32{0, 0, 0, 0}, 4},
	// SINGLE VOTE
	{[]Vote{
		{Selection: []int32{9, 3, 1, 10}},
	}, []int32{9, 3, 1, 10}, 4},
	// TIE
	{[]Vote{
		{Selection: []int32{0, 1}},
		{Selection: []int32{1, 0}},
	}, []int32{1, 1}, 2},
	// REGULAR VOTES + TIE
	{[]Vote{
		{Selection: []int32{9, 3, 1, 10}},
		{Selection: []int32{2, 5, 2, 1}},
		{Selection: []int32{1, 7, 2, 9}},
		{Selection: []int32{10, 2, 2, 2}},
	}, []int32{22, 17, 7, 22}, 4},
}

func TestScoreVotingResults(t *testing.T) {
	for _, test := range scoreVotingTests {
		if result := GetScoreVotingResults(test.Votes, test.ChoiceCount); !reflect.DeepEqual(result, test.Expected) {
			t.Fatalf("Unexpected result; Received: %v, Expected: %v", result, test.Expected)
		}
	}
}

var approvalVotingTests = []resultTestCase{
	// NO VOTES
	{[]Vote{}, []int32{0, 0, 0, 0}, 4},
	// SINGLE VOTE
	{[]Vote{
		{Selection: []int32{3}},
	}, []int32{0, 0, 0, 1}, 4},
	// REGULAR VOTES
	{[]Vote{
		{Selection: []int32{3, 2}},
		{Selection: []int32{3, 0}},
		{Selection: []int32{1, 2, 3}},
		{Selection: []int32{0, 3}},
	}, []int32{2, 1, 2, 4}, 4},
}

func TestApprovalVotingResults(t *testing.T) {
	for _, test := range approvalVotingTests {
		if result := GetApprovalOrPluralityVotingResults(test.Votes, test.ChoiceCount); !reflect.DeepEqual(result, test.Expected) {
			t.Fatalf("Unexpected result; Received: %v, Expected: %v", result, test.Expected)
		}
	}
}

var pluralityVotingTests = []resultTestCase{
	// NO VOTES
	{[]Vote{}, []int32{0, 0, 0, 0}, 4},
	// SINGLE VOTE
	{[]Vote{
		{Selection: []int32{3}},
	}, []int32{0, 0, 0, 1}, 4},
	// REGULAR VOTES
	{[]Vote{
		{Selection: []int32{3}},
		{Selection: []int32{0}},
		{Selection: []int32{2}},
		{Selection: []int32{0}},
	}, []int32{2, 0, 1, 1}, 4},
}

func TestPluralityVotingResults(t *testing.T) {
	for _, test := range pluralityVotingTests {
		if result := GetApprovalOrPluralityVotingResults(test.Votes, test.ChoiceCount); !reflect.DeepEqual(result, test.Expected) {
			t.Fatalf("Unexpected result; Received: %v, Expected: %v", result, test.Expected)
		}
	}
}
