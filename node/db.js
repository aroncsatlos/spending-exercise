const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  host: "./test.sqlite",
});

module.exports = sequelize;
