-- Inserir dados na tabela 'users'
INSERT INTO users (username, name, email, password, profilePicture, profileBanner)
VALUES
    ('usuario1', 'Usuário 1', 'usuario1@email.com', 'senha123', NULL, NULL),
    ('usuario2', 'Usuário 2', 'usuario2@email.com', 'senha456', NULL, NULL),
    ('usuario3', 'Usuário 3', 'usuario3@email.com', 'senha789', NULL, NULL);

-- Inserir dados na tabela 'gamePage'
INSERT INTO gamePage (userId, name, gamePicture, gameBanner)
VALUES
    (1, 'Página do Jogo 1', NULL, NULL),
    (2, 'Página do Jogo 2', NULL, NULL),
    (3, 'Página do Jogo 3', NULL, NULL);

-- Inserir dados na tabela 'followers'
INSERT INTO followers (followerId, userId)
VALUES
    (1, 2),
    (1, 3),
    (2, 3);

-- Inserir dados na tabela 'post'
-- INSERT INTO post (userId, pageId, descImage, postImage, date)
-- VALUES
--     (1, NULL, 'Post 1 na Página do Jogo 1', NULL, CURDATE()),
--     (2, NULL, 'Post 2 na Página do Jogo 2', NULL, CURDATE()),
--     (3, 3, 'Post 3 na Página do Jogo 3', NULL, CURDATE());

-- Inserir dados na tabela 'comments'
INSERT INTO comments (userId, postId, commentDescription, date)
VALUES
    (1, 1, 'Comentário no Post 1', CURDATE()),
    (2, 1, 'Comentário no Post 1', CURDATE()),
    (3, 2, 'Comentário no Post 2', CURDATE());

-- Inserir dados na tabela 'likes'
INSERT INTO likes (userId, postId, date)
VALUES
    (1, 1, CURDATE()),
    (2, 1, CURDATE()),
    (3, 2, CURDATE());
