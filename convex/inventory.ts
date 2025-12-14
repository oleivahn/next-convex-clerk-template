import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { inventoryFormValidationSchema } from "../lib/formValidationSchemas";

// - Query to get all inventory items
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inventoryItems").order("desc").collect();
  },
});

// - Mutation to create a new inventory item with backend validation
export const create = mutation({
  args: {
    productName: v.string(),
    price: v.number(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    // - Validate using shared Zod schema
    const result = inventoryFormValidationSchema.safeParse(args);

    if (!result.success) {
      const firstError = result.error.errors[0];
      throw new Error(firstError.message);
    }

    // - Insert the inventory item (result.data is trimmed by Zod)
    const itemId = await ctx.db.insert("inventoryItems", {
      productName: result.data.productName,
      price: result.data.price,
      quantity: result.data.quantity,
      createdAt: Date.now(),
    });

    return itemId;
  },
});
