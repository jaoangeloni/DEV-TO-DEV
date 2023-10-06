class gamePage {
  constructor(i) {
    this.id = i.id;
    this.userId = i.userId;
    this.name = i.name;
    this.gameDescription = i.gameDescription;
    this.gameGenreId = i.gameGenreId;
    this.gamePicture = i.gamePicture;
    this.gameBanner = i.gameBanner;
  }

  create() {
    return `INSERT INTO gamePage VALUE(
      DEFAULT,
      ${this.userId},
      '${this.name}',
      '${this.gameDescription}',
      ${this.gameGenreId},
      NULL,
      NULL);`
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
    gameDescription = '${this.gameDescription}'
    gameGenreId = '${this.gameGenreId}'
    gamePicture = '${this.gamePicture}',
    gameBanner = '${this.gameBanner}',
    WHERE id = ${this.id}`;
  }


  delete() {
    return `DELETE FROM gamePage WHERE id = '${this.id}'`;
  }
}

module.exports = gamePage;
