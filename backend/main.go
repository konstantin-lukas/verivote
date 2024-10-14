package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"verivote/api/database"
	"verivote/api/middleware"
	"verivote/api/routes"
	"verivote/api/utils"
)

func main() {
	utils.LoadEnvironmentVariables()

	mongoClient, err := database.InitMongoDB()
	if err != nil {
		panic(err)
	}
	database.MongoClient = mongoClient

	defer func() {
		if err = mongoClient.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()

	http.Handle("/api/poll", middleware.CORS(http.HandlerFunc(routes.HandlePoll)))
	http.Handle("/api/poll/", middleware.CORS(http.HandlerFunc(routes.HandlePoll)))
	http.Handle("/api/vote", middleware.CORS(http.HandlerFunc(routes.HandleVote)))

	err = http.ListenAndServe(":4000", nil)
	if err != nil {
		panic(fmt.Sprintf("Error starting server: %s", err))
	}
}
