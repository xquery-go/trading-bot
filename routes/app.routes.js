import express from "express";
const router = express.Router();

// define controller
router.route("/stock-price").get(stockPrice);
export default router;
