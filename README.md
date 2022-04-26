# serverphp
1- creare una cartella mysqldata all'interno della cartella serverphp
2- aprire il terminale ed eseguire i seguenti comandi

docker run -d -p 8080:80 --name my-apache-php-app --rm  -v "percorso cartella serverphp":/var/www/html zener79/php:7.4-apache
docker run --name my-mysql-server --rm -v "percorso alla cartella mysqldata":/var/lib/mysql -v "percorso alla cartella dump":/dump -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:latest

poi colleghiamo il database con
docker exec -it my-mysql-server bash;
mysql -u root -p < /dump/create_employee.sql;
exit;

3- Adesso apriamo il browser e inseriamo la url http://localhost:8080/frontend 
