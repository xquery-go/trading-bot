import express from "express";
const router = express.Router();

// import controller
import { stockPrice } from "../controller/app.controller.js";

// define routes
router.route("/stock-price").get(stockPrice);
export default router;
