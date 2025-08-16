# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔄 Maintaining This File

**IMPORTANT**: This file must be updated when major changes occur to the codebase:

- **New Features**: When adding significant new functionality or components
- **Folder Structure Changes**: When reorganizing directories or moving files
- **Architecture Changes**: When modifying state management, routing, or core patterns
- **New Dependencies**: When adding new libraries or changing tech stack
- **Build/Development Changes**: When updating development commands or processes
- **Code Quality Standards**: When establishing new patterns or conventions

**When to Update**: After implementing tasks that change project structure, add new development phases, or establish new coding patterns. Always keep the project structure diagram and guidelines current with the actual codebase.

## Project Overview

A no-code solution for creating beautiful and accessible emails using React and modern web technologies.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm add [package-name]` for installing packages

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
│   ├── designs/[id]/                       # Email builder functionality
│   │   ├── components/
│   │   │   ├── email-blocks/               # Block components & registry
│   │   │   │   ├── block-registry.tsx      # Central block definitions
│   │   │   │   ├── types.ts                # Block type definitions
│   │   │   │   ├── heading-block.tsx       # Heading block component
│   │   │   │   ├── text-block.tsx          # Text block component
│   │   │   │   ├── button-block.tsx        # Button block component
│   │   │   │   ├── link-block.tsx          # Link block component
│   │   │   │   ├── divider-block.tsx       # Divider block component
│   │   │   │   └── image-block.tsx         # Image block component
│   │   │   ├── email-section/              # Canvas area components
│   │   │   │   ├── block-selector.tsx      # Block selection logic
│   │   │   │   ├── drag-drop-handler.tsx   # Drag & drop implementation
│   │   │   │   ├── sortable-email-block.tsx # Sortable block wrapper
│   │   │   │   ├── export-modal.tsx        # Export functionality
│   │   │   │   ├── preview-modal.tsx       # Email preview
│   │   │   │   └── inbox-preview.tsx       # Inbox preview modes
│   │   │   ├── inspector-sidebar/          # Property controls
│   │   │   │   ├── property-controls/      # Individual control components
│   │   │   │   │   ├── spacing-controls.tsx      # Margin/padding controls
│   │   │   │   │   ├── border-controls.tsx       # Border styling controls
│   │   │   │   │   ├── typography-controls.tsx   # Font styling controls
│   │   │   │   │   ├── color-controls.tsx        # Color picker controls
│   │   │   │   │   ├── alignment-controls.tsx    # Text alignment controls
│   │   │   │   │   ├── canvas-controls.tsx       # Canvas-wide settings
│   │   │   │   │   ├── link-controls.tsx         # Link configuration
│   │   │   │   │   ├── bulk-edit-controls.tsx    # Multi-select editing
│   │   │   │   │   └── text-controls.tsx         # Text-specific controls
│   │   │   │   ├── block-editor.tsx        # Main editor interface
│   │   │   │   └── utils/                  # Property control utilities
│   │   │   ├── resource-sidebar/           # Block library & list
│   │   │   │   ├── block-library.tsx       # Draggable block library
│   │   │   │   ├── block-list.tsx          # Block hierarchy list
│   │   │   │   └── block-list-item.tsx     # Individual list items
│   │   │   ├── email-section.tsx           # Main canvas component
│   │   │   ├── inspector-sidebar.tsx       # Right sidebar wrapper
│   │   │   ├── resource-sidebar.tsx        # Left sidebar wrapper
│   │   │   ├── email-editor.tsx            # Main editor layout
│   │   │   ├── design-page-content.tsx     # Page content wrapper
│   │   │   ├── actions.tsx                 # Header action buttons
│   │   │   ├── view-toggle.tsx             # View mode toggle
│   │   │   ├── block.tsx                   # Generic block wrapper
│   │   │   ├── export-email.tsx            # Email export utilities
│   │   │   └── preview-email.tsx           # Email preview utilities
│   │   ├── hooks/                          # Feature-specific hooks
│   │   ├── utils/                          # Email builder utilities
│   │   ├── atoms.ts                        # Jotai state atoms
│   │   └── page.tsx                        # Email builder main page
│   ├── home/                               # Design gallery
│   │   ├── components/
│   │   │   ├── design-gallery.tsx          # Main gallery layout
│   │   │   ├── design-card.tsx             # Individual design cards
│   │   │   ├── design-row.tsx              # Design row layout
│   │   │   ├── search-filter-bar.tsx       # Search & filter controls
│   │   │   ├── sidebar-navigation.tsx      # Navigation sidebar
│   │   │   ├── actions-dropdown.tsx        # Design actions menu
│   │   │   └── dialogs.tsx                 # Modal dialogs
│   │   ├── hooks/                          # Home page hooks
│   │   ├── atoms.ts                        # Home page state
│   │   └── page.tsx                        # Home page
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Root page redirect
├── components/
│   ├── ui/                                 # shadcn/ui components
│   │   ├── button.tsx, input.tsx, select.tsx, etc.
│   ├── atomic-tooltip.tsx                  # Custom tooltip component
│   ├── logo.tsx                            # Application logo
│   ├── theme-toggle.tsx                    # Theme switching
│   ├── search-bar.tsx                      # Global search component
│   └── user-menu.tsx                       # User menu component
├── hooks/                                  # Global hooks shared across features
├── lib/
│   ├── providers.tsx                       # App providers (theme, etc.)
│   └── utils.ts                           # Global utility functions
└── styles/
    └── globals.css                        # Global styles & CSS variables
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
- Supported block types: heading, text, button, link, divider, image
- **Block Default Styles**: Each block component defines its own default styles and behavior
- **Block Registry**: Central registry for block definitions, drag-and-drop metadata, and categories

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

### Code Duplication Guidelines

**CRITICAL: Address code duplication immediately when encountered:**

1. **Shared Components**: Extract duplicated components to `/src/components/`
   - Always check for existing implementations before creating new components
   - Look for repeated UI patterns across multiple files

2. **Utility Functions**: Create shared utilities in `/src/lib/` for repeated logic
   - Style manipulation and validation helpers
   - Common conversion functions (px/number, validation, etc.)

3. **Custom Hooks**: Extract repeated behavior patterns into reusable hooks
   - State management patterns and event handling logic
   - Complex component behavior that appears in multiple places

4. **Block Patterns**:
   - **Default Styles**: Let block components define their own defaults, avoid duplication in block registry
   - **Style Construction**: Use shared utilities for consistent style object creation
   - **Validation**: Centralize property validation and type checking

5. **Performance Optimization**:
   - Memoize expensive computations and component renders
   - Use callback optimization for frequently updated components
   - Implement proper dependency arrays in hooks

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

**IMPORTANT**: After completing any task, you MUST update the TASKS.md file to mark completed sub-tasks with `[x]` instead of `[ ]`. This helps track progress and ensures all requirements are met.

## Development Context

- **Scope**: Frontend only (no backend integration needed)
- **Target**: Modern browsers with email client compatibility for exports
- **Performance**: Optimize for smooth drag-and-drop interactions
- **Email Compatibility**: Preview system supports Gmail, Outlook, Apple Mail, Yahoo Mail
