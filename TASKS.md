# TASKS.md

This document outlines all development tasks needed to complete the email builder application, organized by frontend and backend components.

## Frontend Tasks

This section contains all client-side development tasks for the email builder interface, organized by development phases.

### Phase 1: Core Functionality

#### 1. Home Page Foundation

- [x] Create `src/app/home/page.tsx` - Main gallery page with responsive layout
- [x] Create `src/app/home/components/design-gallery.tsx` - Grid view for design cards
- [x] Create `src/app/home/components/sidebar-navigation.tsx` - Left sidebar with sections
- [x] Create `src/app/home/components/search-filter-bar.tsx` - Search and filter controls
- [x] Create `src/app/home/hooks/use-design-data.ts` - Mock design data management
- [x] Create `src/app/home/hooks/use-design-filters.ts` - Filter and sorting logic
- [x] Create `src/app/home/atoms.ts` - Home page state management
- [x] Implement search functionality with real-time filtering
- [x] Implement sorting filters:
  - Alphabetical order (A-Z, Z-A)
  - Last modified (newest/oldest first)
  - Date created (newest/oldest first)

**Notes**: Start with mock data for designs. Focus on responsive layout that works on both desktop and mobile. Include all filter options from requirements.

#### 2. Email Builder Basic Layout

- [x] Update `src/app/designs/[id]/page.tsx` - Implement 3-column resizable layout
- [x] Update `src/app/designs/[id]/components/resource-sidebar.tsx` - Block library foundation
- [x] Update `src/app/designs/[id]/components/email-section.tsx` - Canvas area with header actions
- [x] Update `src/app/designs/[id]/components/inspector-sidebar.tsx` - Style panel foundation
- [x] Create `src/app/designs/[id]/hooks/use-email-builder.ts` - Core builder state logic

**Notes**: Focus on layout structure first. Use placeholders for complex functionality.

#### 3. Email Block System Foundation

- [x] Create `src/app/designs/[id]/components/email-blocks/` directory
- [x] Create `src/app/designs/[id]/components/email-blocks/heading-block.tsx` - Using @react-email/components
- [x] Create `src/app/designs/[id]/components/email-blocks/text-block.tsx` - Using @react-email/components
- [x] Create `src/app/designs/[id]/components/email-blocks/container-block.tsx` - Using @react-email/components
- [x] Create `src/app/designs/[id]/components/email-blocks/types.ts` - Block type definitions
- [x] Create `src/app/designs/[id]/components/email-blocks/block-registry.ts` - Block registration system

**Notes**: CRITICAL - All blocks must use inline styles only, no Tailwind classes. Base all blocks on @react-email/components.

#### 4. Basic Block Library

- [x] Create `src/app/designs/[id]/components/resource-sidebar/block-library.tsx`
- [x] Implement click-to-add functionality for blocks (adds to bottom of email)
- [x] Create block icons using Lucide React
- [x] Add AtomicTooltip for block descriptions

**Notes**: Start with 3 basic blocks: heading, text, container. More blocks will be added in Phase 2.

#### 5. Basic Block Selection

- [x] Create `src/app/designs/[id]/hooks/use-block-selection.ts` - Single block selection
- [x] Create `src/app/designs/[id]/components/email-section/block-selector.tsx` - Visual selection indicators
- [x] Update email canvas to show selected block with borders/highlighting
- [x] Create `src/app/designs/[id]/atoms.ts` - Add selectedBlockId atom
- [x] Make the selected block editable

**Notes**: Focus on single block selection first. Multi-select comes in Phase 2.

### Phase 2: Interactive Editing

#### 6. Block Editing System

- [x] Create `src/app/designs/[id]/components/inspector-sidebar/block-editor.tsx` - Main block editing interface
- [x] Create `src/app/designs/[id]/components/inspector-sidebar/property-controls/` directory
- [x] Create basic property controls: text content, font size, color, alignment
- [x] Connect inspector sidebar to selected block state from atoms
- [x] Implement real-time block property updates
- [x] Add validation and error handling for property inputs
- [x] Create block type-specific property panels (heading vs text vs container)

