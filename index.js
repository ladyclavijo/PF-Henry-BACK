const app = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;
const { inyectDbWithBooks, inyectDbWithGenres } = require("./src/utils/utils");

// conn.sync({ force: false }).then(() => {
//   app.listen(port, () => {
//     getAllGenres();
//     inyectDbWithBooks();
//     console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
//   });
// });
app.listen(port, async () => {
  await conn.sync();
  inyectDbWithGenres()
  inyectDbWithBooks();
  console.log(`Server raised in port ${port}`);
});
