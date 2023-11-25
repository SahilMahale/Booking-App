package db

type User struct {
	Username string `gorm:"primaryKey;type:varchar(36);"`
	Email    string
	Pass     string
}

type Bookings struct {
	BookingID     string `gorm:"primaryKey"`
	User          User   `gorm:"foreignKey:UsernameRefer"`
	UsernameRefer string
	Tickets       uint
}

type Admins struct {
	Name string `gorm:"primaryKey;type:varchar(36);"`
	Pass string
}
