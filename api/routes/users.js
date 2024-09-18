import express from "express"
import { updateUser, deleteUser, getUser, getUsers, patternUpdate, updateDates } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "./../utils/verifyToken.js";

const router = express.Router();

router.put("/update/pattern", patternUpdate);
router.put("/update/dates", updateDates);

router.put("/:username", updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:username", getUser);

router.delete("/", verifyAdmin, getUsers);

export default router;