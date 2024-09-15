import express from "express";
import { signUp,singin,google } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/sign-in", singin);

router.post("/google", google);

export default router;
