package user

type UserDataController struct {
	Username      string
	Email         string
	BookedTickets uint
	Pass          string
	DbInterface   interface{}
}

type UserOps interface {
	CreateUser(username, email, pass string) error
	DeleteUser(username, pass string) error
	LoginUser(username, pass string) error
}

func NewUserController(db interface{}) UserDataController {
	return UserDataController{
		DbInterface: db,
	}
}

func (u UserDataController) CreateUser(username, email, pass string) error {
	return nil
}

func (u UserDataController) LoginUser(username, pass string) error {
	return nil
}

func (u UserDataController) DeleteUser(username, pass string) error {
	return nil
}
