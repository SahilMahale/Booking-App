# OishiDes
An SPA to manage a boutique restaurant with Go as backend and vite/react as front end

## Development progress 
[x] Go backend Auth
[x] Basic CRUD
[x] functioning UI with auth and pages to handle main business logic
[] adding API calls to book tables
[] Error screens for UI
[] payment management logic
[] Admin panel
 
### Dependencies 
* Backend  
    * Go [1.20.5 or higher](https://go.dev/doc/)
    * fiber [http server](https://gofiber.io/)
    * gorm [db ORM](https://gorm.io/)  
* Frontend  
    * pnpm [package manager](https://pnpm.io/)
    * vite [bundler/dev server](https://vitejs.dev/guide/why.html)
    * react
### Starting database for dev

Start the docker container and grab the container IP from the commands below 
```bash 
docker run -d --name mysql-dev-server  -e MYSQL_ROOT_PASSWORD=password123 bitnami/mysql:latest
docker inspect <container-ID>
```
### Backend ENV variables 
```bash
export MYSQL_USERNAME=<dbuser>
export MYSQL_PASSWORD=<dbpass>
export MYSQL_IP=<dbIP:port>
export APP_AUTH=<path to secrets folder conataining generated keys>
```

### Starting backend for dev
```bash
cd oishi-server
go mod tidy
go run cmd/main.go
```
### Frontend ENV variables
```bash 
export API_GATEWAY =<IP where backend is hosted >
```
### Starting frontend for dev
```bash
cd oishi-ui 
pnpm install
pnpm dev
```

### Generating RSA 256 private and public keys
```bash
cd ./secret
openssl genrsa -out private_key.pem 2048
openssl rsa -in test_key.pem -outform PEM -pubout -out test_key.pem.pub 
```
