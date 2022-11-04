// pg 109
import express from "express"
import { updateUser, deleteUser, getUser, getUsers, patternUpdate, updateDates } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "./../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("You are logged in!")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged in and can delete your account!")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("You are logged in and can delete all accounts!")
// })

// router.put("/:id", verifyUser, updateUser)
router.put("/update/pattern", patternUpdate)
router.put("/update/dates", updateDates)

router.put("/:username", updateUser)

router.delete("/:id", verifyUser, deleteUser)

// router.get("/:id", verifyUser, getUser)
router.get("/:username", getUser)

router.delete("/", verifyAdmin, getUsers)

export default router