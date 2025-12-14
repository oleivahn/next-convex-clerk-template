"use client";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formTemplateValidationSchema } from "@/lib/formValidationSchemas";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// - UI Components
import { Button } from "../ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

//
//
//
// - Main Component
const FormTemplate = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const createFormEntry = useMutation(api.formTemplate.create);

  const defaultValues = {
    name: "",
    message: "",
  };

  // - Validation
  const form = useForm<z.output<typeof formTemplateValidationSchema>>({
    resolver: zodResolver(formTemplateValidationSchema),
    defaultValues: defaultValues,
  });

  // - Form Submit
  const submitForm = async (
    values: z.infer<typeof formTemplateValidationSchema>
  ) => {
    setPending(true);
    setError("");

    try {
      await createFormEntry({
        name: values.name,
        message: values.message,
      });

      console.log("📗 [ Data Created ]:", values);
      toast({
        variant: "success",
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      // - Reset the form only on success
      form.reset(defaultValues);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("📕 [ Error ]:", errorMessage);
      setError(errorMessage);
    } finally {
      setPending(false);
    }
  };

  // - Markup
  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Card className="w-full px-6 py-8 shadow-lg dark:bg-darker md:w-[650px]">
        <CardHeader className="mb-4">
          <CardTitle className="mb-6 text-4xl font-bold text-primary">
            Contact Us
          </CardTitle>
          <CardDescription>
            Send us a direct message and a member of our team will reach out to
            you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-6"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Add your name" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-44"
                        placeholder="Add your message here..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-16 flex justify-end">
                <Button
                  type="submit"
                  disabled={pending}
                  className="h-12 w-full"
                >
                  {pending ? "Sending..." : "Send Message"}
                </Button>
              </div>
              {error && (
                <>
                  <div className="mt-4 text-center text-red-500">
                    Server Error:
                  </div>
                  <div className="text-center text-red-500">{error}</div>
                </>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormTemplate;
