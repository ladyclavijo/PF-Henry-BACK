const app = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;
const { inyectDbWithBooks, getAllGenres } = require("./src/utils/utils");
const { inyectDbWithAuthors } = require("./src/utils/authorUtils");

// conn.sync({ force: false }).then(() => {
//   app.listen(port, () => {
//     getAllGenres();
//     inyectDbWithBooks();
//     console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
//   });
// });
app.listen(port, async () => {
  await conn.sync();
  inyectDbWithAuthors();
  getAllGenres();
  inyectDbWithBooks();
  console.log(`Server raised in port ${port}`);
});
