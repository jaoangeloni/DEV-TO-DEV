INSERT INTO users (username, name, email, password, profilePicture, profileBanner)
VALUES
    ('usuario1', 'Nome do Usuário 1', 'usuario1@example.com', 'senha1', NULL, NULL),
    ('usuario2', 'Nome do Usuário 2', 'usuario2@example.com', 'senha2', NULL, NULL),
    ('usuario3', 'Nome do Usuário 3', 'usuario3@example.com', 'senha3', NULL, NULL);

INSERT INTO post (pageId, description, postContent, date)
VALUES
    (NULL, 'Descrição do Post 1', NULL, NOW()),
    (NULL, 'Descrição do Post 2', NULL, NOW()),
    (1, 'Descrição do Post 3', NULL, NOW());

-- Inserir dados de exemplo na tabela comments
INSERT INTO comments (userId, postId, commentDescription, date)
VALUES
    (1, 1, 'Comentário no Post 1', NOW()),
    (2, 1, 'Comentário no Post 1', NOW()),
    (1, 2, 'Comentário no Post 2', NOW());

-- Inserir dados de exemplo na tabela likes
INSERT INTO likes (userId, postId, date)
VALUES
    (1, 1, NOW()),
    (2, 1, NOW()),
    (1, 2, NOW());

-- Inserir dados de exemplo na tabela gamePage
INSERT INTO gamePage (userId, name, gamePicture, gameBanner)
VALUES
    (1, 'Página de Jogo 1', NULL, NULL),
    (2, 'Página de Jogo 2', NULL, NULL),
    (3, 'Página de Jogo 3', NULL, NULL);

-- Inserir dados de exemplo na tabela followers
INSERT INTO followers (followerId, userId)
VALUES
    (1, 2),
    (2, 1),
    (1, 3);