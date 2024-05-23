package bookings

import (
	"github.com/SahilMahale/OishiDes/oishi-server/internal/db"
	"github.com/SahilMahale/OishiDes/oishi-server/internal/helper"
	"github.com/google/uuid"
)

type BookingsController struct {
	DbInterface db.DbConnection
}

type BookingsOps interface {
	CreateBooking(username string, tickets uint) (string, helper.MyHTTPErrors)
	DeleteBooking(bookingID string) helper.MyHTTPErrors
	GetBookings() ([]db.Bookings, helper.MyHTTPErrors)
	GetBookingsForUser(username string) ([]db.Bookings, helper.MyHTTPErrors)
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

	booking := db.Bookings{BookingID: bookingID}
	//check if entry is present
	err := b.DbInterface.Db.First(&booking)

	if err.Error != nil {
		myerr := helper.ErrorMatch(err.Error)
		return myerr
	}

	err = b.DbInterface.Db.Delete(&booking)

	if err.Error != nil {
		myerr := helper.ErrorMatch(err.Error)
		return myerr
	}

	return helper.MyHTTPErrors{
		Err: nil,
	}
}

func (b BookingsController) GetBookings() ([]db.Bookings, helper.MyHTTPErrors) {
	var book []db.Bookings

	res := b.DbInterface.Db.Find(&book)
	if res.Error != nil {
		myerr := helper.ErrorMatch(res.Error)
		return []db.Bookings{}, myerr
	}

	return book, helper.MyHTTPErrors{
		Err: nil,
	}
}

func (b BookingsController) GetBookingsForUser(username string) ([]db.Bookings, helper.MyHTTPErrors) {
	var book []db.Bookings

	res := b.DbInterface.Db.Where(&db.Bookings{UsernameRefer: username}).Find(&book)
	if res.Error != nil {
		myerr := helper.ErrorMatch(res.Error)
		return []db.Bookings{}, myerr
	}

	return book, helper.MyHTTPErrors{
		Err: nil,
	}
}