**Notes**: Focus on core text properties first. Advanced styling comes in Phase 3. Ensure changes update the email canvas in real-time.

#### 7. Multi-Select and Bulk Editing

- [x] Update `use-block-selection.ts` - Support multi-select with Ctrl/Cmd + click
- [x] Create `src/app/designs/[id]/hooks/use-bulk-editing.ts` - Bulk property editing logic
- [x] Update inspector sidebar to handle multi-select state
- [x] Implement "Mixed" state display for different property values

**Notes**: Show "Mixed" when selected blocks have different values for the same property. Build on the block editing system from Task 6.

#### 8. Keyboard Shortcuts

- [x] Create `src/hooks/use-keyboard-shortcuts.ts` - Global keyboard shortcut manager
- [x] Create `src/app/designs/[id]/hooks/use-email-shortcuts.ts` - Email builder specific shortcuts
- [x] Implement shortcuts: Delete, Select All, Duplicate, Copy/Paste, Arrow navigation

**Notes**: Use global hook for app-wide shortcuts, feature-specific hook for email builder shortcuts. Undo/Redo moved to separate task.

#### 9. Drag & Drop System

- [x] Install and configure dnd-kit
- [x] Create `src/app/designs/[id]/hooks/use-drag-drop.ts` - Drag and drop logic
- [x] Create `src/app/designs/[id]/components/email-section/drag-drop-handler.tsx` - D&D component
- [x] Implement block reordering within email canvas

**Notes**: Use dnd-kit for all drag-and-drop. Add subtle animations for better UX.

#### 10. Complete Block Library

- [x] Create the image block
- [x] Make the image block support rendering the image from a provided link.
- [x] Update block registry with all block types
- [x] Add drag-from-library functionality (drag block to specific position)
- [x] Implement block categories/grouping in resource sidebar

**Notes**: Each block must use @react-email/components as foundation with inline styles only.

#### 11. Block List and Reordering System

- [x] Remove the assets section from the resource sidebar
- [x] Create `src/app/designs/[id]/components/resource-sidebar/block-list.tsx` - Show list of blocks in email canvas
- [x] Create `src/app/designs/[id]/components/resource-sidebar/block-list-item.tsx` - Individual block list item component
- [x] Implement drag-and-drop reordering functionality for the block list using dnd-kit
- [x] Add visual indicators for drag operations (highlighting, insertion points)
- [x] Ensure block list updates reflect in real-time on the email canvas
- [x] Add block selection from the list (clicking a list item selects the block in canvas)
- [x] Display block names/types clearly with appropriate icons

**Notes**: This replaces the asset management with a more useful block outline/layers panel. Focus on smooth drag-and-drop reordering that syncs with the canvas. Use the existing drag-drop infrastructure.

### Phase 3: Export & Preview Systems

#### 12. Advanced Style Inspector Panel

- [x] Update `src/app/designs/[id]/components/inspector-sidebar/style-controls/` directory
- [x] Update advanced typography controls: letter spacing
- [x] Ensure all default styles are uniform and sensible across all blocks
- [x] Convert all distance-related styles to use px units only (inputs should be numbers, not strings like "20px")

**Notes**: This updates the existing property controls from Task 6. All distance inputs should be numeric only, internally converted to px.

#### 13. Fix Default Font Weight Bug

- [x] Fix heading blocks to show proper default font weight (should be bold/600 for headings)
- [x] Fix text blocks to show proper default font weight (should be normal/400 for text)
- [x] Ensure font weight property controls display the correct current values
- [x] Update block type definitions to include proper default font weights
- [x] Increase white spacing in the inspector sidebar for better readability and visual breathing room

**Notes**: Currently heading and text blocks are not showing any default font weight. This makes headings appear the same as regular text, which is incorrect. Also improve the visual spacing in the inspector sidebar.

#### 14. Fix Canvas Font Family Inheritance Bug

- [x] Fix the page-level font family selector to actually apply font-family changes to the canvas
- [x] Implement font-family inheritance system where blocks inherit the canvas font-family by default
- [x] Only override inherited font-family when a block has its own font-family explicitly set
- [x] Ensure the canvas font-family updates are reflected in real-time across all blocks
- [x] Test that individual block font-family overrides still work correctly

