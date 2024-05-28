create database fullstack_ecommerce;
use fullstack_ecommerce;

create table userotps(id CHAR(36) NOT NULL primary key, email VARCHAR(255), otp INT NOT NULL);
create table users(id CHAR(36) NOT NULL PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT 'user', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
create table admins(id CHAR(36) NOT NULL PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT 'admin', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE products (
    id CHAR(36) PRIMARY KEY,
    seller_id CHAR(36),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    FOREIGN KEY (seller_id) REFERENCES sellers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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


insert into seller_applications (id, full_name, email, company_name, company_address, gstin) values ("asdf", "hello", "email@amil", "asdf asf", "asdfasdf", "123456789012345");
drop table seller_applications;
drop table sellers;
drop table products;
drop table cart_items;


INSERT INTO products (id, name, description, price, stock) VALUES ('1', 'Laptop', 'High Ghz , 16gbs of ram with rtx 4090', 250000, 10);
INSERT INTO products (id, name, description, price, stock) VALUES ('2', 'Mobile', '8gb ram, 512gb rom with sd 888', 150000, 4);


select * from seller_applications;
select * from sellers;
select * from products;	
select * from carts;
select * from cart_items;
select * from users;
select * from admins;
select * from userotps;








delete from products where id = "asdf-asdf";
delete from users where email = "jaleelashraf.official@gmail.com";
delete from carts where user_id = "5a8989f1-f4a9-43fb-bc7f-795efb9e333c";

drop table users;
drop table admins;