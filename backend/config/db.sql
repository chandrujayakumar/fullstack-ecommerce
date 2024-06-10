create database fullstack_ecommerce;
use fullstack_ecommerce;

create table userotps(id CHAR(36) NOT NULL primary key, email VARCHAR(255), otp INT NOT NULL);
create table users(id CHAR(36) NOT NULL PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT 'user', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
create table admins(id CHAR(36) NOT NULL PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT 'admin', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE products (
    id CHAR(36) PRIMARY KEY,
    seller_id CHAR(36),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    mrp INT NOT NULL,
    stock INT DEFAULT 0 NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);
CREATE TABLE carts (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
    id CHAR(36) PRIMARY KEY,
    cart_id CHAR(36),
    product_id CHAR(36),
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

create table seller_applications(
	id CHAR(36) NOT NULL PRIMARY KEY, 
    full_name VARCHAR(255), 
    email VARCHAR(255) NOT NULL, 
    company_name VARCHAR(255), 
    company_address VARCHAR(255), 
    gstin CHAR(15) NOT NULL, 
    status VARCHAR(255) DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table sellers(
	id CHAR(36) NOT NULL PRIMARY KEY, 
    full_name VARCHAR(255), 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'seller',
    company_name VARCHAR(255), 
    company_address VARCHAR(255), 
    gstin CHAR(15) NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


drop table seller_applications;
drop table sellers;
drop table products;
drop table cart_items;

select * from seller_applications;
select * from sellers;
select * from products;
select * from carts;
select * from cart_items;
select * from users;
select * from admins;
select * from userotps;

drop table users;
drop table admins;