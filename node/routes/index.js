const spendingsRouter = require("./spendingsRouter");

module.exports = function (app) {
  app.use("/", spendingsRouter);
};
