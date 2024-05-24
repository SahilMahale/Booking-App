package main

import (
	"fmt"
	"os"

	"github.com/SahilMahale/OishiDes/oishi-server/internal/db"
	"github.com/SahilMahale/OishiDes/oishi-server/server"
)

const totalTIckets = 50

func main() {
	db, err := db.NewDBConnection()
	if err != nil {
		panic(err)
	}
	ipAddrNPort := os.Getenv("SERVER_BIND_TO")
	if ipAddrNPort == "" {
		ipAddrNPort = "localhost:8001"
	}
	fmt.Println("Staring server....")
	bookingService := server.NewBookingService("Booking app", ipAddrNPort, totalTIckets, db)
	bookingService.StartBookingService()
}
