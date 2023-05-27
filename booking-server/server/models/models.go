package models

type UserTicketsResponse struct {
	Username      string
	TicketsBooked uint
}

type UserSignup struct {
	Username string `json:"user" xml:"user" form:"user"`
	Email    string `json:"email" xml:"email" form:"email"`
	Password string `json:"pass" xml:"pass" form:"pass"`
}
type UserSignin struct {
	Username string `json:"user" xml:"user" form:"user"`
	Password string `json:"pass" xml:"pass" form:"pass"`
}

type TicketsResponse struct {
	TicketsLeft uint
}

type BookingsResponse struct {
	BookingID     string
	TicketsBooked uint
}

type BookingsRequest struct {
	Username string `json:"user" xml:"user" form:"user"`
	Tickets  uint   `json:"tickets" xml:"tickets" form:"tickets"`
}
