drop database if exists wishlist_modelone;

create database wishlist_modelone;

use wishlist_modelone;

create table users(
id int auto_increment primary key,
uname varchar(100) not null,
pw varchar(100) not null
);

create table wishlists(
id int auto_increment primary key,
_name varchar(100) not null,
creatorID int not null
);

create table comments(
id int auto_increment primary key,
msg varchar(250) not null,
poster varchar(100) not null,
wishlistID int not null
);

create table items(
id int auto_increment primary key,
_name varchar(100) not null,
wishlistID int not null,
checked bool default false,
philanthropist varchar(100)
);

