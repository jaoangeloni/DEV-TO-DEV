class gamePage {
  constructor(i) {
    this.id = i.id;
    this.userId = i.userId;
    this.name = i.name;
    this.gamePicture = i.gamePicture;
    this.gameBanner = i.gameBanner;
  }

  create() {
    return `INSERT INTO gamePage VALUE(
        DEFAULT,
        ${this.userId},
        '${this.name}',
        LOAD_FILE('D:/JAO/PROJETO-ULTRA-SECRETO/api/default/default.png'),
        LOAD_FILE('D:/JAO/PROJETO-ULTRA-SECRETO/api/default/default.jpg'));`;
  }
  read() {
    if (this.id == undefined)
      return `SELECT * FROM gamePage`;
    else
      return `SELECT * FROM gamePage WHERE id = '${this.id}'`;
  }

  update() {
    return `UPDATE gamePage SET
    name = '${this.name}',
    gamePicture = '${this.gamePicture}',
    gameBanner = '${this.gameBanner}'
    WHERE id = ${this.id}`;
  }

  delete() {
    return `DELETE FROM gamePage WHERE id = '${this.id}'`;
  }
}

module.exports = gamePage;
