import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../../controllers/postController/postController";

// ✅ Middlewares
import { isLoggedIn } from "../../middleware/authMiddleware";
import upload from "../../middleware/uploadMiddleware";

const router = express.Router();

// 🔹 Create Post (with media upload)
router.post(
  "/",
  isLoggedIn,
  upload.array("media", 10), // max 10 files
  createPost,
);

// 🔹 Get All Posts (Feed)
router.get("/", getAllPosts);

// 🔹 Get Single Post
router.get("/:id", getPostById);

// 🔹 Update Post (only owner)
router.put("/:id", isLoggedIn, updatePost);

// 🔹 Delete Post (only owner)
router.delete("/:id", isLoggedIn, deletePost);

export default router;
