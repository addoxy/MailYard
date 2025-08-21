'use client';

import { FeatureCard } from '@/components/feature-card';
import { DragDropIcon, PhoneLaptop } from '@/components/icons';
import { PlaceholderLogo } from '@/components/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronRight,
  Code,
  Database,
  Github,
  Grid,
  Home,
  Layers,
  LucideIcon,
  Palette,
  Twitter,
  Undo2,
} from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-background relative z-10 mx-auto min-h-screen">
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

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Build Beautiful Emails
              <span className="text-primary block">Without the Hassle</span>
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
              Create stunning, responsive email templates with our intuitive drag-and-drop editor.
              No coding required - just beautiful emails that work everywhere.
            </p>
            <Button size="lg" asChild className="mb-12">
              <Link href="/design">Get Started</Link>
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
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
              <p className="text-muted-foreground text-xl">
                Get from idea to email in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-primary text-2xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Choose Your Blocks</h3>
                <p className="text-muted-foreground">
                  Start with text, images, buttons, and other email elements from our library.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-primary text-2xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Drag & Customize</h3>
                <p className="text-muted-foreground">
                  Arrange your blocks and customize colors, fonts, spacing, and more with our visual
                  editor.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-primary text-2xl font-bold">3</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Export & Send</h3>
                <p className="text-muted-foreground">
                  Export your email as HTML or React code and use it in your favorite email
                  platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Future Features Section */}
        <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Coming Soon</h2>
              <p className="text-muted-foreground text-xl">Exciting features in development</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Layers className="text-primary h-6 w-6" />
                    <CardTitle>Advanced Layout</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary h-2 w-2 rounded-full"></div>
                    <span className="font-medium">Section Block</span>
                    <span className="text-muted-foreground text-sm">
                      — Group multiple blocks and apply custom styles to entire sections
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Grid className="text-primary h-4 w-4" />
                    <span className="font-medium">Grid Block</span>
                    <span className="text-muted-foreground text-sm">
                      — Create complex multi-column layouts with ease
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Undo2 className="text-primary h-6 w-6" />
                    <CardTitle>Undo / Redo System</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Never lose your work with comprehensive undo/redo functionality. Experiment
                    freely knowing you can always go back.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Database className="text-primary h-6 w-6" />
                    <CardTitle>Database & Authentication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Save your work to the cloud with user accounts. Sync your templates across
                    devices and collaborate with team members.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Home className="text-primary h-6 w-6" />
                    <CardTitle>Design Gallery</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    A beautiful home page showcasing all your email designs with live previews,
                    search, and organization features.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-xl">
                Everything you need to know about our email builder
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is the email builder really free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our email builder is completely free to use. You can create unlimited emails
                  and export them without any restrictions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Do I need coding knowledge to use this?</AccordionTrigger>
                <AccordionContent>
                  Not at all! Our drag-and-drop interface is designed for anyone to use, regardless
                  of technical background. However, developers will appreciate the clean code export
                  options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Will my emails work in all email clients?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use email-safe HTML and inline styles to ensure maximum compatibility
                  across all major email clients including Gmail, Outlook, Apple Mail, and Yahoo
                  Mail.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I save my email templates?</AccordionTrigger>
                <AccordionContent>
                  Currently, you can export your templates as HTML or React code. We're working on
                  cloud saving and template management features that will be available soon.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What export formats are supported?</AccordionTrigger>
                <AccordionContent>
                  You can export your emails as clean HTML code or as React components using
                  @react-email/components, making them perfect for both traditional email platforms
                  and modern development workflows.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="p-8 text-center md:p-12">
              <CardHeader>
                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                  Ready to Build Amazing Emails?
                </h2>
                <CardDescription className="mb-8 text-xl">
                  Join thousands of creators who are already building beautiful emails with our
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" asChild>
                  <Link href="/design" className="inline-flex items-center">
                    Start Building Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center space-x-3 md:mb-0">
              <PlaceholderLogo className="h-8 w-8" />
              <span className="text-xl font-bold">MailYard</span>
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
              © 2024 MailYard. Built with Next.js and shadcn/ui.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
