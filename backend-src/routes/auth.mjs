import "dotenv/config";
import bodyParser from "body-parser";
import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.mjs";

const { urlencoded } = bodyParser;

const router = Router();

router.post("*", urlencoded({ extended: false }));

router.post("/signup", signup);
router.post("/login", login);

router.get("/logout", logout);

export default router;
