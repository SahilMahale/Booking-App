package db

type User struct {
	Username string `gorm:"primaryKey"`
	Email    string
	Pass     string
}

type Bookings struct {
	BookingID string `gorm:"primaryKey"`
	Username  string
	Tickets   uint
	User      User `gorm:"foreignKey:Username"`
}
