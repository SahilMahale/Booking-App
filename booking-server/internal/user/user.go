package user

type UserData struct {
	Username      string `gorm:"primaryKey"`
	Email         string
	BookedTickets uint
	Pass          string
}

func NewUser() UserData {
	return UserData{}
}
