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