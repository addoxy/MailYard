# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A no-code solution for creating beautiful and accessible emails using React and modern web technologies.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Language**: TypeScript
- **UI Library**: shadcn/ui components (new-york variant)
- **Icons**: Lucide React (exclusive icon library)
- **Animations**: Framer Motion for subtle UX enhancements
- **State Management**: Jotai for global state, useState for local state
- **Email Components**: @react-email/components (foundation for all email blocks)
- **Drag & Drop**: dnd-kit for all drag-and-drop functionality
- **Email Rendering**: @react-email/render for HTML export

## Project Structure

```
src/
├── app/
│   ├── designs/
│   │   └── [id]/
│   │       ├── components/
│   │       │   ├── resource-sidebar.tsx    # Left sidebar - blocks & assets
│   │       │   ├── email-section.tsx       # Center - email canvas
│   │       │   └── inspector-sidebar.tsx   # Right sidebar - block editor
│   │       ├── hooks/                      # Feature-specific hooks
│   │       ├── page.tsx                    # Email builder main page
│   │       └── atoms.ts                    # Jotai atoms for this route
│   └── home/
│       ├── components/
│       ├── hooks/                          # Home page specific hooks
│       └── page.tsx                        # Home page with design gallery
├── components/
│   ├── ui/                                 # shadcn components
│   └── atomic-tooltip.tsx                  # Custom tooltip component
├── hooks/                                  # Global hooks shared across features
├── lib/
│   ├── providers.tsx                       # App providers (theme)
│   └── utils.ts                           # Utility functions
└── styles/
    └── globals.css                        # Global styles
```

## Key Architecture Decisions

### Responsive Design Strategy
- **Desktop**: Full email builder functionality with 3-column layout
- **Mobile**: Home page only - email builder is desktop-exclusive
- **Mobile Design Preview**: Clicking designs on mobile opens read-only preview modal
- **Responsive Breakpoint**: Hide email builder below 1024px width

### Email Block System
- **CRITICAL**: All email blocks MUST use inline styles only (no Tailwind classes or CSS classes)
- This ensures compatibility with email providers when exporting
- Use @react-email/components as the foundation for all blocks
- Supported block types: heading, text, container, divider, button, link, grid, image, video

### State Management Pattern
- **Global State**: Use Jotai atoms for cross-component state (selected blocks, email data, undo/redo history)
- **Local State**: Use useState for component-specific state (form inputs, UI toggles, search queries)
- Store atoms in `atoms.ts` files within each route directory

### Hook Organization
- **Global hooks**: `src/hooks/` - Shared across multiple features
- **Feature-specific hooks**: `[feature]/hooks/` - Specific to one feature area
- **Example**: `useEmailCanvas` belongs in `designs/[id]/hooks/`

### Layout Pattern
The main design interface uses a three-panel resizable layout:
1. **ResourceSidebar** - Left panel for blocks/assets with drag-and-drop
2. **EmailSection** - Center panel with header actions and interactive email canvas
3. **InspectorSidebar** - Right panel for styling controls and multi-select editing

## Styling Guidelines

### UI Components
- Use shadcn/ui components as the base for all UI elements
- Extend shadcn components when needed rather than creating from scratch
- Follow existing UI patterns for consistency
- **Email blocks**: inline styles only for email client compatibility
- **UI components**: Tailwind classes are acceptable

### Animation Guidelines
- **Framer Motion Usage**: Add subtle animations that enhance user experience
- **Focus Areas**:
  - Gentle hover effects on interactive elements
  - Smooth state transitions (theme switching, view modes)
  - Subtle feedback during drag-and-drop operations
  - Modal/dialog entrance/exit animations
  - Loading states and micro-interactions

### Component Standards
- **Icons**: Use Lucide React exclusively for all icons
- **Tooltips**: Use AtomicTooltip component from `atomic-tooltip.tsx`
- **Accessibility**: Ensure WCAG compliance and keyboard navigation support

## Code Quality Standards

### Senior Developer Approach
- **Clean Architecture**: Write maintainable, well-documented code
- **Component Splitting**: Break large components into smaller, focused files when they exceed ~200 lines
- **File Organization**: Create dedicated files for hooks, utils, types, and constants
- **Naming Conventions**: Use descriptive names, follow React/TypeScript best practices

### Component Splitting Strategy
```
designs/[id]/
├── components/
│   ├── email-section/
│   │   ├── email-section.tsx      # Main component
│   │   ├── block-selector.tsx     # Selection logic
│   │   ├── drag-drop-handler.tsx  # D&D implementation
│   │   └── types.ts               # Component types
├── hooks/
│   └── use-email-canvas.ts        # Feature-specific canvas logic hook
└── atoms.ts                       # Route-specific Jotai atoms
```

## Export Requirements

### React Export
- Generate clean @react-email/components code
- Maintain component structure and inline styling
- Include necessary imports

### HTML Export
```typescript
import { MyTemplate } from './email';
import { render, pretty } from '@react-email/render';

const html = await pretty(await render(<MyTemplate />));
```

## Key Features

### Keyboard Shortcuts
- **Delete**: Delete selected block(s)
- **Cmd/Ctrl + Z**: Undo last action
- **Cmd/Ctrl + Shift + Z**: Redo last action
- **Cmd/Ctrl + A**: Select all blocks
- **Cmd/Ctrl + D**: Duplicate selected block(s)
- **Escape**: Deselect all blocks
- **Arrow Keys**: Navigate between blocks
- **Cmd/Ctrl + C/V**: Copy/paste selected block(s)

### Multi-Select Support
- Bulk editing for common properties only
- Show "Mixed" for properties with different values across selected blocks
- Disable incompatible properties when selection includes different block types

### Drag & Drop Implementation
- Use dnd-kit for all drag-and-drop functionality
- Block reordering within email canvas
- Asset-to-block drops for direct configuration
- Visual drop indicators with subtle animations

## Task Management

When you're asked to work on a specific task (e.g., "do task 1"), refer to the **TASKS.md** file for detailed task breakdowns and requirements. Tasks are organized by development phases:
- **Phase 1**: Core Functionality (Tasks 1-5)
- **Phase 2**: Advanced Features (Tasks 6-10)
- **Phase 3**: Polish & Advanced Features (Tasks 11-15)
- **Phase 4**: Mobile & Final Polish (Tasks 16-20)

## Development Context

- **Scope**: Frontend only (no backend integration needed)
- **Target**: Modern browsers with email client compatibility for exports
- **Performance**: Optimize for smooth drag-and-drop interactions
- **Email Compatibility**: Preview system supports Gmail, Outlook, Apple Mail, Yahoo Mail