const app = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
  });
});
