package utils

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Poll struct {
	Id        primitive.ObjectID `bson:"_id" json:"id" example:"670ae4a2724ba0d2874447c9"`
	OpenUntil time.Time          `bson:"openUntil" json:"openUntil" example:"1999-01-01T10:00:00+02:00"`
	Name      string             `bson:"name" json:"name" example:"Who should be the next president?"`
	Options   []string           `bson:"options" json:"options" example:"Harris,Trump,Kennedy"`
	Majority  bool               `bson:"majority" json:"majority" example:"true"`
	Method    int32              `bson:"method" json:"method" example:"4"`
}

type Vote struct {
	PollId    string  `json:"pollId" example:"670ae4a2724ba0d2874447c9"`
	Selection []int32 `json:"selection" example:"1,4,0,2,3"`
}

type VoteSelection struct {
	Selection []int32 `json:"selection" example:"1,4,0,2,3"`
}

type PollSummary struct {
	Name        string    `json:"name" example:"Who should be the next president?"`
	Method      int32     `json:"method" example:"4"`
	VoterCount  int       `json:"voterCount" example:"42"`
	Winners     []int32   `json:"winners" example:"0,2"`
	Options     []string  `json:"options" example:"Harris,Trump,Kennedy"`
	Results     []int32   `json:"results" example:"3,0,0,4"`
	ClosingDate time.Time `json:"closingDate" example:"1999-01-01T10:00:00+02:00"`
}
