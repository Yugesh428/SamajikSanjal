import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Validate required env vars early for clearer failures
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error(
    "Missing Cloudinary configuration. Ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set.",
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const sanitize = (name: string) =>
  name
    .replace(/\.[^/.]+$/, "")       // remove extension
    .replace(/[^a-zA-Z0-9-_]/g, "-") // replace unsafe chars
    .replace(/-+/g, "-")
    .toLowerCase();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    // place videos and images/docs in separate folders
    const folder = isVideo ? "samajikSanjal/videos" : "samajikSanjal/images";

    const allowed_formats = [
      "jpg", "jpeg", "png", "webp",
      "pdf", "doc", "docx",
      "mp4", "mov", "mpeg", "webm", "avi", "wmv", "mkv",
    ];

    // create a predictable but unique public_id
    const originalName = file.originalname || "upload";
    const base = sanitize(originalName);
    const public_id = `${base}-${Date.now()}`;

    return {
      folder,
      resource_type: isVideo ? "video" : "image",
      allowed_formats,
      public_id,
    } as any;
  },
});

export { cloudinary, storage };
