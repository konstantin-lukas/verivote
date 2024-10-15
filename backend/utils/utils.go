package utils

import (
	"cmp"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net"
	"net/http"
	"net/mail"
	"os"
	"strconv"
	"strings"
	"time"
)

var VotingMethods = []int32{0, 1, 2, 3, 4}

func IsValidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func LoadEnvironmentVariables() {
	err := godotenv.Load("../.env.local")
	if err != nil {
		panic(err)
	}

	_, err = strconv.ParseInt(os.Getenv("NEXT_PUBLIC_MAX_OPTIONS_PER_POLL"), 10, 64)
	if err != nil {
		panic(err)
	}

	if os.Getenv("NEXT_PUBLIC_ORIGIN") == "" {
		panic(err)
	}
}

func Contains[T comparable](slice []T, value T) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}

func ContainsOutOfRangeValue[T cmp.Ordered](slice []T, min T, max T) bool {
	for _, v := range slice {
		if v < min || v > max {
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

// GetClientIp assumes that it's running behind a correctly configured reverse proxy to set the X-Real-Ip header.
// If that's not the case, modify the below function not to read any headers which can be set by the client.
// More info: https://adam-p.ca/blog/2022/03/x-forwarded-for/
// The function also determines if the retrieved ip format is valid. Check this before using the ip address.
func GetClientIp(r *http.Request) (string, bool) {
	ip := r.Header.Get("X-Real-Ip")
	if ip == "" {
		xForwardedForHeaders := r.Header.Values("X-Forwarded-For")
		if len(xForwardedForHeaders) > 0 {
			ipStringList := xForwardedForHeaders[len(xForwardedForHeaders)-1]
			ipList := strings.Split(ipStringList, ",")
			if len(ipList) > 0 {
				ip = strings.Trim(ipList[len(ipList)-1], " ")
			}
		}
	}

	return ip, net.ParseIP(ip) != nil
}

type Poll struct {
	Id        primitive.ObjectID `bson:"_id" json:"id"`
	OpenUntil time.Time          `bson:"openUntil" json:"openUntil"`
	Name      string             `bson:"name" json:"name"`
	Options   []string           `bson:"options" json:"options"`
	Majority  bool               `bson:"majority" json:"majority"`
	Method    int32              `bson:"method" json:"method"`
}
