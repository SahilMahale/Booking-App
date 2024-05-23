package models

type UserTicketsResponse struct {
	Username      string
	TicketsBooked uint
}

type UserSignup struct {
	Username string `json:"user" xml:"user" form:"user"`
	Email    string `json:"email" xml:"email" form:"email"`
	Password string `json:"pass" xml:"pass" form:"pass"`
	IsAdmin  bool   `json:"isadmin" xml:"isadmin" form:"isadmin"`
}
type UserSignin struct {
	Username string `json:"user" xml:"user" form:"user"`
	Password string `json:"pass" xml:"pass" form:"pass"`
}

type AdminSignup struct {
	Username string `json:"user" xml:"user" form:"user"`
	Password string `json:"pass" xml:"pass" form:"pass"`
}
type AdminSignin struct {
	Username string `json:"user" xml:"user" form:"user"`
	Password string `json:"pass" xml:"pass" form:"pass"`
}

type TicketsResponse struct {
	TicketsLeft uint
}

type BookingsResponse struct {
	BookingID     string `json:"bookingID" xml:"bookingID" form:"bookingID"`
	Username      string `json:"user" xml:"user" form:"user"`
	TicketsBooked uint   `json:"tickets" xml:"tickets" form:"tickets"`
}

type BookingsRequest struct {
	Username string `json:"user" xml:"user" form:"user"`
	Tickets  uint   `json:"tickets" xml:"tickets" form:"tickets"`
}
