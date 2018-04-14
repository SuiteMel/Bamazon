drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products (
  item_id int not null auto_increment,
  product_name varchar(100) not null,
  department_name varchar(100) not null,
  price decimal(10, 2) not null,
  stock_quantity int(11) default 0,
  primary key (item_id)
);

select * from products;