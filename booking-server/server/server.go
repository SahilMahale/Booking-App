package server

import (
	"fmt"

	"github.com/SahilMahale/Booking-App/booking-server/internal/db"
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

func (B *bookingService) GetTickets(c *fiber.Ctx) error {
	if user := c.Query("user"); user != "" {
		userData := models.UserTicketsResponse{Username: user, TicketsBooked: 5}
		return c.JSON(userData)
	}
	return c.JSON(models.TicketsResponse{TicketsLeft: B.totalTickets})
}

func (B *bookingService) GetBookings(c *fiber.Ctx) error {
	if user := c.Query("user"); user != "" {
		return c.SendString(fmt.Sprintf("%s has %d bookings\n", user, 3))
	}
	return c.SendString("will return all the bookings")
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
	book := new(models.BookingsRequest)
	if err := c.BodyParser(book); err != nil {
		return err
	}
	return c.Status(fiber.StatusAccepted).JSON(book)
}

func (B *bookingService) DeleteBooking(c *fiber.Ctx) error {
	if bookID := c.Params("bookid"); bookID != "" {
		return c.SendString(fmt.Sprintf("%s booking is delete\n", bookID))
	}
	return c.Status(fiber.StatusBadRequest).SendString("Need the bookingID")
}

func (B *bookingService) StartBookingService() {

	B.initLogger()

	B.app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Booking APP!")
	})

	userGroup := B.app.Group("/user")
	userGroup.Post("/signup", B.CreateUser)
	userGroup.Post("/signin", B.LoginUser)

	ticketGroup := B.app.Group("/tickets")
	ticketGroup.Get("", B.GetTickets)

	bookingGroup := B.app.Group("/bookings")
	bookingGroup.Get("", B.GetBookings)
	bookingGroup.Post("", B.BookTickets)
	bookingGroup.Delete("/:bookID", B.DeleteBooking)

	B.app.Listen(B.ip)
}
