package database

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"time"
	"verivote/api/utils"
)

var MongoClient *mongo.Client

func InitMongoDB() (*mongo.Client, error) {
	opts := options.
		Client().
		SetAppName("VerivoteAPI").
		SetServerAPIOptions(options.ServerAPI(options.ServerAPIVersion1)).
		SetAuth(options.Credential{
			Username:   os.Getenv("MONGODB_USER"),
			Password:   os.Getenv("MONGODB_PASSWORD"),
			AuthSource: "verivote",
		}).
		SetHosts([]string{os.Getenv("MONGODB_HOST")}).
		SetConnectTimeout(time.Second * 10).
		SetTimeout(time.Second * 10).
		SetMaxPoolSize(100).
		SetMinPoolSize(10)
	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		return nil, err
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}

	fmt.Println("Initialized MongoDB client!")
	return client, nil
}

func GetPollById(id string) (utils.Poll, bool) {
	hex, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return utils.Poll{}, false
	}

	filter := bson.M{
		"_id": hex,
	}
	collection := MongoClient.Database("verivote").Collection("polls")
	response := collection.FindOne(context.TODO(), filter)

	var result utils.Poll
	err = response.Decode(&result)
	if err != nil {
		return utils.Poll{}, false
	}

	return result, true
}

func HasUserVoted(id string, ip string) bool {
	hex, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return false
	}
	filter := bson.M{
		"pollId": hex,
		"ip":     ip,
	}
	collection := MongoClient.Database("verivote").Collection("votes")
	result := collection.FindOne(context.TODO(), filter)
	if result.Err() != nil {
		return false
	}
	return true
}

func GetVotesByPollId(id string, choiceCount int) ([][]int32, bool) {
	hex, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return [][]int32{}, false
	}
	filter := bson.M{
		"pollId": hex,
	}
	collection := MongoClient.Database("verivote").Collection("votes")
	cursor, err := collection.Find(context.TODO(), filter)
	var votes [][]int32
	for cursor.Next(context.TODO()) {
		var result utils.VoteSelection
		if err := cursor.Decode(&result); err == nil && len(result.Selection) == choiceCount {
			votes = append(votes, result.Selection)
		}
	}
	return votes, true

	/*
		if result.Err() != nil {
			return false
		}
		return true*/
}
