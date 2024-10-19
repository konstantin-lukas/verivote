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

//	@title			Verivote API
//	@version		1.0
//	@description	This is the standard backend API for Verivote

//	@license.name	MIT
//	@license.url	https://github.com/konstantin-lukas/verivote/blob/main/LICENSE

//	@host		localhost:4000
//	@BasePath	/api

//	@securityDefinitions.apiKey	JWTAuth
//	@name						next-auth.session-token
//	@in							cookie
//	@description				This is the encrypted JWT generated by NextAuth

// @externalDocs.description	OpenAPI
// @externalDocs.url			https://swagger.io/resources/open-api/
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
	http.Handle("/api/voted/", middleware.CORS(http.HandlerFunc(routes.HandleVoted)))
	http.Handle("/api/results/", middleware.CORS(http.HandlerFunc(routes.HandleResults)))
	http.Handle("/api/polls", middleware.CORS(http.HandlerFunc(routes.HandlePolls)))
	http.Handle("/api/account", middleware.CORS(http.HandlerFunc(routes.HandleAccount)))

	err = http.ListenAndServe(":4000", nil)
	if err != nil {
		panic(fmt.Sprintf("Error starting server: %s", err))
	}
}
