import express from "express";
import {
  toggleFollow,
  getFollowers,
  getFollowing,
} from "../../controllers/followController/followController";

import { isLoggedIn } from "../../middleware/authMiddleware";

const router = express.Router();

// ───────────── FOLLOW SYSTEM ─────────────

// ✅ Follow / Unfollow (toggle)
router.post("/:id/follow", isLoggedIn, toggleFollow);

// ✅ Get all followers of a user
router.get("/:id/followers", getFollowers);

// ✅ Get all users someone is following
router.get("/:id/following", getFollowing);

export default router;
