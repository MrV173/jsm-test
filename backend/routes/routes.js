import express from "express";
import { create_food, get_all_foods, get_food_by_id } from "../controllers/food_controller.js";
import { transaction } from "../controllers/transaction_controller.js";
const router = express.Router();

router.get("/foods", get_all_foods);
router.get("/food/:id", get_food_by_id);
router.post("/food", create_food);
router.post("/transaction/:food_id", transaction);

export default router;