**Notes**: Currently the font family selector in the page doesn't change the font-family of blocks. Blocks should inherit the canvas font-family unless they have their own font-family specified.

#### 15. Preview System

- [x] Create `src/app/designs/[id]/components/email-section/preview-modal.tsx`
- [x] Implement email client preview tabs: Gmail, Outlook, Apple Mail, Yahoo
- [x] Add desktop/mobile preview toggle within modal
- [x] Use @react-email/render for generating preview HTML

**Notes**: Modal should show how email renders across different providers.

#### 16. Export Functionality

- [x] Create `src/app/designs/[id]/components/email-section/export-modal.tsx`
- [x] Implement React export: clean @react-email/components code generation
- [x] Implement HTML export using @react-email/render with pretty() function
- [x] Add copy-to-clipboard functionality for both exports

**Notes**: Ensure exported code maintains inline styling for email compatibility.

### Phase 4: Styling & UX Enhancement

#### 17. Bug Fixes and Refinements

- [x] Update Container padding controls to have separate x and y padding fields instead of single field
- [x] Convert max-width input to number input (px values only)
- [x] Add more max-width select options and order from smallest to largest
- [x] Remove heading level control from heading blocks
- [x] Fix number inputs in inspector sidebar to allow clearing values without auto-assigning defaults
- [x] Fix button margin display to show outside selected box (like other elements)
- [x] Fix top margin effect threshold (currently only works after 16px)
- [x] Prevent button and link elements from opening new pages when clicked
- [x] Change "text alignment" to "alignment" for button and image blocks (aligning whole element, not just text)

**Notes**: These are critical UX improvements and bug fixes identified during testing. Focus on making controls more intuitive and consistent across all block types.

#### 18. Block Editing and Styling Enhancements

- [x] Make button and link text editable directly in the block (remove link URL editing from block). It should look like I am editing the block itself and not some other input.
- [x] Fix margins and padding not working properly for the link block
- [x] Audit and fix link block properties - many properties don't seem to be working correctly
- [x] Add text decoration controls (underline, strikethrough, none) to heading, text, button, and link blocks
- [x] Add background color support to heading, text, and link blocks
- [x] Add border controls (width, color, style) to heading, text, and link blocks
- [x] Add border radius controls to heading, text, and link blocks
- [x] Update bulk editing to only allow numeric values for distance-based inputs and default to "px" units
- [x] Ensure all block styling is consistent with inline styles for email compatibility

**Notes**: This task focuses on improving the editing experience and adding missing styling options across all text-based blocks. Pay special attention to the link block which seems to have several property issues. All new styling controls must use inline styles only for email client compatibility.

### Phase 5: Code Optimization & Technical Debt

#### 19. Extract Shared Components

- [x] **CRITICAL**: Extract `ClearableNumberInput` component to `/src/components/clearable-number-input.tsx`
  - [x] Remove duplicate implementations from `spacing-controls.tsx`, `border-controls.tsx`, and `typography-controls.tsx`
  - [x] Update all three files to import the shared component
  - [x] Ensure consistent API and behavior across all usages
  - [x] Test that all number inputs still work correctly after extraction

**Impact**: Eliminates 246 lines of duplicated code across 3 files

#### 20. Create Shared Style Utilities

- [ ] Create `/src/lib/style-utils.ts` with shared utility functions:
  - [ ] `pxToNumber(value: string): number` - Convert "20px" to 20
  - [ ] `numberToPx(value: number): string` - Convert 20 to "20px"
  - [ ] `validateStyleValue(value: any, type: 'px' | 'color' | 'string'): boolean`
  - [ ] `createBaseStyle(props: StyleProps): CSSProperties` - Shared style object construction
- [ ] Update `spacing-controls.tsx`, `border-controls.tsx`, and `typography-controls.tsx` to use shared utilities
- [ ] Remove duplicate conversion functions from all property control files

**Impact**: Eliminates utility function duplication and standardizes style handling

#### 21. Extract Inline Editing Hook

