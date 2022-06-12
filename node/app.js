const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");

sequelize.sync().then(() => console.log("Database synced"));
const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(bodyParser.json());

require("./routes/index")(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
