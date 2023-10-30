create database tnew2hand;

create table user_type(
id int primary key auto_increment,
`name` varchar(25)
);

create table app_role(
id int primary key auto_increment,
`name` varchar(25)
);

create table app_user(
id int primary key auto_increment,
user_name varchar(50) ,
password varchar(50)
);

create table user(
id int primary key auto_increment,
`name` varchar(150),
phone_number varchar(20),
address varchar(255),
dob date,
id_type int,
id_app_user int unique,
FOREIGN KEY (id_type) references user_type(id),
FOREIGN KEY (id_app_user) references app_user(id)
);

create table user_role(
id int primary key auto_increment,
id_app_user int,
id_app_role int,
FOREIGN KEY (id_app_user) references app_user(id),
FOREIGN KEY (id_app_role) references app_role(id)
);

create table category(
id int primary key auto_increment,
name varchar(50)
);

create table product(
id int primary key auto_increment,
name varchar(100),
size varchar(20),
price double,
quantity int,
id_category int,
FOREIGN KEY (id_category) references category(id)
);

create table cart_item(
id int primary key auto_increment, 
quantity int,
id_user int,
id_product int,
FOREIGN KEY (id_user) references user(id),
FOREIGN KEY (id_product) references product(id)
);

create table `order`(
id int primary key auto_increment,
date_time datetime,
name varchar(150),
phone_number varchar(20),
address varchar(200),
id_user int,
FOREIGN KEY (id_user) references user(id)
);

create table order_detail(
id int primary key auto_increment,
quantity int,
price int,
id_product int,
id_order int,
FOREIGN KEY (id_order) references `order`(id),
FOREIGN KEY (id_product) references product(id)
);