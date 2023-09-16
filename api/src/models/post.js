class Post {

    constructor(i) {
        this.id = i.id;
        this.userId = i.userId;
        this.pageId = i.pageId;
        this.description = i.description
        this.postContent = i.postContent
        this.date = i.date
    }

    create() {
        return `INSERT INTO post VALUE(
            DEFAULT,
            ${this.userId},
            ${this.pageId},
            '${this.description}',
            ${this.postContent},
            CURDATE())`
    }

    read() {
        if (this.id == undefined)
            return `SELECT * FROM post`
        else
            return `SELECT * FROM post WHERE id = '${this.id}'`
    }

    update() {
        return `UPDATE post SET 
        description = '${this.description}'
        WHERE id = ${this.id}`
    }

    delete() {
        return `DELETE FROM post WHERE id = '${this.id}'`
    }
}

module.exports = Post