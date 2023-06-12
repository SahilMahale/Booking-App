# Booking-App
A basic booking app with Go as backend(no AUTH/ no Update) and vite/react as front end(WIP)  
mainly to practice DB connection with gorm, implement auth from scratch and to learn vite

## Development 

### Dependencies 
* Backend  
    * Go [1.20.5 or higher](https://go.dev/doc/)
    * fiber [http server](https://gofiber.io/)
    * gorm [db ORM](https://gorm.io/)  
* Frontend  
    * pnpm [package manager](https://pnpm.io/)
    * vite [bundler/dev server](https://vitejs.dev/guide/why.html)
    * react
### Database ENV variables 
```bash
export MYSQL_USERNAME=<dbuser>
export MYSQL_PASSWORD=<dbpass>
export MYSQL_IP=<dbIP>
```

### Starting backend for dev
```bash
cd booking-server
go mod tidy
go run cmd/main.go
```
### Starting frontend for dev
```bash
cd booking-UI
pnpm install
pnpm dev
```
