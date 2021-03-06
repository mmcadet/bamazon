DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE Products(
	item_id INTEGER AUTO_INCREMENT,
 	product_name VARCHAR(100) NOT NULL,
 	department_name VARCHAR(100) NOT NULL,
 	price DECIMAL(10,2) NOT NULL,
 	stock_quantity INTEGER(10) NOT NULL,
 	primary key(item_id)
 );

SELECT * FROM Products;
