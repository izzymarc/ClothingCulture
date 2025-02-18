import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  collections,
  products,
  categories,
  type Collection,
  type InsertCollection,
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory,
} from "@shared/schema";

export interface IStorage {
  // Collections
  getCollections(): Promise<Collection[]>;
  getCollection(id: number): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCollection(collectionId: number): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  getUser(id: number): Promise<import("@shared/schema").User | undefined>;
  getUserByUsername(username: string): Promise<import("@shared/schema").User | undefined>;
  createUser(user: import("@shared/schema").InsertUser): Promise<import("@shared/schema").User>;
}

export class DatabaseStorage implements IStorage {
  // Collections
  async getCollections(): Promise<Collection[]> {
    return await db.select().from(collections);
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    const [collection] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, id));
    return collection;
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    const [newCollection] = await db
      .insert(collections)
      .values(collection)
      .returning();
    return newCollection;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product;
  }

  async getProductsByCollection(collectionId: number): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.collectionId, collectionId));
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }
    async getUser(id: number): Promise<import("@shared/schema").User | undefined> {
        throw new Error("Method not implemented.");
    }
    async getUserByUsername(username: string): Promise<import("@shared/schema").User | undefined> {
        throw new Error("Method not implemented.");
    }
    async createUser(user: import("@shared/schema").InsertUser): Promise<import("@shared/schema").User> {
        throw new Error("Method not implemented.");
    }
}

export const storage = new DatabaseStorage();