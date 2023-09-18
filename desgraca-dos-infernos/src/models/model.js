class Post {

    constructor(i) {
        this.id = i.id;
        this.userId = i.userId;
        this.pageId = i.pageId;
        this.descImage = i.descImage;
        this.postImage = i.postImage;
        this.date = i.date;
    }

    create() {
        return `INSERT INTO post VALUE(
            DEFAULT,
            ${this.userId},
            DEFAULT,
            '${this.descImage}',
            ${this.postImage},
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
        descImage = '${this.descImage}'
        WHERE id = ${this.id}`
    }

    delete() {
        return `DELETE FROM post WHERE id = '${this.id}'`
    }
}

module.exports = Post