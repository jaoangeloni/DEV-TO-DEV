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
        NULL,
        NULL);`
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
        password = PASSWORD('${this.password}'), 
        profilePicture = '${this.profilePicture}',
        profileBanner = '${this.profileBanner}' 
        WHERE id = '${this.id}'`
    }

    delete() {
        return `DELETE FROM users WHERE id = '${this.id}'`
    }

    login() {
        return `SELECT * FROM users WHERE username = '${this.username}' AND password = PASSWORD('${this.password}')`;
    }
}


module.exports = User