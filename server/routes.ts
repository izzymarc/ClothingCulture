import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertProductSchema, 
  insertCollectionSchema, 
  insertCategorySchema,
  insertCartItemSchema,
  type Product
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes and middleware
  setupAuth(app);

  // Collections routes
  app.get("/api/collections", async (_req, res) => {
    try {
      const collections = await storage.getCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });

  app.get("/api/collections/:id", async (req, res) => {
    try {
      const collection = await storage.getCollection(Number(req.params.id));
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });

  // Products routes
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/collections/:id/products", async (req, res) => {
    try {
      const products = await storage.getProductsByCollection(Number(req.params.id));
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Categories routes
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id/products", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(Number(req.params.id));
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Please login to access your cart" });
      }

      const userId = req.user!.id;
      let cart = await storage.getCart(userId);

      if (!cart) {
        cart = await storage.createCart({ userId });
      }

      const items = await storage.getCartItems(cart.id);
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product,
          };
        })
      );

      res.json({ cart, items: itemsWithProducts });
    } catch (error) {
      console.error("Cart fetch error:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart/items", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Please login to add items to cart" });
      }

      const userId = req.user!.id;
      let cart = await storage.getCart(userId);

      if (!cart) {
        cart = await storage.createCart({ userId });
      }

      const product = await storage.getProduct(req.body.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const validatedItem = insertCartItemSchema.parse({
        cartId: cart.id,
        productId: req.body.productId,
        quantity: req.body.quantity || 1
      });

      const cartItem = await storage.addCartItem(validatedItem);
      res.status(201).json({ ...cartItem, product });
    } catch (error) {
      console.error("Add to cart error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to add item to cart" });
      }
    }
  });

  app.patch("/api/cart/items/:id", async (req, res) => {
    try {
      const quantity = z.number().min(1).parse(req.body.quantity);
      const cartItem = await storage.updateCartItemQuantity(
        Number(req.params.id),
        quantity
      );
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to update cart item" });
      }
    }
  });

  app.delete("/api/cart/items/:id", async (req, res) => {
    try {
      await storage.removeCartItem(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  // Admin routes for creating new items
  app.post("/api/products", async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to create product" });
      }
    }
  });

  app.post("/api/collections", async (req, res) => {
    try {
      const validatedCollection = insertCollectionSchema.parse(req.body);
      const collection = await storage.createCollection(validatedCollection);
      res.status(201).json(collection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to create collection" });
      }
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedCategory = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedCategory);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to create category" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}