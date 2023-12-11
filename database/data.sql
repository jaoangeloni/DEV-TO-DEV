INSERT INTO users(username, name, email, password, profilePicture, profileBanner) VALUES
('johnsmith', 'John Smith', 'john@example.com', PASSWORD('12345'), "https://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/jkegbvvkxk8erjczei0b.png", "https://res.cloudinary.com/dneit0fsb/image/upload/v1702296264/userPFP/bkd3v3rrnccmtpjwgxrv.jpg"),
('emmajohnson', 'Emma Johnson', 'emma@example.com', PASSWORD('12345'), "https://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/f3zyn9lj8napedc0z4d5.png", "https://res.cloudinary.com/dneit0fsb/image/upload/v1702296264/userPFP/bkd3v3rrnccmtpjwgxrv.jpg"),
('michaeldavis', 'Michael Davis', 'michael@example.com', PASSWORD('12345'), "https://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/tvapbm9wrn0aptbzvibh.png", "https://res.cloudinary.com/dneit0fsb/image/upload/v1702296264/userPFP/bkd3v3rrnccmtpjwgxrv.jpg"),
('oliviabrown', 'Olivia Brown', 'olivia@example.com', PASSWORD('12345'), "https://res.cloudinary.com/dneit0fsb/image/upload/v1698154247/userPFP/lgtnoe2gu1vd6ftx7tsh.png", "https://res.cloudinary.com/dneit0fsb/image/upload/v1702296264/userPFP/bkd3v3rrnccmtpjwgxrv.jpg"),
('williamtaylor', 'William Taylor', 'william@example.com', PASSWORD('12345'), "https://res.cloudinary.com/dneit0fsb/image/upload/v1698156381/userPFP/htg5hc2ythoo02rs1rmx.png", "https://res.cloudinary.com/dneit0fsb/image/upload/v1702296264/userPFP/bkd3v3rrnccmtpjwgxrv.jpg");

INSERT INTO post (userId, descImage, postImage, mime_type) VALUES
(1, "Alguma ideia de como fazer uma casa bonita?", "http://res.cloudinary.com/dneit0fsb/image/upload/v1702293738/ipbfry89t0mkyjqtqnhm.jpg", "image/jpeg"),
(5, "Eu sabia que fazer jogos dava muito trabalho, mas eu não achava que fosse TANTO assim! Apesar disso, ainda há muitas das coisas que brilham os olhos de quem aspira a ser game dev.", NULL, NULL),
(3, "Saiu o beta do meu jogo Epic Forge!", "http://res.cloudinary.com/dneit0fsb/image/upload/v1702293835/cbjo6bq6owvu5i18byxe.gif", "image/gif"),
(4, "Alguma dica de como resolver o erro 'NullReferenceException' ? Estou o dia inteiro tentando resolver", NULL, NULL),
(2, "Adicionei essa funcionalidade hoje, o que acharam?", "http://res.cloudinary.com/dneit0fsb/image/upload/v1702293758/vflwckc5gomc5wbhcnpr.gif", "image/gif");

INSERT INTO comments(userId, postId, commentDescription) VALUES
(1, 2 , "Verdade"),
(3, 2 , "Eu também, é realmente muito complicado! Ano passado comecei a estudar a área e me interessei muito"),
(5, 4 , "É só alterar o caminho, tive problema com isso antes."),
(3, 4 , "Não faço ideia."),
(1, 3 , "Muito legal! Já testei e tem muito potencial"),
(2, 3 , "Eu não achei tudo isso"),
(5, 5 , "Muito massa, seu jogo está muito bonito"),
(1, 5 , "Incrível"),
(2, 1 , "Mano isso tá muito feio!"),
(4, 1 , "Desiste enquanto há tempo");

INSERT INTO likes(userId, postId) VALUES
(1,1),
(1,3),
(1,5),
(2,2),
(2,4),
(3,1),
(3,3),
(3,5),
(4,2),
(4,4),
(5,1),
(5,3),
(5,5);