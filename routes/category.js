import express from "express";
import { create, list, read, remove, update } from "../controllers/category.js";
import { isAdmin, requireSignin } from "../middlewares/auth.js";
const router = express.Router();

router.post("/category", requireSignin, isAdmin, create);
router.put("/category/:categoryID", requireSignin, isAdmin, update);
router.delete("/category/:categoryID", requireSignin, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);

export default router;
