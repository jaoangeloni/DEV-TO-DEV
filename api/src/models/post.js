class Post {

    constructor(i) {
        this.id = i.id;
        this.pageId = i.pageId;
        this.description = i.description
        this.postContent = i.postContent
        this.date = i.date
    }

    create() {
        return `INSERT INTO post VALUE(
            DEFAULT,
            ${this.pageId},
            '${this.description}',
            ${this.postContent},
            CURDATE())`
    }

    read() {
        if (this.id == undefined)
            return `SELECT * FROM users`
        else
            return `SELECT * FROM users WHERE id = '${this.id}'`
    }

    update() {
        return `UPDATE users SET 
            username = '${this.username}', 
            name = '${this.name}', 
            email = '${this.email}' , 
            password = '${this.password}', 
            profilePicture = '${this.profilePicture}',
            profileBanner = '${this.profileBanner}' 
            WHERE id = '${this.id}'`
    }

    delete() {
        return `DELETE FROM users WHERE id = '${this.id}'`
    }

    login() {
        return `SELECT * FROM users WHERE username = '${this.username}' AND password = '${this.password}'`;
    }
}


module.exports = User

module.exports = Post