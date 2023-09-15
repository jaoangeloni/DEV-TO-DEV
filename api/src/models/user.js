class User {

    constructor(i) {
        this.id = i.id
        this.nome = i.nome
        this.descricao = i.descricao
        this.valor = i.valor
    }

    create() {
        return `INSERT INTO user VALUE('DEFAULT','${this.nome}','${this.descricao}',${this.valor})`
    }

    read() {
        if (this.id == undefined)
            return `SELECT * FROM sucos`
        else
            return `SELECT * FROM sucos WHERE id = '${this.id}'`
    }

    update() {
        return `UPDATE user SET nome = '${this.nome}', descricao = '${this.descricao}', valor = ${this.valor} WHERE id = '${this.id}'`
    }

    delete() {
        return `DELETE FROM user WHERE id = '${this.id}'`
    }
}

module.exports = User