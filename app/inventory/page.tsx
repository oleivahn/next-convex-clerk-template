"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { inventoryFormValidationSchema } from "@/lib/formValidationSchemas";

// - UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

export default function InventoryPage() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const createInventoryItem = useMutation(api.inventory.create);
  const inventoryItems = useQuery(api.inventory.get);

  const defaultValues = {
    productName: "",
    price: 0,
    quantity: 0,
  };

  // - Validation
  const form = useForm<z.output<typeof inventoryFormValidationSchema>>({
    resolver: zodResolver(inventoryFormValidationSchema),
    defaultValues: defaultValues,
  });

  // - Form Submit
  const submitForm = async (
    values: z.infer<typeof inventoryFormValidationSchema>
  ) => {
    setPending(true);
    setError("");

    try {
      await createInventoryItem({
        productName: values.productName,
        price: values.price,
        quantity: values.quantity,
      });

      console.log("📗 [ Data Created ]:", values);
      toast({
        variant: "success",
        title: "Item added to inventory!",
        description: `${values.productName} has been added.`,
      });
      // - Reset the form and clear validation errors on success
      form.reset(defaultValues);
      form.clearErrors();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("📕 [ Error ]:", errorMessage);
      setError(errorMessage);
    } finally {
      setPending(false);
    }
  };

  // - Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="container mt-10 flex flex-col items-center px-4">
      {/* - Form Card */}
      <Card className="w-full max-w-2xl px-6 py-8 shadow-lg dark:bg-darker">
        <CardHeader className="mb-4">
          <CardTitle className="mb-2 text-3xl font-bold text-primary">
            Inventory
          </CardTitle>
          <CardDescription>
            Add new products to your inventory by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-6"
            >
              {/* - Product Name */}
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* - Price and Quantity in a row */}
              <div className="grid grid-cols-2 gap-4">
                {/* - Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* - Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Items</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* - Submit Button */}
              <Button
                type="submit"
                disabled={pending}
                className="h-12 w-full"
              >
                {pending ? "Adding..." : "Add to Inventory"}
              </Button>

              {/* - Error Display */}
              {error && (
                <div className="mt-4 text-center text-red-500">
                  <p>Server Error:</p>
                  <p>{error}</p>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* - Inventory Table */}
      {inventoryItems && inventoryItems.length > 0 && (
        <Card className="mt-8 w-full max-w-2xl shadow-lg dark:bg-darker">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Inventory Items
            </CardTitle>
            <CardDescription>
              {inventoryItems.length} item{inventoryItems.length !== 1 ? "s" : ""} in inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(item.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* - Empty State */}
      {inventoryItems && inventoryItems.length === 0 && (
        <Card className="mt-8 w-full max-w-2xl shadow-lg dark:bg-darker">
          <CardContent className="py-8 text-center text-muted-foreground">
            No items in inventory yet. Add your first item above!
          </CardContent>
        </Card>
      )}
    </div>
  );
}

