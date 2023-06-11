package bookings

import (
	"github.com/SahilMahale/Booking-App/booking-server/internal/db"
	"github.com/SahilMahale/Booking-App/booking-server/internal/helper"
	"github.com/google/uuid"
)

type BookingsController struct {
	DbInterface db.DbConnection
}

type BookingsOps interface {
	CreateBooking(username string, tickets uint) (string, helper.MyHTTPErrors)
	DeleteBooking(bookingID string) helper.MyHTTPErrors
	GetBooking(username string) helper.MyHTTPErrors
}

func NewBookingController(db db.DbConnection) BookingsController {
	return BookingsController{
		DbInterface: db,
	}
}

func (b BookingsController) CreateBooking(username string, tickets uint) (string, helper.MyHTTPErrors) {
	bookid := uuid.NewString()
	booking := db.Bookings{
		BookingID:     bookid,
		UsernameRefer: username,
		Tickets:       tickets,
	}

	if err := b.DbInterface.Db.Create(booking); err.Error != nil {
		myerr := helper.ErrorMatch(err.Error)
		return "", myerr
	}
	return bookid, helper.MyHTTPErrors{
		Err: nil,
	}
}

func (b BookingsController) DeleteBooking(bookingID string) helper.MyHTTPErrors {
	return helper.MyHTTPErrors{
		Err: nil,
	}
}

func (b BookingsController) GetBooking(username string) helper.MyHTTPErrors {
	return helper.MyHTTPErrors{
		Err: nil,
	}
}
