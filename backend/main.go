package main

import (
	"fmt"
	"net/http"
	"verivote/api/middleware"
	"verivote/api/routes"
	"verivote/api/utils"
)

func main() {
	utils.LoadEnvironmentVariables()

	http.Handle("/api/poll", middleware.CORS(middleware.Authorize(http.HandlerFunc(routes.HandlePoll))))

	err := http.ListenAndServe(":4000", nil)
	if err != nil {
		panic(fmt.Sprintf("Error starting server: %s", err))
	}
}
