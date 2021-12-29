import { Router } from "express";
import {
  getAllUsers,
  addNewUser,
  editUser,
  deleteUser,
} from "../controllers/users.js";

const router = Router();

router.get("/api/v1.0/users", getAllUsers);
router.post("/api/v1.0/users/:name", addNewUser);
router.put("/api/v1.0/users/:id/:name", editUser);
router.delete("/api/v1.0/users/:id", deleteUser);

export default router;
