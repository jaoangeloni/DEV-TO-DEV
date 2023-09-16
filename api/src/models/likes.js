class Likes {
  constructor(i) {
    this.id = i.id;
    this.userId = i.userId;
    this.postId = i.postId;
    this.date = i.date;
  }

  create() {
    return `INSERT INTO likes VALUE (
      'DEFAULT',
      ${this.userId},
      ${this.postId},
      CURDATE()) `;
  }

  read() {
    if (this.id == undefined)
      return `SELECT * FROM likes`;
    else
      return `SELECT * FROM likes WHERE id = ${this.id}`;
  }

  delete() {
    return `DELETE FROM likes WHERE id = ${this.id}`;
  }
}

module.exports = Likes;
