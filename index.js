const app = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;
const {inyectDbWithBooks} = require('./src/utils/utils')

conn.sync({ force: true }).then(() => {
  app.listen(port, () => {
    inyectDbWithBooks()
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
  });
});