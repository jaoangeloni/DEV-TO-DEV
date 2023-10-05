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

  readUser() {
    return `SELECT * FROM likes
    WHERE userId = ${this.userId} AND postId = ${this.postId};`
  }

  delete() {
    return `DELETE FROM likes WHERE id = ${this.id}`;
  }
}

module.exports = Likes;
