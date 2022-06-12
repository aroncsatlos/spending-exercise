const spendings = [];

const validCurrencies = ["HUF", "USD"];

exports.getSpendings = (req, res) => {
  const { currency, orderBy, orderDirection } = req.query;
  const filteredSpendings = spendings.filter((spending) => {
    if (currency) {
      return spending.currency === currency;
    }
    return true;
  });
  let filteredOrderedSpendings = filteredSpendings;
  if (orderBy && orderDirection) {
    filteredOrderedSpendings = filteredSpendings.sort((a, b) => {
      if (orderDirection === "asc") {
        return a[orderBy] - b[orderBy];
      }
      return b[orderBy] - a[orderBy];
    });
  }
  res.status(200).send(filteredOrderedSpendings);
};

exports.postSpending = (req, res) => {
  const spending = req.body;
  if (!isValidSpending(spending)) {
    res.status(500).send({
      error: "Invalid spending",
    });
    return;
  }
  spending.spent_at = new Date().toISOString();
  spending.id = spendings.length + 1;
  spending.amount = Number(spending.amount);
  spendings.push(spending);
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