- [ ] Create `/src/hooks/use-inline-editing.ts` hook with shared editing behavior:
  - [ ] `handleDoubleClick` - Enter editing mode on double-click
  - [ ] `handleSave` - Save changes and exit editing
  - [ ] `handleCancel` - Cancel changes and exit editing
  - [ ] `handleKeyDown` - Handle Enter (save) and Escape (cancel) keys
  - [ ] State management for `isEditing`, `editContent`, auto-focus logic
- [ ] Update all block components (`heading-block.tsx`, `text-block.tsx`, `button-block.tsx`, `link-block.tsx`) to use the shared hook
- [ ] Remove duplicate editing logic from individual block files
- [ ] Ensure consistent editing behavior across all text-based blocks

**Impact**: Eliminates repeated editing patterns and ensures consistent UX

#### 22. Optimize Block Default Styles System

- [ ] **Remove redundant default styles from block registry**:
  - [ ] Let each block component define its own default styles internally
  - [ ] Simplify block registry to only contain metadata (name, icon, description, category)
  - [ ] Remove verbose `defaultProps` objects from `block-registry.tsx`
- [ ] **Update block components** to define their own defaults:
  - [ ] Add `getDefaultProps()` static method or default prop values to each block
  - [ ] Ensure consistent default patterns across all blocks
  - [ ] Reduce type casting with better TypeScript interfaces
- [ ] **Create shared default style patterns**:
  - [ ] `createBlockDefaults(overrides: Partial<BlockProps>): BlockProps` utility
  - [ ] Consistent spacing, typography, and color defaults across blocks
  - [ ] Standardize property naming and units (px vs numbers)

**Impact**: Reduces redundancy in block system and improves maintainability

#### 23. Typography Controls Enhancement

- [ ] Move text decoration controls from link-specific controls to Typography Controls component
- [ ] Ensure text decoration controls (underline, strikethrough, none) are available for all text-based blocks: heading, text, button, and link
- [ ] Create reusable text decoration control component within `typography-controls.tsx`
- [ ] Remove text decoration logic from link-specific property controls
- [ ] Test that text decoration works consistently across all block types
- [ ] Ensure text decoration changes are reflected in real-time in the email canvas
- [ ] Maintain inline style compatibility for email client support

**Notes**: Text decorations should be part of the general typography system, not specific to links. This makes the styling system more consistent and allows all text-based blocks to have text decoration options.

### Phase 6: Advanced Layout Systems

#### 24. Container Block System

- [ ] Create `src/app/designs/[id]/components/email-blocks/container-block.tsx` - Advanced container component
- [ ] Implement container that can hold and group other email blocks
- [ ] Support nested drag-and-drop: blocks can be dragged into and out of containers
- [ ] Add container-specific styling: background colors, borders, padding, margins
- [ ] Implement visual indicators when hovering over containers during drag operations
- [ ] Add container management: expand/collapse, show/hide children in block list
- [ ] Support container nesting: containers can contain other containers
- [ ] Add container templates: common layouts like header, footer, sidebar sections
- [ ] Implement container-specific inspector controls for layout and styling
- [ ] Ensure email client compatibility with proper HTML structure
- [ ] **Update BlockList component** - Show block hierarchy for nested blocks (containers with children)
- [ ] **Update BlockListItem component** - Add indentation and expand/collapse functionality for container children
- [ ] **Implement tree structure** - Display nested blocks with proper indentation levels
- [ ] **Add hierarchy navigation** - Allow expanding/collapsing container blocks to show/hide children
- [ ] **Update drag-and-drop** - Support dragging blocks into/out of containers within the block list
- [ ] **Visual hierarchy indicators** - Use connecting lines, indentation, or folder-like icons for nested structure

**Notes**: This is a complex layout system that enables advanced email structures. Focus on intuitive drag-and-drop behavior and clear visual feedback. Use @react-email/components Container as the foundation. The block hierarchy functionality from Task 11 will be implemented here once containers are available.

#### 25. Grid Block System

