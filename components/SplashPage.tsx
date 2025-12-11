"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

const SplashPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* - Background gradient and decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 dark:to-primary/5" />
      
      {/* - Animated gradient orbs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-pulse delay-1000" />
      
      {/* - Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px"
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
          <SignInButton mode="modal">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              Sign In
            </Button>
          </SignInButton>
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
              Experience excellence with {siteConfig.name}. We deliver more than just 
              services — we deliver peace of mind, reliability, and a personal touch 
              that makes all the difference.
            </p>

            {/* - CTA buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignInButton mode="modal">
                <Button size="lg" className="group h-14 px-8 text-lg shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignInButton>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 border-2 px-8 text-lg"
                onClick={() => window.location.href = "/contact-us"}
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
        </main>

        {/* - Footer */}
        <footer className="container py-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
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

