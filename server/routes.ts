import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { CardValidationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const inMemoryStorage = multer.memoryStorage();
const upload = multer({
  storage: inMemoryStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max file size
  },
  fileFilter: (_req, file, cb) => {
    // Accept only images
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed"));
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to validate card data
  app.post("/api/validate-card", (req, res) => {
    try {
      const validatedData = CardValidationSchema.parse(req.body);
      res.status(200).json({ success: true, data: validatedData });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "An unexpected error occurred" 
        });
      }
    }
  });

  // API endpoint to handle file uploads
  app.post("/api/upload", upload.single("photo"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    try {
      // Convert the Buffer to a base64 string
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      res.status(200).json({ 
        success: true, 
        imageUrl: base64Image 
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to process the uploaded image" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
