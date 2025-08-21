'use client';

import { FeatureCard } from '@/components/feature-card';
import { HowItWorksCard } from '@/components/how-it-works-card';
import { DragDropIcon, PhoneLaptop } from '@/components/icons';
import { PlaceholderLogo } from '@/components/logo';
import LightRays from '@/components/react-bits/light-rays';
import Silk from '@/components/react-bits/silk';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Code,
  Database,
  Download,
  Github,
  HelpCircle,
  Home,
  Layers,
  LucideIcon,
  Palette,
  Save,
  Shield,
  Twitter,
  Undo2,
} from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="relative mx-auto">
        <div className="absolute inset-0 h-screen">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>

        <div className="relative z-10">
          {/* Sticky Navbar */}
          <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center space-x-3">
                  <PlaceholderLogo className="text-background size-6" />
                  <span>MailYard</span>
                </div>
                <Button asChild>
                  <Link href="/design">Get Started</Link>
                </Button>
              </div>
            </div>
          </nav>

          <div className="mx-auto max-w-7xl space-y-48 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="pt-20 pb-16">
              <div className="mx-auto max-w-7xl text-center">
                <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                  Build Beautiful Emails
                  <span className="text-primary block">Without the Hassle</span>
                </h1>
                <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
                  Create stunning, responsive email templates with our intuitive drag-and-drop
                  editor. No coding required - just beautiful emails that work everywhere.
                </p>
                <Button size="lg" asChild>
                  <Link href="/design" className="group mb-12">
                    Get Started
                    <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </Button>

                {/* Hero Image Placeholder */}
                <div className="bg-muted mx-auto max-w-5xl overflow-hidden rounded-lg border">
                  <div className="bg-muted flex aspect-video items-center justify-center">
                    A video comes here
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section - Bento Grid */}
            <section className="py-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">Everything You Need</h2>
                <p className="text-muted-foreground text-xl">
                  Powerful features to create professional emails
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FeatureCard
                  title="Drag & Drop Editor"
                  description="Build emails visually by dragging and dropping blocks. Rearrange text, images, buttons, and more with intuitive controls that make email design effortless."
                  icon={DragDropIcon as LucideIcon}
                  type="dnd"
                />
                <FeatureCard
                  title="Live Preview"
                  description="See exactly how your email will look in an inbox on desktop and mobile devices. Preview in real-time as you make changes to ensure perfect presentation every time."
                  icon={PhoneLaptop as LucideIcon}
                  type="preview"
                />
                <FeatureCard
                  title="Visual Styling"
                  description="Customize every aspect of your email with intuitive visual controls. Adjust colors, fonts, spacing, and layouts with real-time preview - no coding required."
                  icon={Palette}
                  type="styling"
                />
                <FeatureCard
                  title="React Export"
                  description="Export your finished emails as clean React components using @react-email. Perfect for developers who want production-ready code that integrates seamlessly."
                  icon={Code}
                  type="export"
                />
              </div>
            </section>
            {/* How It Works Section */}
            <section className="px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
                  <p className="text-muted-foreground text-xl">
                    Get from idea to email in three simple steps
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                  {/* Step 1 */}
                  <HowItWorksCard
                    step={1}
                    title="Choose Your Blocks"
                    description="Start with text, images, buttons, and other email elements from our library."
                  >
                    <div className="space-y-2">
                      <div className="bg-primary/10 border-primary/20 flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm">
                        <div className="bg-primary size-2 rounded-full"></div>
                        <span className="text-sm">Heading Block</span>
                      </div>
                      <div className="bg-muted/50 border-border flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm">
                        <div className="bg-muted size-2 rounded-full"></div>
                        <span className="text-muted-foreground text-sm">Text Block</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 shadow-sm dark:border-blue-800 dark:bg-blue-950/50">
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-blue-600 dark:text-blue-400">
                          Button Block
                        </span>
                      </div>
                    </div>
                  </HowItWorksCard>

                  {/* Step 2 */}
                  <HowItWorksCard
                    step={2}
                    title="Drag & Customize"
                    description="Arrange your blocks and customize colors, fonts, spacing, and more with our visual editor."
                  >
                    <div className="space-y-3">
                      <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded-lg border px-3 py-2 shadow-sm">
                        <span className="text-sm">Welcome Newsletter!</span>
                        <div className="flex gap-1">
                          <div className="size-3 rounded-full bg-blue-500"></div>
                          <div className="size-3 rounded-full bg-green-500"></div>
                          <div className="size-3 rounded-full bg-red-500"></div>
                        </div>
                      </div>

                      {/* Text Size Control */}
                      <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded-lg border px-3 py-2 shadow-sm">
                        <div className="text-sm">Text Size</div>
                        <div className="flex items-center gap-2">
                          <div className="bg-primary h-1 w-6 rounded-full"></div>
                          <div className="bg-muted h-1 w-4 rounded-full"></div>
                          <span className="text-muted-foreground text-xs">18px</span>
                        </div>
                      </div>

                      {/* Text Font Control */}
                      <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded-lg border px-3 py-2 shadow-sm">
                        <div className="text-sm">Font Family</div>
                        <div className="text-xs">Arial, sans-serif</div>
                      </div>
                    </div>
                  </HowItWorksCard>

                  {/* Step 3 */}
                  <HowItWorksCard
                    step={3}
                    title="Export & Send"
                    description="Export your email as React code and use it in your projects."
                  >
                    <div className="space-y-2">
                      <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 pb-4 shadow-sm dark:border-green-800 dark:bg-green-950/50">
                        <span className="mb-1 text-xs font-medium text-green-700 dark:text-green-300">
                          React Export
                        </span>
                        <div className="font-mono text-xs text-green-600 dark:text-green-400">
                          <span>&lt;Html&gt;</span>
                          <br />
                          <span className="ml-4">&lt;Body&gt;...</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 shadow-sm dark:border-blue-800 dark:bg-blue-950/50">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          Ready to use in your project!
                        </span>
                      </div>
                    </div>
                  </HowItWorksCard>
                </div>
              </div>
            </section>

            {/* Future Features Section */}
            <section className="px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold">Coming Soon</h2>
                  <p className="text-muted-foreground text-xl">Exciting features in development</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="from-background/40 to-background/20 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm">
                    <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
                    <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

                    <div className="relative">
                      <div className="mb-4 flex items-center space-x-3">
                        <div className="bg-primary/20 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg">
                          <Layers className="text-primary h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Advanced Layout</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Create complex layouts with Section Blocks to group multiple elements and
                        Grid Blocks for multi-column designs. Perfect for newsletters and marketing
                        emails.
                      </p>
                    </div>
                  </div>

                  <div className="from-background/40 to-background/20 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm">
                    <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
                    <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

                    <div className="relative">
                      <div className="mb-4 flex items-center space-x-3">
                        <div className="bg-primary/20 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg">
                          <Undo2 className="text-primary h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Undo / Redo System</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Never lose your work with comprehensive undo/redo functionality. Experiment
                        freely knowing you can always go back to any previous state.
                      </p>
                    </div>
                  </div>

                  <div className="from-background/40 to-background/20 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm">
                    <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
                    <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

                    <div className="relative">
                      <div className="mb-4 flex items-center space-x-3">
                        <div className="bg-primary/20 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg">
                          <Database className="text-primary h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Database & Authentication</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Save your work to the cloud with user accounts. Sync your templates across
                        devices and collaborate with team members on email projects.
                      </p>
                    </div>
                  </div>

                  <div className="from-background/40 to-background/20 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm">
                    <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
                    <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

                    <div className="relative">
                      <div className="mb-4 flex items-center space-x-3">
                        <div className="bg-primary/20 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg">
                          <Home className="text-primary h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Design Gallery</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        A beautiful home page showcasing all your email designs with live previews,
                        search functionality, and organization features for easy template
                        management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground text-xl">
                    Everything you need to know about MailYard
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="bg-background border-border rounded-xl border shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                          <HelpCircle className="text-primary h-4 w-4" />
                        </div>
                        <span className="text-lg font-semibold">
                          Is MailYard really free to use?
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-12">
                        <p className="text-muted-foreground leading-relaxed">
                          Yes! MailYard is completely free to use. You can create unlimited emails
                          and export them without any restrictions. Build beautiful emails without
                          worrying about usage limits or subscription fees.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="bg-background border-border rounded-xl border shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50">
                          <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-lg font-semibold">
                          Do I need coding knowledge to use this?
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-12">
                        <p className="text-muted-foreground leading-relaxed">
                          Not at all! Our drag-and-drop interface is designed for anyone to use,
                          regardless of technical background. However, developers will appreciate
                          the clean React code export options for seamless integration.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="bg-background border-border rounded-xl border shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-950/50">
                          <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-lg font-semibold">
                          Will my emails work in all email clients?
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-12">
                        <p className="text-muted-foreground leading-relaxed">
                          Yes, we use email-safe HTML and inline styles to ensure maximum
                          compatibility across all major email clients including Gmail, Outlook,
                          Apple Mail, and Yahoo Mail. Your emails will look great everywhere.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="bg-background border-border rounded-xl border shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/50">
                          <Save className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-lg font-semibold">
                          Can I save my email templates?
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-12">
                        <p className="text-muted-foreground leading-relaxed">
                          Currently, you can export your templates as React code for local storage.
                          We&apos;re actively working on cloud saving and template management
                          features that will be available soon.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-5"
                    className="bg-background border-border rounded-xl border shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-950/50">
                          <Download className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="text-lg font-semibold">
                          What export formats are supported?
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-12">
                        <p className="text-muted-foreground leading-relaxed">
                          You can export your emails as clean React components using
                          @react-email/components, making them perfect for modern development
                          workflows and easy integration into your projects.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative mx-auto mb-16 h-72 max-w-5xl overflow-hidden rounded-2xl border">
              <Silk speed={5} scale={1} color="#49494A" noiseIntensity={1.5} rotation={0} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold">Ready to get started?</h2>
                <p className="text-foreground mt-2">
                  Create your first email template today and see how easy it is to build beautiful
                  emails.
                </p>
                <Button asChild className="mt-6" size="lg">
                  <Link href="/design" className="group">
                    Get Started
                    <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 flex items-center space-x-3 md:mb-0">
                  <PlaceholderLogo className="text-background size-6" />
                  <span>MailYard</span>
                </div>

                <div className="flex items-center space-x-6">
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div className="mt-8 border-t pt-8 text-center">
                <p className="text-muted-foreground text-sm">
                  © 2025 MailYard. Add rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
