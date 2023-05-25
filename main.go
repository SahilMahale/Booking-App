package main

import (
	"booking-app/db"
	"booking-app/helper"
	"booking-app/user"
	"fmt"
	"sync"
)

const totalTIckets = 50

var wg = sync.WaitGroup{}

func greetUsers(conferenceName string, remainingTickets uint) {
	fmt.Printf("Conference Booking app for: %s\n", conferenceName)
	fmt.Printf("Remaining tickets: %d\n", remainingTickets)
	fmt.Println("Get yout tickets here, tickets.....")
}

func main() {
	conferenceName := "Go Conference"
	remainingTickets := uint(totalTIckets)
	cont := "y"
	dbconnect := db.NewDBConnection()
	dbconnect.Db.AutoMigrate(&user.UserData{})
	//var bookings []map[string]string also works
	bookings := make([]user.UserData, 1)
	greetUsers(conferenceName, remainingTickets)

	for cont == "Y" || cont == "y" {
		us := user.NewUser()
		us.ReadUserInfo()
		isvalidUsername, isvalidEmail := helper.ValidateUserInfo(us.Username, us.Email)
		if !isvalidEmail || !isvalidUsername {
			fmt.Printf("Invalid username or email, please try again..\n")
			continue
		}

		us.ReadBooking()
		isvalidBooking := helper.ValidateBooking(us.BookedTickets, remainingTickets)

		if isvalidBooking {
			dbconnect.Db.Create(&us)
			us.BookTicket(&bookings, &remainingTickets, totalTIckets)
			wg.Add(1)
			go us.SendTicket(&wg)
			if remainingTickets == 0 {
				fmt.Println("All the tickets are booked, application closing")
				break
			}

			fmt.Printf("Do you want to continue Y/y or N/n: ")
			fmt.Scan(&cont)
		} else {
			fmt.Printf("Invalid Input: Tickets to be booked greater than remaining tickets ie %d\n Please retry.......\n", remainingTickets)
		}

	}
	wg.Wait()
}
