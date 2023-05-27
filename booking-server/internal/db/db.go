package db

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type dbConnection struct {
	Db *gorm.DB
}

func NewDBConnection() dbConnection {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:TAa9YiHN4c@tcp(10.42.0.47:3306)/BookigsDatabase?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("DB connection error" + err.Error())
		panic(err)
	}
	return dbConnection{
		Db: db,
	}
}
