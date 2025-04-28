import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const idCards = pgTable("id_cards", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  realName: text("real_name").notNull(),
  nationality: text("nationality").notNull(),
  status: text("status").notNull(),
  genre: text("genre").notNull(),
  quote: text("quote").notNull(),
  photo: text("photo"),
  qrCodeEnabled: boolean("qr_code_enabled").notNull().default(false),
  qrCodeLink: text("qr_code_link"),
  cardNumber: text("card_number").notNull(),
  issueDate: text("issue_date").notNull(),
});

export const CardValidationSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "Le nom d'utilisateur est requis").max(50),
  realName: z.string().min(1, "Le nom réel est requis").max(100),
  nationality: z.string().min(1, "La nationalité est requise"),
  status: z.string().min(1, "Le statut est requis"),
  genre: z.string().min(1, "Le genre d'anime préféré est requis"),
  quote: z.string().min(1, "La citation est requise").max(500, "La citation ne peut pas dépasser 500 caractères"),
  photo: z.string().optional(),
  qrCodeEnabled: z.boolean().default(false),
  qrCodeLink: z.string().url("Veuillez saisir une URL valide").optional().or(z.literal("")),
  cardNumber: z.string().optional(),
  issueDate: z.string().optional(),
});

export const insertCardSchema = createInsertSchema(idCards).pick({
  username: true,
  realName: true,
  nationality: true,
  status: true,
  genre: true,
  quote: true,
  photo: true,
  qrCodeEnabled: true,
  qrCodeLink: true,
  cardNumber: true,
  issueDate: true,
});

export type InsertCard = z.infer<typeof insertCardSchema>;
export type IdCard = typeof idCards.$inferSelect;
export type User = typeof users.$inferSelect;

// Keep the users table for auth if needed
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
