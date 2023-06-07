package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type dbConnection struct {
	Db *gorm.DB
}

// type DbInterface interface {
// }

func NewDBConnection() (dbConnection, error) {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:TAa9YiHN4c@tcp(10.42.0.47:3306)/BookigsDatabase?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return dbConnection{}, err
	}
	//Automigrate and create the tables
	db.AutoMigrate(User{}, Bookings{})
	return dbConnection{
		Db: db,
	}, nil
}
