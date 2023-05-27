package helper

import "strings"

func ValidateUserInfo(username, email string) (isvalidUsername bool, isvalidEmail bool) {
	isvalidUsername = len(username) >= 2
	isvalidEmail = strings.Contains(email, "@")
	return isvalidUsername, isvalidEmail
}

func ValidateBooking(bookedTickets, remainingTickets uint) (isvalidBooking bool) {
	isvalidBooking = bookedTickets > 0 && bookedTickets <= remainingTickets
	return isvalidBooking
}
