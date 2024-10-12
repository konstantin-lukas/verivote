package routes

import (
	"net/http"
	"strings"
	"verivote/api/middleware"
	"verivote/api/routes/poll"
)

func HandlePoll(w http.ResponseWriter, r *http.Request) {

	page := r.URL.Path[1:]
	urlComponents := strings.Split(page, "/")

	isGet := r.Method == "GET"
	isPost := r.Method == "POST"

	if isPost && len(urlComponents) == 2 {
		middleware.Authorize(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			poll.PostPoll(w, r)
		})).ServeHTTP(w, r)
		return
	}

	if isGet && len(urlComponents) == 3 {
		poll.GetPoll(w, urlComponents[2])
		return
	}

	if isPost || isGet {
		http.Error(w, "Unknown address", http.StatusNotFound)
		return
	}

	http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
}
