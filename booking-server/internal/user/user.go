package user

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
)

type UserData struct {
	Username      string `gorm:"primaryKey"`
	Email         string
	BookedTickets uint
	Pass          string
}

var reader = bufio.NewReader(os.Stdin)

func NewUser() UserData {
	return UserData{}
}
func (u *UserData) ReadUserInfo() {
	var err error
	fmt.Printf("Please type your user name: ")
	u.Username, err = reader.ReadString('\n')
	if err != nil {
		fmt.Printf("Error while reading input: %+v\n", err)
		return
	}

	fmt.Printf("Please type your email address: ")
	u.Email, err = reader.ReadString('\n')
	if err != nil {
		fmt.Printf("Error while reading input: %+v\n", err)
		return
	}
}

func (u *UserData) ReadBooking() {
	fmt.Printf("Please enter the number of tickets to be booked: ")
	bookedTickets, err := reader.ReadString('\n')
	if err != nil {
		fmt.Printf("Error while reading input: %+v\n", err)
		return
	}
	bookedTickets64, err := strconv.ParseUint(strings.TrimSpace(bookedTickets), 10, 64)
	if err != nil {
		fmt.Printf("Error while reading input: %+v\n", err)
		return
	}
	u.BookedTickets = uint(bookedTickets64)
}

func (u UserData) BookTicket(bookings *[]UserData, remainingTickets *uint, totalTickets uint) {
	*bookings = append(*bookings, u)
	*remainingTickets -= u.BookedTickets

	fmt.Printf("Thank you for booking %d tickets, %d tickets left out of %d \n",
		u.BookedTickets, *remainingTickets, totalTickets)
	// fmt.Printf("UserInfo %v", userData)
	fmt.Printf("These are all the bookings till now %v\n", *bookings)
}

func (u UserData) SendTicket(wg *sync.WaitGroup) {
	ticket := fmt.Sprintf("Sending ticket:\n %d tickets for %s \n to Email: %s\n", u.BookedTickets, u.Username, u.Email)
	data := []byte(ticket)
	fileName := "Ticket" + u.Username + ".txt"
	os.WriteFile(fileName, data, 0644)
	// fmt.Printf("Ticket Created for username:%s", u.Username)
	wg.Done()
}
