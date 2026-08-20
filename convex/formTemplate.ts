import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { formTemplateValidationSchema } from "../lib/formValidationSchemas";
import { requireAuth } from "./lib/auth";

// - Query to get all form template submissions (requires authentication)
export const get = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx);
    return await ctx.db.query("formTemplate").order("desc").collect();
  },
});

// - Mutation to create a new form template submission with backend validation (requires authentication)
export const create = mutation({
  args: {
    name: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    // - Validate using shared Zod schema
    const result = formTemplateValidationSchema.safeParse(args);

    if (!result.success) {
      const firstError = result.error.errors[0];
      throw new Error(firstError.message);
    }

    // - Insert the form template submission (result.data is trimmed by Zod)
    const entryId = await ctx.db.insert("formTemplate", {
      name: result.data.name,
      message: result.data.message,
      createdAt: Date.now(),
    });

    return entryId;
  },
});
