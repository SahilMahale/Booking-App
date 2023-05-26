package server

import (
	"fmt"

	"github.com/SahilMahale/Booking-App/booking-server/internal/user"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

type bookingService struct {
	totalTickets uint
	app          *fiber.App
	ip           string
}
type BookingServicer interface {
	GetBookings(c *fiber.Ctx) error
	GetTickets(c *fiber.Ctx) error
	BookTickets(c *fiber.Ctx) error
	DeleteBooking(c *fiber.Ctx) error
	CreateUser(c *fiber.Ctx) error
	initMiddleware()
	StartBookingService()
}

func NewBookingService(appname, ip string, totalTickets uint) bookingService {
	return bookingService{
		app: fiber.New(fiber.Config{
			AppName:       appname,
			StrictRouting: true,
			ServerHeader:  "Bookings",
		}),
		ip:           ip,
		totalTickets: totalTickets,
	}
}

func (B *bookingService) initMiddleware() {
	// Adding logger to the app
	B.app.Use(requestid.New())
	B.app.Use(logger.New(logger.Config{
		// For more options, see the Config section
		Format: "${pid} ${locals:requestid} ${status} - ${method} ${path}\n",
	}))
}

func (B *bookingService) StartBookingService() {
	B.initMiddleware()
	B.app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Booking APP!")
	})
	B.app.Get("/tickets/:user?", func(c *fiber.Ctx) error {
		if c.Params("user") != "" {
			username := c.Params("user")
			userData := user.UserData{Username: username, BookedTickets: 5}
			return c.JSON(userData)
		}
		return c.SendString(fmt.Sprintf("%d tickets left\n", B.totalTickets))
	})

	B.app.Get("/bookings", func(c *fiber.Ctx) error {
		if user := c.Query("user"); user != "" {
			return c.SendString(fmt.Sprintf("%s has %d bookings\n", user, 3))
		}
		return c.SendString("will return all the bookings")
	})

	B.app.Listen(B.ip)
}
