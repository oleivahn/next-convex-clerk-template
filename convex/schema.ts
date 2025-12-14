import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// - This is where we define the database schema for the app
// All the tables are defined here
export default defineSchema({
  testTasks: defineTable({
    taskTest: v.string(),
  }),
  formTemplate: defineTable({
    name: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
  inventoryItems: defineTable({
    productName: v.string(),
    price: v.number(),
    quantity: v.number(),
    createdAt: v.number(),
  }),
});
