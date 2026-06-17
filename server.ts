import "dotenv/config";
import app from "./src/app";
import { connectDB } from "./src/config/database";

const PORT = process.env.PORT || 8000;

// ── Start Server ──────────────────────────────────────────
const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

start();
