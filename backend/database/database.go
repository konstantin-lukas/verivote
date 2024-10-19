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

func DeletePoll(id string, email string) bool {
	hex, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return false
	}

	filter := bson.M{
		"_id":       hex,
		"userEmail": email,
	}
	collection := MongoClient.Database("verivote").Collection("polls")
	result, err := collection.DeleteOne(context.TODO(), filter)

	if err != nil || result.DeletedCount == 0 {
		return false
	}

	collection = MongoClient.Database("verivote").Collection("votes")
	filter = bson.M{
		"pollId": hex,
	}

	_, err = collection.DeleteMany(context.TODO(), filter)
	if err != nil {
		return false
	}

	return true
}

func GetPollsByEmail(email string) ([]utils.Poll, bool) {
	filter := bson.M{
		"userEmail": email,
	}
	collection := MongoClient.Database("verivote").Collection("polls")
	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return []utils.Poll{}, false
	}
	results := make([]utils.Poll, 0)
	for cursor.Next(context.TODO()) {
		var result utils.Poll
		if err = cursor.Decode(&result); err == nil {
			results = append(results, result)
		}
	}

	return results, true
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

func GetVotesByPollId(id string) ([][]int32, bool) {
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
		if err := cursor.Decode(&result); err == nil {
			votes = append(votes, result.Selection)
		}
	}
	return votes, true
}

func GetPollIdsByEmail(email string) ([]string, bool) {
	filter := bson.M{
		"userEmail": email,
	}
	collection := MongoClient.Database("verivote").Collection("polls")
	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return []string{}, false
	}
	var results []string
	for cursor.Next(context.TODO()) {
		var result utils.PollId
		if err = cursor.Decode(&result); err == nil {
			results = append(results, result.Id)
		}
	}
	return results, true
}

func DeleteVotesByPollId(id string) bool {
	hex, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return false
	}
	filter := bson.M{
		"pollId": hex,
	}
	collection := MongoClient.Database("verivote").Collection("votes")
	_, err = collection.DeleteMany(context.TODO(), filter)
	return err == nil
}

func DeleteAccount(email string) bool {

	polls, ok := GetPollIdsByEmail(email)
	if !ok {
		return false
	}

	filter := bson.M{
		"userEmail": email,
	}
	collection := MongoClient.Database("verivote").Collection("polls")
	_, err := collection.DeleteMany(context.TODO(), filter)
	if err != nil {
		return false
	}
	for _, poll := range polls {
		DeleteVotesByPollId(poll)
	}

	return true
}
