package db

import (
	"github.com/SahilMahale/OishiDes/oishi-server/constants"
	"time"
)

type User struct {
	Username  string `gorm:"primaryKey;type:varchar(36);"`
	Email     string
	Pass      string
	Role      constants.UserRole `gorm:"type:enum('admin','user')"`
	CreatedAt time.Time          // Automatically managed by GORM for creation time
	UpdatedAt time.Time          // Automatically managed by GORM for update time
}

type Bookings struct {
	BookingID     string `gorm:"primaryKey;type:varchar(36);"`
	Status        string
	User          User `gorm:"foreignKey:UsernameRefer"`
	UsernameRefer string
	CreatedAt     time.Time // Automatically managed by GORM for creation time
	UpdatedAt     time.Time // Automatically managed by GORM for update time
}

type Table struct {
	TableID    uint `gorm:"primaryKey"`
	seats      uint
	NonVeg     bool
	AirCon     bool
	Bookings   Bookings `gorm:"foreignKey:BookingRef"`
	BookingRef string
}

type Cancellation struct {
	CancellationID string    `gorm:"primaryKey"`
	CreatedAt      time.Time // Automatically managed by GORM for creation time
	UpdatedAt      time.Time // Automatically managed by GORM for update time
	RefundAmt      uint
	Bookings       Bookings `gorm:"foreignKey:BookingRef"`
	BookingRef     string
}

type Payment struct {
	PaymentID  string    `gorm:"primaryKey"`
	CreatedAt  time.Time // Automatically managed by GORM for creation time
	UpdatedAt  time.Time // Automatically managed by GORM for update time
	AmtPaid    uint
	Method     string   `gorm:"type:enum('card','cash','UPI')"`
	Bookings   Bookings `gorm:"foreignKey:BookingRef"`
	BookingRef string
}

// type Admins struct {
// 	Name string `gorm:"primaryKey;type:varchar(36);"`
// 	Pass string
// }
