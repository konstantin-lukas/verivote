package utils

import (
	"github.com/joho/godotenv"
	"net/mail"
	"os"
	"strconv"
)

func IsValidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func LoadEnvironmentVariables() {
	err := godotenv.Load(".env.local")
	if err != nil {
		panic("Error loading .env file")
	}

	_, err = strconv.ParseInt(os.Getenv("NEXT_PUBLIC_MAX_OPTIONS_PER_POLL"), 10, 64)
	if err != nil {
		panic(err)
	}

	if os.Getenv("NEXT_PUBLIC_ORIGIN") == "" {
		panic(err)
	}
}

func Contains(slice []string, value string) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}

func ContainsInvalidStringSize(slice []string, min int, max int) bool {
	for _, v := range slice {
		if len(v) < min || len(v) > max {
			return true
		}
	}
	return false
}
