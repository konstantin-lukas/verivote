package routes

import (
	"net/http"
	"strings"
	"verivote/api/middleware"
	"verivote/api/routes/poll"
	"verivote/api/routes/polls"
	"verivote/api/routes/results"
	"verivote/api/routes/vote"
	"verivote/api/routes/voted"
	"verivote/api/utils"
)

func HandlePoll(w http.ResponseWriter, r *http.Request) {

	page := r.URL.Path[1:]
	urlComponents := strings.Split(page, "/")

	isGet := r.Method == "GET"
	isPost := r.Method == "POST"
	isPut := r.Method == "DELETE"

	pathSegments := int64(len(urlComponents)) - utils.BasePathLength

	if isPost && pathSegments == 1 {
		middleware.Authorize(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			poll.Post(w, r)
		})).ServeHTTP(w, r)
		return
	}

	if isPut && pathSegments == 2 {
		middleware.Authorize(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			poll.Delete(w, r, urlComponents[2])
		})).ServeHTTP(w, r)
		return
	}

	if isGet && pathSegments == 2 {
		poll.Get(w, urlComponents[2])
		return
	}

	if isPost || isGet {
		http.Error(w, "Unknown address", http.StatusNotFound)
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}

func HandleVote(w http.ResponseWriter, r *http.Request) {

	if r.Method == "POST" {
		vote.Post(w, r)
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}

func HandleVoted(w http.ResponseWriter, r *http.Request) {

	page := r.URL.Path[1:]
	urlComponents := strings.Split(page, "/")
	pathSegments := int64(len(urlComponents)) - utils.BasePathLength
	if r.Method == "GET" && pathSegments == 2 {
		voted.Get(w, r, urlComponents[2])
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}

func HandleResults(w http.ResponseWriter, r *http.Request) {

	page := r.URL.Path[1:]
	urlComponents := strings.Split(page, "/")
	pathSegments := int64(len(urlComponents)) - utils.BasePathLength
	if r.Method == "GET" && pathSegments == 2 {
		results.Get(w, urlComponents[2])
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}

func HandlePolls(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		middleware.Authorize(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			polls.Get(w, r)
		})).ServeHTTP(w, r)
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}
