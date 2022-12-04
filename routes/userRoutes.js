import express from "express";
import { signIn, signUp } from "../controllers/authenticationController.js";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);

export default router;
