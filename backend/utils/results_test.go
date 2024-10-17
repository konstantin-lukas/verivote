package utils_test

import (
	"reflect"
	"testing"
	. "verivote/api/utils"
)

type resultTestCase struct {
	Votes    []Vote
	Expected []int32
}

var instantRunoffTests = []resultTestCase{
	// SINGLE VOTE
	{[]Vote{
		{Selection: []int32{1, 3, 2, 0}},
	}, []int32{0, 1, 0, 0}},
	// REGULAR VOTES
	{[]Vote{
		{Selection: []int32{1, 0, 3, 2}},
		{Selection: []int32{1, 2, 0, 3}},
		{Selection: []int32{2, 3, 0, 1}},
		{Selection: []int32{2, 3, 1, 0}},
		{Selection: []int32{0, 3, 2, 1}},
	}, []int32{0, 2, 3, 0}},
	// TWO LOSING CANDIDATES IN FIRST ROUND
	{[]Vote{
		{Selection: []int32{0, 1, 2}},
		{Selection: []int32{2, 1, 0}},
	}, []int32{0, 2, 0}},
	// TIE
	{[]Vote{
		{Selection: []int32{0, 1}},
		{Selection: []int32{1, 0}},
	}, []int32{1, 1}},
}

func TestInstantRunoffResults(t *testing.T) {
	for _, test := range instantRunoffTests {
		if result := GetInstantRunoffResults(test.Votes); !reflect.DeepEqual(result, test.Expected) {
			t.Fatalf("Unexpected result; Received: %v, Expected: %v", result, test.Expected)
		}
	}
}
