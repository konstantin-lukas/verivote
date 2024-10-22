package middleware

import (
	"context"
	"crypto/sha256"
	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwe"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"golang.org/x/crypto/hkdf"
	"io"
	"net/http"
	"os"
	"time"
	"verivote/api/utils"
)

func Authorize(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		tokenString, err := r.Cookie(os.Getenv("SESSION_TOKEN_NAME"))
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
		isEmail := true
		if !exists {
			isEmail = false
			email, exists = token.Get("name")
			if !exists {
				http.Error(w, "Invalid token", http.StatusUnauthorized)
				return
			}
		}
		emailString, ok := email.(string)
		if !ok {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		if isEmail && !utils.IsValidEmail(emailString) {
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

		ctx := context.WithValue(r.Context(), "email", emailString)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", os.Getenv("CORS_ALLOW_ORIGIN"))
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		w.Header().Add("Access-Control-Expose-Headers", "Location")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method == "OPTIONS" {
			http.Error(w, "No Content", http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
