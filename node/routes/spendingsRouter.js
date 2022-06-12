const express = require("express");
const router = express.Router();
const spendingsController = require("../controllers/spendingsController");

router.get("/spendings", spendingsController.getSpendings);
router.post("/spendings", spendingsController.postSpending);

module.exports = router;
