package helper

import (
	"errors"
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
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
	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return MyHTTPErrors{
			Err:      fmt.Errorf("entry already exists"),
			HttpCode: fiber.StatusBadRequest,
		}
	} else if errors.Is(err, gorm.ErrRecordNotFound) {
		return MyHTTPErrors{
			Err:      fmt.Errorf("entry doesn't exist"),
			HttpCode: fiber.StatusForbidden,
		}
	} else if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
		return MyHTTPErrors{
			Err:      fmt.Errorf("password wrong"),
			HttpCode: fiber.StatusForbidden,
		}
	} else {
		return MyHTTPErrors{
			Err:      fmt.Errorf("internal server error"),
			HttpCode: fiber.StatusInternalServerError,
		}
	}
}
