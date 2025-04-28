import { users, idCards, type User, type InsertUser, type IdCard, type InsertCard } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface étendue pour inclure la gestion des cartes d'identité
export interface IStorage {
  // Gestion des utilisateurs
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Gestion des cartes d'identité
  getCard(id: number): Promise<IdCard | undefined>;
  getAllCards(): Promise<IdCard[]>;
  createCard(card: InsertCard): Promise<IdCard>;
  updateCard(id: number, card: Partial<InsertCard>): Promise<IdCard | undefined>;
  deleteCard(id: number): Promise<boolean>;
}

// Classe de stockage utilisant la base de données
export class DatabaseStorage implements IStorage {
  // Gestion des utilisateurs
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Gestion des cartes d'identité
  async getCard(id: number): Promise<IdCard | undefined> {
    const [card] = await db.select().from(idCards).where(eq(idCards.id, id));
    return card;
  }

  async getAllCards(): Promise<IdCard[]> {
    return await db.select().from(idCards);
  }

  async createCard(card: InsertCard): Promise<IdCard> {
    const [newCard] = await db
      .insert(idCards)
      .values(card)
      .returning();
    return newCard;
  }

  async updateCard(id: number, card: Partial<InsertCard>): Promise<IdCard | undefined> {
    const [updatedCard] = await db
      .update(idCards)
      .set(card)
      .where(eq(idCards.id, id))
      .returning();
    return updatedCard;
  }

  async deleteCard(id: number): Promise<boolean> {
    const result = await db
      .delete(idCards)
      .where(eq(idCards.id, id))
      .returning({ id: idCards.id });
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