- [ ] Create `src/app/designs/[id]/components/email-blocks/grid-block.tsx` - Advanced grid layout component
- [ ] Implement grid system using Row and Column from @react-email/components
- [ ] Support adjustable grid sizes (1x1 to 6x6) with dynamic row/column configuration
- [ ] Enable drag-and-drop of blocks into specific grid cells
- [ ] Add separate horizontal (columnGap) and vertical (rowGap) spacing controls
- [ ] Create responsive grid system that works across email clients
- [ ] Add grid cell management: add, remove functionality
- [ ] Implement grid templates (2x2, 3x1, 1x3, etc.) for quick layouts
- [ ] Add visual grid guidelines and cell highlighting during editing

**Notes**: This is an advanced layout system that requires careful implementation for email client compatibility. Focus on using @react-email/components Row and Column as the foundation. Test thoroughly across Gmail, Outlook, Apple Mail, and Yahoo.

### Phase 7: Mobile & Final Polish

#### 26. Mobile Home Page

- [ ] Create responsive home page that works on mobile
- [ ] Convert sidebar navigation to mobile-friendly format
- [ ] Implement mobile design preview modal (read-only)
- [ ] Add "Open on Desktop" messaging for email builder

**Notes**: Mobile users should see designs but be directed to desktop for editing.

#### 27. Animation Polish

- [ ] Implement subtle hover effects on interactive elements
- [ ] Add smooth state transitions (theme, view modes, selections)
- [ ] Add loading states and micro-interactions

**Notes**: Keep animations subtle and performance-focused. Enhance UX without being distracting.

#### 28. Final Polish and Testing

- [ ] Implement complete keyboard navigation support
- [ ] Ensure WCAG accessibility compliance
- [ ] Add error boundaries and proper error handling
- [ ] Performance optimization: lazy loading, code splitting
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Email client compatibility testing for exports

**Notes**: Focus on accessibility, performance, and reliability. Test thoroughly across different environments.

### Phase 8: Future Features

#### 29. Undo/Redo System

- [ ] Implement robust undo/redo history stack system
- [ ] Add undo/redo buttons to Actions component with proper disabled states
- [ ] Implement keyboard shortcuts: Cmd/Ctrl + Z (undo), Cmd/Ctrl + Shift + Z (redo)
- [ ] Save history for all operations: block add/remove/edit/move/duplicate, bulk editing
- [ ] Handle debouncing for rapid text edits to avoid saving every keystroke
- [ ] Ensure history captures intermediate states correctly (e.g., text changes should undo to previous text, not delete block)
- [ ] Limit history stack to reasonable size (50 entries) with proper cleanup
- [ ] Test undo/redo works correctly for all block operations and property changes

**Notes**: This is a complex feature that requires careful state management. Focus on getting core functionality working first before implementing this advanced feature.

#### 30. Subtle Framer Motion Animations

- [ ] Add framer-motion back to dependencies: `pnpm add framer-motion`
- [ ] Implement very subtle hover effects on interactive elements (buttons, block cards, etc.)
- [ ] Add smooth state transitions for theme switching and view mode changes
- [ ] Polish drag-and-drop with gentle feedback animations (scale, opacity changes)
- [ ] Add subtle modal/dialog entrance and exit animations
- [ ] Implement smooth loading states and micro-interactions
- [ ] Add gentle layout animations for block reordering and selection changes

**Notes**: Focus on performance and subtlety. Animations should enhance UX without being distracting or impacting performance. Use transform and opacity changes primarily, avoid animating layout properties when possible.

#### 31. Fix Export Code Formatting

- [ ] Fix CodeBlock component to properly format exported React TSX and HTML code
- [ ] Investigate why Shiki syntax highlighting is not applying proper formatting
- [ ] Ensure code appears with proper indentation and line breaks in export modal
- [ ] Test both React component export and HTML export formatting
- [ ] Consider alternative formatting solutions if CodeBlock component continues to have issues

**Notes**: Currently the exported code in the export modal is not being formatted properly, appearing as unformatted strings. The CodeBlock component should handle syntax highlighting and formatting automatically.

---

## Backend Tasks

This section contains all server-side development tasks for the email builder application. Currently, the application is frontend-only with no backend integration planned.
