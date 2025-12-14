import { z } from "zod";

/**
 * Inventory form validation schema
 * Fields: productName, price, quantity
 * Validation rules match backend (convex/inventory.ts)
 */
export const inventoryFormValidationSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(1, { message: "Product name is required." })
    .max(200, { message: "Product name cannot exceed 200 characters." }),
  price: z
    .number()
    .min(0, { message: "Price must be a positive number." })
    .max(1000000, { message: "Price cannot exceed 1,000,000." }),
  quantity: z
    .number()
    .int({ message: "Quantity must be a whole number." })
    .min(0, { message: "Quantity must be a positive number." })
    .max(100000, { message: "Quantity cannot exceed 100,000." }),
});

// - Export the inferred type for use in components and data layer
export type InventoryFormData = z.infer<typeof inventoryFormValidationSchema>;

