import { Router } from "express";
import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/authController";
import { isLoggedIn } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", isLoggedIn as any, getMe);
router.post("/logout", isLoggedIn as any, logout);

export default router;
