package db

type User struct {
	Username string `gorm:"primaryKey;type:varchar(36);"`
	Email    string
	Pass     string
}

type Bookings struct {
	BookingID   string `gorm:"primaryKey"`
	Usernameref string
	Tickets     uint
	User        User `gorm:"foreignKey:Usernameref"`
}
