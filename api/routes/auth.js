import express from "express";
import { login, register, logout, activateAccount, forgotPassword, resetPassword } from "./../controllers/auth.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/email-activate", activateAccount)
router.put("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)
// router.get("/user", user)

export default router