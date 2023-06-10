package user

import (
	"github.com/SahilMahale/Booking-App/booking-server/internal/db"
	"github.com/SahilMahale/Booking-App/booking-server/internal/helper"
)

type UserDataController struct {
	DbInterface db.DbConnection
}

type UserOps interface {
	CreateUser(username, email, pass string) helper.MyHTTPErrors
	DeleteUser(username, pass string) helper.MyHTTPErrors
	LoginUser(username, pass string) helper.MyHTTPErrors
}

func NewUserController(db db.DbConnection) UserDataController {
	return UserDataController{
		DbInterface: db,
	}
}

func (u UserDataController) CreateUser(username, email, pass string) helper.MyHTTPErrors {
	user := db.User{Username: username, Email: email, Pass: pass}

	if err := u.DbInterface.Db.Create(user); err.Error != nil {
		myerr := helper.ErrorMatch(err.Error)
		return myerr
	}
	return helper.MyHTTPErrors{
		Err: nil,
	}
}

func (u UserDataController) LoginUser(username, pass string) helper.MyHTTPErrors {
	return helper.MyHTTPErrors{
		Err: nil,
	}
}

func (u UserDataController) DeleteUser(username, pass string) helper.MyHTTPErrors {
	return helper.MyHTTPErrors{
		Err: nil,
	}
}
