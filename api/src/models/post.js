class Post {

    constructor(i) {
        this.id = i.id;
        this.userId = i.userId;
        this.pageId = i.pageId;
        this.descImage = i.descImage;
        this.postImage = i.postImage;
        this.date = i.date;
    }

    read() {
        if (this.id == undefined)
            return `SELECT u.name, u.username, p.*
            FROM users u
            JOIN post p ON u.id = p.userId
            ORDER BY p.id DESC;`
        else
            return `SELECT u.name, u.username, p.*
            FROM users u
            JOIN post p ON u.id = p.userId
            WHERE id = '${this.id}'`
    }

    update() {
        return `UPDATE post SET 
        descImage = '${this.descImage}'
        WHERE id = ${this.id}`
    }

    delete() {
        return `DELETE FROM post WHERE id = '${this.id}'`
    }
}

module.exports = Post