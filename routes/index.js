import userSignup from "./users.js";

import express from "express";

const router = express.Router();

router.use("/user", userSignup);

export default router;
