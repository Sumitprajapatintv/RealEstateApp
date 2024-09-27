import express from "express";
import { signUp,singin,google,signout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/sign-in", singin);

router.post("/google", google);

router.get("/signout", signout);

export default router;
