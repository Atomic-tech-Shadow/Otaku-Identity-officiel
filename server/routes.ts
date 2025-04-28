import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { CardValidationSchema, insertCardSchema } from "@shared/schema";
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

// Fonction d'aide pour gérer les erreurs
const handleError = (error: unknown, res: Response) => {
  console.error("API Error:", error);
  
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);
    return res.status(400).json({
      success: false,
      error: validationError.message
    });
  }
  
  return res.status(500).json({
    success: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred"
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint pour valider les données de carte
  app.post("/api/validate-card", (req, res) => {
    try {
      const validatedData = CardValidationSchema.parse(req.body);
      res.status(200).json({ success: true, data: validatedData });
    } catch (error) {
      handleError(error, res);
    }
  });

  // API endpoint pour gérer les téléchargements de fichiers
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
      handleError(error, res);
    }
  });

  // API endpoint pour récupérer toutes les cartes
  app.get("/api/cards", async (_req, res) => {
    try {
      const cards = await storage.getAllCards();
      res.status(200).json({ success: true, data: cards });
    } catch (error) {
      handleError(error, res);
    }
  });

  // API endpoint pour récupérer une carte par ID
  app.get("/api/cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: "Invalid ID format" });
      }

      const card = await storage.getCard(id);
      if (!card) {
        return res.status(404).json({ success: false, error: "Card not found" });
      }

      res.status(200).json({ success: true, data: card });
    } catch (error) {
      handleError(error, res);
    }
  });

  // API endpoint pour créer une nouvelle carte
  app.post("/api/cards", async (req, res) => {
    try {
      const cardData = insertCardSchema.parse(req.body);
      const newCard = await storage.createCard(cardData);
      res.status(201).json({ success: true, data: newCard });
    } catch (error) {
      handleError(error, res);
    }
  });

  // API endpoint pour mettre à jour une carte
  app.put("/api/cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: "Invalid ID format" });
      }

      // Vérifier si la carte existe
      const existingCard = await storage.getCard(id);
      if (!existingCard) {
        return res.status(404).json({ success: false, error: "Card not found" });
      }

      const cardData = insertCardSchema.partial().parse(req.body);
      const updatedCard = await storage.updateCard(id, cardData);
      res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
      handleError(error, res);
    }
  });

  // API endpoint pour supprimer une carte
  app.delete("/api/cards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, error: "Invalid ID format" });
      }

      const success = await storage.deleteCard(id);
      if (!success) {
        return res.status(404).json({ success: false, error: "Card not found" });
      }

      res.status(200).json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
