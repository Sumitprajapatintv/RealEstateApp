import express from "express";
import { signUp,singin } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/sign-in", singin);

export default router;
