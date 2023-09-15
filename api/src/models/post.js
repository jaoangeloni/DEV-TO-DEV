// class Post {

//     constructor(i) {
//         this.id = i.id;
//         this.pageId = i.pageId;
//         this.description = i.description
//         this.postContent = i.postContent
//         this.date = i.date
//     }

//     create() {
//         return `INSERT INTO comments VALUE('DEFAULT','${this.pageId}','${this.description}','${this.postContent}', ${this.date})`
//     }

//     read() {
//         if (this.id == undefined)
//             return `SELECT * FROM comments`
//         else
//             return `SELECT * FROM comments WHERE id = '${this.id}'`
//     }

//     update() {
//         return `UPDATE comments SET commentDescription = '${this.commentDescription}', ${} WHERE id = '${this.id}'`
//     }

//     delete() {
//         return `DELETE FROM comments WHERE id = '${this.id}'`
//     }
// }

// module.exports = Post