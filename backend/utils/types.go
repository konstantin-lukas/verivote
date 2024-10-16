package utils

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Poll struct {
	Id        primitive.ObjectID `bson:"_id" json:"id"`
	OpenUntil time.Time          `bson:"openUntil" json:"openUntil"`
	Name      string             `bson:"name" json:"name"`
	Options   []string           `bson:"options" json:"options"`
	Majority  bool               `bson:"majority" json:"majority"`
	Method    int32              `bson:"method" json:"method"`
}

type Vote struct {
	PollId    string  `json:"pollId"`
	Selection []int32 `json:"selection"`
}
