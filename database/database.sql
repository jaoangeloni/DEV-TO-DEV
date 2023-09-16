DROP DATABASE IF EXISTS devtodev;
CREATE DATABASE devtodev;
USE devtodev;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profilePicture BLOB,
    profileBanner BLOB
);


CREATE TABLE post(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pageId INT,
    description VARCHAR(255),
    postContent BLOB,
    date DATE NOT NULL
);

CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    commentDescription varchar(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(postId) REFERENCES post(id)
);

CREATE TABLE likes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(postId) REFERENCES post(id)
);

CREATE TABLE gamePage(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    gamePicture BLOB,
    gameBanner BLOB,
    FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE followers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    followerId INT NOT NULL,  
    userId INT NOT NULL, 
    FOREIGN KEY (followerId) REFERENCES users (id),
    FOREIGN KEY (userId) REFERENCES users (id),
    UNIQUE (followerId, userId)
   );