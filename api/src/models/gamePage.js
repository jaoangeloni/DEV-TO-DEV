class gamePage {
  constructor(i) {
    this.id = i.id;
    this.idUser = i.idUser;
    this.name = i.name;
    this.gamePicture = i.gamePicture;
    this.gameBanner = i.gameBanner;
  }

  create() {
    return `INSERT INTO gamePage VALUE(
        DEFAULT,
        ${this.idUser},
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
    this.name = '${this.name}',
    this.gamePicture = '${this.gamePicture}',
    this.gameBanner = '${this.gameBanner}'
    WHERE id = ${this.id}`;
  }

  delete() {
    return `DELETE FROM gamePage WHERE id = '${this.id}'`;
  }
}

module.exports = gamePage;
