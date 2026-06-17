import multer from "multer";
import { Request } from "express";
import { storage } from "../services/cloudinaryConfig";

// ── Uses Cloudinary storage so uploaded files go directly to Cloudinary
// ── req.file.path      → cloudinary secure URL
// ── req.file.filename  → cloudinary public_id

const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200 MB (videos)

/*
  Note: multer accepts a single global fileSize limit. We set it high enough
  to allow videos. If you need strict per-field limits, enforce them in
  a custom middleware after upload or use a different approach.
*/
const upload = multer({
  storage: storage,
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedFileTypes = [
      // Images
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      // Documents
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // Videos (expanded)
      "video/mp4",
      "video/mpeg",
      "video/quicktime",   // .mov
      "video/webm",
      "video/x-msvideo",  // .avi
      "video/x-ms-wmv",   // .wmv
    ];

    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err: any = new Error(
        "Invalid file type. Only images, PDF/DOC/DOCX, or video files are allowed!"
      );
      err.code = "INVALID_FILE_TYPE";
      cb(err);
    }
  },
  limits: {
    // allow large files (videos). Keep an eye on memory/timeout when accepting big uploads.
    fileSize: MAX_VIDEO_SIZE,
  },
});

export default upload;

// Helpful hints:
// - Frontend must send multipart/form-data and attach files to:
//     media      -> allow multiple files (images/videos)
//     thumbnail  -> single image (optional)
// - Use FormData on client: form.append('media', file)
// - If you need stricter per-field size limits, validate sizes after upload
//   and delete unwanted files from Cloudinary.
