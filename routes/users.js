import express from "express";
import { Signup, Login } from "../controllers/users.js";
import { validateAccessToken } from "../util/middleware.js";
import { validateToken } from "../controllers/users.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/validate-token", validateAccessToken, validateToken);

export default router;
