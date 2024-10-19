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
)

func HandlePoll(w http.ResponseWriter, r *http.Request) {

	page := r.URL.Path[1:]
	urlComponents := strings.Split(page, "/")

	isGet := r.Method == "GET"
	isPost := r.Method == "POST"

	if isPost && len(urlComponents) == 2 {
		middleware.Authorize(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			poll.Post(w, r)
		})).ServeHTTP(w, r)
		return
	}

	if isGet && len(urlComponents) == 3 {
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
	if r.Method == "GET" && len(urlComponents) == 3 {
		voted.Get(w, r, urlComponents[2])
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}

func HandleResults(w http.ResponseWriter, r *http.Request) {

	page := r.URL.Path[1:]
	urlComponents := strings.Split(page, "/")
	if r.Method == "GET" && len(urlComponents) == 3 {
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
