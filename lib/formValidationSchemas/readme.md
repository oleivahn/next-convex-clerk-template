# Form Validation Schemas

This folder contains Zod validation schemas for form data validation.

## Description

Schemas are used for:

- Form validation (client-side)
- API request validation (server-side)
- Type inference for TypeScript

## Files

- `formTemplateValidationSchema.ts` - Form template validation schema (name, message)
- `splashValidationSchema.ts` - Splash page contact form validation schema (name, email, message)
- `inventoryValidationSchema.ts` - Inventory form validation schema (productName, price, quantity)
- `index.ts` - Re-exports all schemas for convenient imports
