class Likes {
  constructor(i) {
    this.id = id;
    this.idUser = i.idUser;
    this.idPost = i.idPost;
    this.commentDescription = i.commentDescription;
    this.date = i.date;
  }

  create() {
    return `INSERT INTO likes VALUE ('DEFAULT', ${this.idUser}, ${this.idPost}, '${this.commentDescription}', '${this.date}') `;
  }

  read() {
    if (this.id == undefined) return `SELECT * FROM likes`;
    else return `SELECT * FROM likes WHERE id = ${this.id}`;
  }

  delete() {
    return `DELETE FROM likes WHERE id = ${this.id}`;
  }
}

module.exports = Likes;
