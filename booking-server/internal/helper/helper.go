package helper

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type MyHTTPErrors struct {
	Err      error
	HttpCode int
}

func ValidateUserInfo(username, email string) (isvalidUsername bool, isvalidEmail bool) {
	isvalidUsername = len(username) >= 2
	isvalidEmail = strings.Contains(email, "@")
	return isvalidUsername, isvalidEmail
}

func ValidateBooking(bookedTickets, remainingTickets uint) (isvalidBooking bool) {
	isvalidBooking = bookedTickets > 0 && bookedTickets <= remainingTickets
	return isvalidBooking
}

func ErrorMatch(err error) MyHTTPErrors {
	if strings.Contains(err.Error(), "Duplicate entry") {
		return MyHTTPErrors{
			Err:      fmt.Errorf("entry already exists"),
			HttpCode: fiber.StatusBadRequest,
		}
	}
	return MyHTTPErrors{
		Err:      fmt.Errorf("internal server error"),
		HttpCode: fiber.StatusInternalServerError,
	}
}
