package database

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"verivote/api/utils"
)

var MongoClient *mongo.Client

func InitMongoDB() (*mongo.Client, error) {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(os.Getenv("MONGODB_URI")).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)

	if err != nil {
		return nil, err
	}

	fmt.Println("Connected to MongoDB!")
	return client, nil
}

func GetPollById(id string) (utils.Poll, bool) {
	collection := MongoClient.Database("verivote").Collection("polls")
	hex, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return utils.Poll{}, false
	}
	filter := bson.D{{"_id", hex}}
	response := collection.FindOne(context.TODO(), filter)

	var result utils.Poll
	err = response.Decode(&result)
	if err != nil {
		return utils.Poll{}, false
	}

	return result, true
}
