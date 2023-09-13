CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY_KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password PASSWORD NOT NULL,
    profilePicture BLOB,
    profileBanner BLOB
);

CREATE TABLE post(
    id INT NOT NULL AUTO_INCREMENT PRIMARY_KEY,
    idPage INT,
    description VARCHAR(255),
    postContent VARCHAR(255),
    date DATE NOT NULL,
);

CREATE TABLE comments(
    idUser INT NOT NULL,
    idPost INT NOT NULL,
    commentDescription varchar(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY(idUser) REFERENCES user(id),
    FOREIGN KEY(idPost) REFERENCES post(id)
);
CREATE TABLE likes(
    idUser INT NOT NULL,
    idPost INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY(idUser) REFERENCES user(id),
    FOREIGN KEY(idPost) REFERENCES post(id)
);

CREATE TABLE gamePage(
    id INT NOT NULL AUTO_INCREMENT PRIMARY_KEY,
    idUser INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    gamePicture BLOB,
    gameBanner BLOB
    FOREIGN KEY(idUser) REFERENCES user(id),
);
