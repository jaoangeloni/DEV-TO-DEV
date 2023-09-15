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
        '${this.password}', 
        LOAD_FILE('D:/JAO/PROJETO-ULTRA-SECRETO/api/default/default.png'),
        LOAD_FILE('D:/JAO/PROJETO-ULTRA-SECRETO/api/default/default.jpg'));`
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
}

module.exports = User