import express from "express";
import { login, register } from "../controllers/auth.js";
import { requireSignin } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});

export default router;
