const app = require("./src/app");
const { conn } = require("./src/db");
const {inyectDbWithBooks} = require('./src/utils/utils')

conn.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    inyectDbWithBooks()
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
