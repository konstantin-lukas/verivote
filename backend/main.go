package main

import (
	"crypto/sha256"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwe"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"golang.org/x/crypto/hkdf"
	"io"
	"net/http"
	"net/mail"
	"os"
	"time"
)

func valid(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func authorize(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		tokenString, err := r.Cookie("next-auth.session-token")

		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		rawJwe := tokenString.Value
		nextAuthSecret := os.Getenv("NEXTAUTH_SECRET")
		info := "NextAuth.js Generated Encryption Key"

		hash := sha256.New
		kdf := hkdf.New(hash, []byte(nextAuthSecret), []byte(""), []byte(info))
		key := make([]byte, 32)
		_, _ = io.ReadFull(kdf, key)

		decrypted, err := jwe.Decrypt([]byte(rawJwe), jwe.WithKey(jwa.DIRECT, key))
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		token, err := jwt.Parse(decrypted, jwt.WithVerify(false))

		email, exists := token.Get("email")
		if !exists {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		emailString, ok := email.(string)
		if !ok {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		if !valid(emailString) {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		exp, exists := token.Get("exp")
		if !exists {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		expTime, ok := exp.(time.Time)
		if !ok {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		if expTime.Before(time.Now()) {
			http.Error(w, "Token expired", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", os.Getenv("CORS_ALLOW_ORIGIN"))
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method == "OPTIONS" {
			http.Error(w, "No Content", http.StatusNoContent)
		}

		next.ServeHTTP(w, r)
	})
}

func getAlbums(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Unable to parse form data", http.StatusBadRequest)
		return
	}

	form := r.PostForm
	for key, values := range form {
		fmt.Printf("len: %s\n", len(values))
		for _, value := range values {
			fmt.Printf("%s: %s\n", key, value)
		}
	}

	time.Sleep(3 * time.Second)
	http.Redirect(w, r, fmt.Sprintf("%s/poll/23985723897632908", os.Getenv("ORIGIN")), http.StatusFound)
}

func main() {
	err := godotenv.Load(".env.local")
	if err != nil {
		panic("Error loading .env file")
	}
	http.Handle("/api/poll", CORS(authorize(http.HandlerFunc(getAlbums))))
	err = http.ListenAndServe(":4000", nil)
	if err != nil {
		panic(fmt.Sprintf("Error starting server: %s", err))
	}
}
