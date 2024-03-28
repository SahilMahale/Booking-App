FROM golang:1.20.5-bullseye
ENV MYSQL_USERNAME=root \
  MYSQL_PASSWORD=password123 \
  MYSQL_IP="mysqldb:3306" \
  APP_AUTH="/app/secrets"

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod tidy 

COPY . .

RUN go build /app/cmd/main.go

EXPOSE 8080

CMD [ "/app/main" ]


