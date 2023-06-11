package main

import (
	"github.com/SahilMahale/Booking-App/booking-server/internal/db"
	"github.com/SahilMahale/Booking-App/booking-server/server"
)

const totalTIckets = 50

func main() {
	db, err := db.NewDBConnection()
	if err != nil {
		panic(err)
	}
	bookingService := server.NewBookingService("Booking app", ":8080", totalTIckets, db)
	bookingService.StartBookingService()
}
