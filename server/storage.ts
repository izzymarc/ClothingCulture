import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  collections,
  products,
  categories,
  carts,
  cartItems,
  type Collection,
  type InsertCollection,
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory,
  type Cart,
  type InsertCart,
  type CartItem,
  type InsertCartItem,
  users,
  type User,
  type InsertUser,
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

  // Cart
  getCart(userId: number): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  getCartItems(cartId: number): Promise<CartItem[]>;
  addCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(cartItemId: number, quantity: number): Promise<CartItem>;
  removeCartItem(cartItemId: number): Promise<void>;

  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
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

  // Cart operations
  async getCart(userId: number): Promise<Cart | undefined> {
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));
    return cart;
  }

  async createCart(cart: InsertCart): Promise<Cart> {
    const [newCart] = await db
      .insert(carts)
      .values(cart)
      .returning();
    return newCart;
  }

  async getCartItems(cartId: number): Promise<CartItem[]> {
    return await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, cartId));
  }

  async addCartItem(cartItem: InsertCartItem): Promise<CartItem> {
    const [newItem] = await db
      .insert(cartItems)
      .values(cartItem)
      .returning();
    return newItem;
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number): Promise<CartItem> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, cartItemId))
      .returning();
    return updatedItem;
  }

  async removeCartItem(cartItemId: number): Promise<void> {
    await db
      .delete(cartItems)
      .where(eq(cartItems.id, cartItemId));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db
      .insert(users)
      .values(user)
      .returning();
    return newUser;
  }
}

export const storage = new DatabaseStorage();