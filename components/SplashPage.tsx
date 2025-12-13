"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./Theme-toggle";
import { splashFormValidationSchema } from "@/lib/formValidationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SplashPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    message: "",
  };

  // - Validation
  const form = useForm<z.output<typeof splashFormValidationSchema>>({
    resolver: zodResolver(splashFormValidationSchema),
    defaultValues: defaultValues,
  });

  // - Form Submit
  const submitForm = async (
    values: z.infer<typeof splashFormValidationSchema>
  ) => {
    setIsSubmitting(true);

    // - Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("📗 [ Data Submitted ]:", values);
    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset(defaultValues);

    // - Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(214,15%,88%)] dark:bg-background">
      {/* - Background gradient and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 dark:from-background dark:via-background dark:to-primary/5" />

      {/* - Animated gradient orbs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-32 top-1/4 h-80 w-80 animate-pulse rounded-full bg-accent/30 blur-3xl delay-700" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-pulse rounded-full bg-primary/15 blur-3xl delay-1000" />

      {/* - Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* - Main content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* - Header */}
        <header className="container flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground md:text-3xl">
              {siteConfig.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle
              className="border border-orange-400 dark:border-transparent"
              moonClassName="text-400"
            />
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>
        </header>

        {/* - Hero section */}
        <main className="container flex flex-1 flex-col items-center justify-center px-4 text-center md:px-6">
          <div className="max-w-4xl space-y-8">
            {/* - Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              Welcome to the future of service
            </div>

            {/* - Main headline */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Service You Can{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  Trust
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary/50"
                  />
                </svg>
              </span>
            </h1>

            {/* - Subtitle */}
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Experience excellence with {siteConfig.name}. We deliver more than
              just services — we deliver peace of mind, reliability, and a
              personal touch that makes all the difference.
            </p>

            {/* - CTA buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="group h-14 px-8 text-lg shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignInButton>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 px-8 text-lg"
                onClick={() =>
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* - Feature cards */}
          <div className="mt-20 grid w-full max-w-5xl gap-6 sm:grid-cols-3">
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Trusted & Secure"
              description="Your trust is our priority. We ensure security and reliability in every interaction."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Fast & Efficient"
              description="Experience lightning-fast service delivery without compromising on quality."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Personal Touch"
              description="We treat every client like family, providing personalized solutions just for you."
            />
          </div>

          {/* - Contact Form Section */}
          <div id="contact-form" className="mt-24 w-full max-w-2xl scroll-mt-8">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Mail className="h-4 w-4" />
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Let&apos;s Start a Conversation
              </h2>
              <p className="mt-3 text-muted-foreground">
                Have questions? We&apos;d love to hear from you. Send us a
                message and we&apos;ll respond as soon as possible.
              </p>
            </div>

            <form onSubmit={form.handleSubmit(submitForm)} className="relative">
              {/* - Form card with glassmorphism */}
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg">
                {/* - Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

                <div className="relative z-10 space-y-6">
                  {/* - Name field */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <User className="h-4 w-4 text-primary" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      {...form.register("name")}
                      className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 ${
                        form.formState.errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      }`}
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* - Email field */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      {...form.register("email")}
                      className={`w-full rounded-xl border bg-background/50 px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 ${
                        form.formState.errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      }`}
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* - Message field */}
                  <div className="group">
                    <label
                      htmlFor="message"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      {...form.register("message")}
                      className={`w-full resize-none rounded-xl border bg-background/50 px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 ${
                        form.formState.errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                      }`}
                    />
                    {form.formState.errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* - Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="group h-12 w-full text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  {/* - Success message */}
                  {isSubmitted && (
                    <p className="text-center text-sm text-green-600 dark:text-green-400">
                      Thank you! We&apos;ll get back to you soon.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </main>

        {/* - Footer */}
        <footer className="container py-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 hover:shadow-lg">
      {/* - Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SplashPage;
