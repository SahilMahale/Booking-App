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
### Starting database
helm repo add bitnami https://charts.bitnami.com/bitnami 

helm install my-release bitnami/mysql    

Execute the following to get the administrator credentials:
 
  echo Username: root
  MYSQL_ROOT_PASSWORD=$(kubectl get secret --namespace default my-release -o jsonpath="{.data.mysql-root-password}" | base64 -d)

To connect to your database:

  1. Run a pod that you can use as a client:

      kubectl run my-release-client --rm --tty -i --restart='Never' --image  docker.io/bitnami/mysql:8.0.33-debian-11-r7 --namespace default --env MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD --command -- bash

  2. To connect to primary service (read/write):

      mysql -h my-release.default.svc.cluster.local -uroot -p"$MYSQL_ROOT_PASSWORD"
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

### Generating RSA 256 private and public keys
```bash
cd ./secret
openssl genrsa -out private_key.pem 2048
openssl rsa -in test_key.pem -outform PEM -pubout -out test_key.pem.pub 
```
