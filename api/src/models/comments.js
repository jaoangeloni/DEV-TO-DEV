class Comments {

    constructor(i) {
        this.id = i.id;
        this.userId = i.userId
        this.postId = i.postId
        this.commentDescription = i.commentDescription
        this.date = i.date
    }

    create() {
        return `INSERT INTO comments VALUE('DEFAULT',
        ${this.userId},
        ${this.postId},
        '${this.commentDescription}',
        CURDATE())`
    }

    read() {
        if (this.id == undefined)
            return `SELECT * FROM comments`
        else
            return `SELECT * FROM comments WHERE id = '${this.id}'`
    }

    readPost() {
        return `SELECT users.profilePicture, users.username, comments.commentDescription, comments.id
        FROM comments
        INNER JOIN users ON comments.userId = users.id
        WHERE comments.postId = '${this.id}'
        ORDER BY comments.id`
    }
    update() {
        return `UPDATE comments SET 
        commentDescription = '${this.commentDescription}'
        WHERE id = ${this.id}`
    }

    delete() {
        return `DELETE FROM comments WHERE id ='${this.id}'`
    }
}

module.exports = Comments