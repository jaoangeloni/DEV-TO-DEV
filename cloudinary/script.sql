DROP DATABASE IF EXISTS my_images;
CREATE DATABASE my_images;
USE my_images;

CREATE TABLE images(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);