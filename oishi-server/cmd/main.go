package main

import (
	"fmt"

	"github.com/SahilMahale/Booking-App/booking-server/internal/db"
	"github.com/SahilMahale/Booking-App/booking-server/server"
)

const totalTIckets = 50

func main() {
	db, err := db.NewDBConnection()
	if err != nil {
		panic(err)
	}
	fmt.Println("Staring server....")
	bookingService := server.NewBookingService("Booking app", "localhost:8001", totalTIckets, db)
	bookingService.StartBookingService()
}
