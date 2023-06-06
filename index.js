const app = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;
const { inyectDbWithBooks, inyectDbWithGenres } = require("./src/utils/utils");
app.listen(port, async () => {
  await conn.sync();
  inyectDbWithGenres()
  inyectDbWithBooks();
  console.log(`Server raised in port ${port}`);
});
