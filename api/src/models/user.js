class User {

    constructor(i) {
        this.id = i.id
        this.username = i.username
        this.name = i.name
        this.email = i.email
        this.password = i.password
        this.profilePicture = i.profilePicture
        this.profileBanner = i.profileBanner
    }

    create() {
        return `INSERT INTO users VALUE(
        DEFAULT,
        '${this.username}',
        '${this.name}',
        '${this.email}',
        PASSWORD('${this.password}'), 
        '${this.profilePicture}',
        '${this.profileBanner}');`
    }

    read() {
        if (this.username == undefined)
            return `SELECT * FROM users`
        else
            return `SELECT * FROM users WHERE username = '${this.username}'`
    }

    delete() {
        return `DELETE FROM users WHERE id = '${this.id}'`
    }

    login() {
        return `SELECT * FROM users WHERE username = '${this.username}' AND password = PASSWORD('${this.password}')`;
    }
}


module.exports = User