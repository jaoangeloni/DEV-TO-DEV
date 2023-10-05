
    DROP DATABASE IF EXISTS devtodev;
    CREATE DATABASE devtodev;
    USE devtodev;

    SET GLOBAL max_allowed_packet = 67108864;

    CREATE TABLE users(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        profilePicture BLOB,
        profileBanner BLOB
    );

    CREATE TABLE gamePage(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        gameDescription VARCHAR(255),
        gameGenreId INT NOT NULL,
        gamePicture BLOB,
        gameBanner BLOB,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(gameGenreId) REFERENCES gameGenre(id)
    );

    CREATE TABLE followers (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        followerId INT NOT NULL,  
        userId INT NOT NULL, 
        FOREIGN KEY (followerId) REFERENCES users (id),
        FOREIGN KEY (userId) REFERENCES users (id),
        UNIQUE (followerId, userId)
    );

    CREATE TABLE post(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        pageId INT NULL,
        descImage VARCHAR(255),
        postImage LONGBLOB,
        mime_type VARCHAR(255),
        date DATE NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(pageId) REFERENCES gamePage(id)
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

   CREATE TABLE gameGenre (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    genreName VARCHAR(255) NOT NULL UNIQUE,
    gamePageId INT NOT NULL,
    FOREIGN KEY(gamePageId) REFERENCES gamePage(id)
);