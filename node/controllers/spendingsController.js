const Spending = require("../models/spending");

const validCurrencies = ["HUF", "USD"];

exports.getSpendings = async (req, res) => {
  const { currency, orderBy, orderDirection } = req.query;
  const where = {};
  if (currency) {
    where.currency = currency;
  }
  const order = [];
  if (orderBy) {
    order.push([orderBy, orderDirection || "ASC"]);
  }
  const spendings = await Spending.findAll({
    where: {
      ...where,
    },
    order: order,
  });
  res.status(200).send(spendings);
};

exports.postSpending = async (req, res) => {
  const spending = req.body;
  if (!isValidSpending(spending)) {
    res.status(500).send({
      error: "Invalid spending",
    });
    return;
  }
  spending.spent_at = new Date().toISOString();
  spending.amount = Number(spending.amount);
  await Spending.create(spending);
  // TODO: send back the created spending, with the id
  res.status(201).send(spending);
};

const isValidSpending = (spending) => {
  if (!spending.description) {
    return false;
  }
  if (!spending.amount || spending.amount < 0) {
    return false;
  }
  if (!spending.currency || !validCurrencies.includes(spending.currency)) {
    return false;
  }
  return true;
};
