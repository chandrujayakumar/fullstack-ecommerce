create database fullstack_ecommerce;
use fullstack_ecommerce;

create table userotps(id CHAR(36) NOT NULL primary key, email VARCHAR(255), otp INT NOT NULL);
create table users(id CHAR(36) NOT NULL PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT 'user', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
create table admins(id CHAR(36) NOT NULL PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT 'admin', createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

select * from users;
select * from admins;
select * from userotps;

INSERT INTO users (id, fullname, email) VALUES("aasdfads-asdf-adsfa-dsf", "jaleel ashraf j", "jaleelashraf.official@gmail.com");

drop table users;