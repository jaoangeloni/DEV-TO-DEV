class Post {

    constructor(i) {
        this.id = i.id;
        this.userId = i.userId;
        this.pageId = i.pageId;
        this.descImage = i.descImage;
        this.postImage = i.postImage;
        this.date = i.date;
        this.username = i.username;
    }

    read() {
        if (this.username == undefined) {
            return `SELECT 
                u.name, 
                u.username,
                u.profilePicture,
                p.*,
                COUNT(DISTINCT l.id) AS likes,
                COUNT(DISTINCT c.id) AS comments
                FROM users u
                JOIN post p ON u.id = p.userId
                LEFT JOIN likes l ON p.id = l.postId
                LEFT JOIN comments c ON p.id = c.postId
                GROUP BY u.name, u.username, p.id
                ORDER BY p.id DESC;`;
        } else {
            return `SELECT 
                u.name, 
                u.username,
                u.profilePicture,
                p.*,
                COUNT(DISTINCT l.id) AS likes,
                COUNT(DISTINCT c.id) AS comments
                FROM users u
                JOIN post p ON u.id = p.userId
                LEFT JOIN likes l ON p.id = l.postId
                LEFT JOIN comments c ON p.id = c.postId
                WHERE u.username = '${this.username}'
                GROUP BY u.name, u.username, p.id
                ORDER BY p.id DESC;`;
        }
    }

    update() {
        return `UPDATE post SET 
        descImage = '${this.descImage}'
        WHERE id = ${this.id} `
    }

    delete() {
        return `DELETE FROM post WHERE id = '${this.id}'`
    }
}

module.exports = Post