import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../../controllers/postController/postController";

// ✅ Like Controller
import { toggleLike } from "../../controllers/likeController/likeController";

// ✅ Comment Controller
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../../controllers/commentController/commentController";

// ✅ Middlewares
import { isLoggedIn } from "../../middleware/authMiddleware";
import upload from "../../middleware/uploadMiddleware";

const router = express.Router();

// ───────────── POSTS ─────────────

// 🔹 Create Post (with media upload)
router.post("/", isLoggedIn, upload.array("media", 10), createPost);

// 🔹 Get All Posts (Feed)
router.get("/", getAllPosts);

// 🔹 Get Single Post
router.get("/:id", getPostById);

// 🔹 Update Post (only owner)
router.put("/:id", isLoggedIn, updatePost);

// 🔹 Delete Post (only owner)
router.delete("/:id", isLoggedIn, deletePost);

// ───────────── LIKE ─────────────

// ❤️ Like / Unlike (toggle)
router.post("/:id/like", isLoggedIn, toggleLike);

// ───────────── COMMENTS ─────────────

// 💬 Add Comment / Reply
router.post("/:postId/comment", isLoggedIn, createComment);

// 💬 Get all comments of a post
router.get("/:postId/comments", getCommentsByPost);

// 💬 Update comment
router.put("/comment/:id", isLoggedIn, updateComment);

// 💬 Delete comment
router.delete("/comment/:id", isLoggedIn, deleteComment);

export default router;
