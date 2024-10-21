FROM golang:1.23.2-alpine

COPY .env.local .
WORKDIR backend
COPY backend ./

RUN go build -ldflags '-s' -o verivote-backend
CMD ["./verivote-backend"]
