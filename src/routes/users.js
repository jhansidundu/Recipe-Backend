import express from "express";
import { login, signup, validateToken } from "../controllers/users.js";
import { validateAccessToken } from "../util/middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/validate-token", validateAccessToken, validateToken);

export default router;
