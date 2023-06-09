package server

import (
	"github.com/SahilMahale/Booking-App/booking-server/internal/bookings"
	"github.com/SahilMahale/Booking-App/booking-server/internal/db"
	"github.com/SahilMahale/Booking-App/booking-server/internal/helper"
	"github.com/SahilMahale/Booking-App/booking-server/internal/user"
	"github.com/SahilMahale/Booking-App/booking-server/server/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

type bookingService struct {
	totalTickets uint
	app          *fiber.App
	ip           string
	DbInterface  db.DbConnection
}
type BookingServicer interface {
	GetBookings(c *fiber.Ctx) error
	GetTickets(c *fiber.Ctx) error
	BookTickets(c *fiber.Ctx) error
	DeleteBooking(c *fiber.Ctx) error
	CreateUser(c *fiber.Ctx) error
	LoginUser(c *fiber.Ctx) error
	StartBookingService()
}

func NewBookingService(appname, ip string, totalTickets uint, db db.DbConnection) bookingService {
	return bookingService{
		app: fiber.New(fiber.Config{
			AppName:       appname,
			StrictRouting: true,
			ServerHeader:  "Bookings",
		}),
		ip:           ip,
		totalTickets: totalTickets,
		DbInterface:  db,
	}
}

func (B *bookingService) initLogger() {
	// Adding logger to the app
	B.app.Use(requestid.New())
	B.app.Use(logger.New(logger.Config{
		// For more options, see the Config section
		Format: "${pid} ${locals:requestid} ${status} - ${method} ${path}\n",
	}))
}

func (B *bookingService) GetBookings(c *fiber.Ctx) error {

	var user string
	var bookarr []db.Bookings
	var err helper.MyHTTPErrors
	bookCtrl := bookings.NewBookingController(B.DbInterface)

	if user = c.Query("user"); user == "" {
		bookarr, err = bookCtrl.GetBookings()
	} else {
		bookarr, err = bookCtrl.GetBookingsForUser(user)
	}
	if err.Err != nil {
		return c.Status(err.HttpCode).SendString(err.Err.Error())
	}
	bookRespArr := []models.BookingsResponse{}
	for _, book := range bookarr {
		bookEntry := models.BookingsResponse{
			BookingID:     book.BookingID,
			Username:      book.UsernameRefer,
			TicketsBooked: book.Tickets,
		}
		bookRespArr = append(bookRespArr, bookEntry)
	}
	return c.JSON(bookRespArr)
}

func (B *bookingService) CreateUser(c *fiber.Ctx) error {
	var userCtrl user.UserOps
	u := new(models.UserSignup)

	if err := c.BodyParser(u); err != nil {
		return err
	}

	userCtrl = user.NewUserController(B.DbInterface)

	err := userCtrl.CreateUser(u.Username, u.Email, u.Password)
	if err.Err != nil {
		return c.Status(err.HttpCode).SendString(err.Err.Error())
	}

	return c.SendStatus(fiber.StatusCreated)
}

func (B *bookingService) LoginUser(c *fiber.Ctx) error {
	var userCtrl user.UserOps
	u := new(models.UserSignin)
	if err := c.BodyParser(u); err != nil {
		return err
	}
	userCtrl = user.NewUserController(B.DbInterface)
	err := userCtrl.LoginUser(u.Username, u.Password)
	if err.Err != nil {
		return c.Status(err.HttpCode).SendString(err.Err.Error())
	}
	return c.SendStatus(fiber.StatusAccepted)
}

func (B *bookingService) BookTickets(c *fiber.Ctx) error {

	var bookCtrl bookings.BookingsController
	book := new(models.BookingsRequest)

	if err := c.BodyParser(book); err != nil {
		return err
	}

	bookCtrl = bookings.NewBookingController(B.DbInterface)
	bookid, err := bookCtrl.CreateBooking(book.Username, book.Tickets)
	if err.Err != nil {
		return c.Status(err.HttpCode).SendString(err.Err.Error())
	}

	bookResp := models.BookingsResponse{
		BookingID:     bookid,
		Username:      book.Username,
		TicketsBooked: book.Tickets,
	}
	return c.Status(fiber.StatusAccepted).JSON(bookResp)
}

func (B *bookingService) DeleteBooking(c *fiber.Ctx) error {

	bookID := ""
	if bookID = c.Params("bookid"); bookID == "" {
		return c.Status(fiber.ErrBadRequest.Code).SendString("Need to specify bookingId")
	}

	bookCtrl := bookings.NewBookingController(B.DbInterface)
	err := bookCtrl.DeleteBooking(bookID)

	if err.Err != nil {
		return c.Status(err.HttpCode).SendString(err.Err.Error())
	}
	return c.Status(fiber.StatusOK).SendString("booking deleted")
}

func (B *bookingService) StartBookingService() {

	B.initLogger()

	B.app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Booking APP!")
	})

	userGroup := B.app.Group("/user")
	userGroup.Post("/signup", B.CreateUser)
	userGroup.Post("/signin", B.LoginUser)

	bookingGroup := B.app.Group("/bookings")
	bookingGroup.Get("", B.GetBookings)
	bookingGroup.Post("", B.BookTickets)
	bookingGroup.Delete("/:bookID", B.DeleteBooking)

	B.app.Listen(B.ip)
}
