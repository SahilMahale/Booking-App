package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DbConnection struct {
	Db *gorm.DB
}

// type DbInterface interface {
// }

func NewDBConnection() (DbConnection, error) {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:TAa9YiHN4c@tcp(10.42.0.130:3306)/BookigsDatabase?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return DbConnection{}, err
	}
	//Automigrate and create the tables
	db.AutoMigrate(User{})
	db.AutoMigrate(Bookings{})
	return DbConnection{
		Db: db,
	}, nil
}
