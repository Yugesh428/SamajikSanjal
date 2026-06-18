import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// ── Routes ─────────────────────────────────────────────────
import authRoutes from "../src/routes/authRoutes";
import postRoutes from "../src/routes/postRoutes/postRoute";
import followRoutes from "../src/routes/followRoute/followRoute";

const app = express();

// ── Global Middleware ──────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ serve uploads
app.use("/uploads", express.static("uploads"));

// ── API Routes ─────────────────────────────────────────────

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Post system (posts + likes + comments)
app.use("/api/posts", postRoutes);

// ✅ Follow system (users follow)
app.use("/api/users", followRoutes);

// ── Health check ───────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "SamajikSanjal API is running 🚀",
  });
});

// ── Global Error Handler ───────────────────────────────────
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${status} - ${message}`);

  res.status(status).json({
    success: false,
    message,
  });
});

export default app;
