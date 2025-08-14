# TASKS.md

This document outlines all frontend development tasks needed to complete the email builder application, organized by development phases.

## Phase 1: Core Functionality

### 1. Home Page Foundation

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

### 2. Email Builder Basic Layout

- [x] Update `src/app/designs/[id]/page.tsx` - Implement 3-column resizable layout
- [x] Update `src/app/designs/[id]/components/resource-sidebar.tsx` - Block library foundation
- [x] Update `src/app/designs/[id]/components/email-section.tsx` - Canvas area with header actions
- [x] Update `src/app/designs/[id]/components/inspector-sidebar.tsx` - Style panel foundation
- [x] Create `src/app/designs/[id]/hooks/use-email-builder.ts` - Core builder state logic

**Notes**: Focus on layout structure first. Use placeholders for complex functionality.

### 3. Email Block System Foundation

- [x] Create `src/app/designs/[id]/components/email-blocks/` directory
- [x] Create `src/app/designs/[id]/components/email-blocks/heading-block.tsx` - Using @react-email/components
- [x] Create `src/app/designs/[id]/components/email-blocks/text-block.tsx` - Using @react-email/components
- [x] Create `src/app/designs/[id]/components/email-blocks/container-block.tsx` - Using @react-email/components
- [x] Create `src/app/designs/[id]/components/email-blocks/types.ts` - Block type definitions
- [x] Create `src/app/designs/[id]/components/email-blocks/block-registry.ts` - Block registration system

**Notes**: CRITICAL - All blocks must use inline styles only, no Tailwind classes. Base all blocks on @react-email/components.

### 4. Basic Block Library

- [x] Create `src/app/designs/[id]/components/resource-sidebar/block-library.tsx`
- [x] Implement click-to-add functionality for blocks (adds to bottom of email)
- [x] Create block icons using Lucide React
- [x] Add AtomicTooltip for block descriptions

**Notes**: Start with 3 basic blocks: heading, text, container. More blocks will be added in Phase 2.

### 5. Basic Block Selection

- [x] Create `src/app/designs/[id]/hooks/use-block-selection.ts` - Single block selection
- [x] Create `src/app/designs/[id]/components/email-section/block-selector.tsx` - Visual selection indicators
- [x] Update email canvas to show selected block with borders/highlighting
- [x] Create `src/app/designs/[id]/atoms.ts` - Add selectedBlockId atom
- [x] Make the selected block editable

**Notes**: Focus on single block selection first. Multi-select comes in Phase 2.

## Phase 2: Advanced Features

### 6. Block Editing System

- [x] Create `src/app/designs/[id]/components/inspector-sidebar/block-editor.tsx` - Main block editing interface
- [x] Create `src/app/designs/[id]/components/inspector-sidebar/property-controls/` directory
- [x] Create basic property controls: text content, font size, color, alignment
- [x] Connect inspector sidebar to selected block state from atoms
- [x] Implement real-time block property updates
- [x] Add validation and error handling for property inputs
- [x] Create block type-specific property panels (heading vs text vs container)

**Notes**: Focus on core text properties first. Advanced styling comes in Phase 3. Ensure changes update the email canvas in real-time.

### 7. Multi-Select and Bulk Editing

- [ ] Update `use-block-selection.ts` - Support multi-select with Ctrl/Cmd + click
- [ ] Create `src/app/designs/[id]/hooks/use-bulk-editing.ts` - Bulk property editing logic
- [ ] Update inspector sidebar to handle multi-select state
- [ ] Implement "Mixed" state display for different property values

**Notes**: Show "Mixed" when selected blocks have different values for the same property. Build on the block editing system from Task 6.

### 8. Keyboard Shortcuts

- [ ] Create `src/hooks/use-keyboard-shortcuts.ts` - Global keyboard shortcut manager
- [ ] Create `src/app/designs/[id]/hooks/use-email-shortcuts.ts` - Email builder specific shortcuts
- [ ] Implement all shortcuts: Delete, Undo/Redo, Select All, Duplicate, Copy/Paste, Arrow navigation
- [ ] Add undo/redo system with history stack in atoms

**Notes**: Use global hook for app-wide shortcuts, feature-specific hook for email builder shortcuts.

### 9. Drag & Drop System

- [ ] Install and configure dnd-kit
- [ ] Create `src/app/designs/[id]/hooks/use-drag-drop.ts` - Drag and drop logic
- [ ] Create `src/app/designs/[id]/components/email-section/drag-drop-handler.tsx` - D&D component
- [ ] Implement block reordering within email canvas
- [ ] Add visual drop indicators with Framer Motion animations

**Notes**: Use dnd-kit for all drag-and-drop. Add subtle animations for better UX.

### 10. Complete Block Library

- [ ] Create remaining email blocks: divider, button, link, grid, image, video
- [ ] Update block registry with all block types
- [ ] Add drag-from-library functionality (drag block to specific position)
- [ ] Implement block categories/grouping in resource sidebar

**Notes**: Each block must use @react-email/components as foundation with inline styles only.

### 11. Asset Integration

- [ ] Create `src/app/designs/[id]/components/resource-sidebar/asset-library.tsx`
- [ ] Implement URL-based asset management (images, GIFs, videos)
- [ ] Add drag-asset-to-block functionality for automatic configuration
- [ ] Create asset preview and management UI

**Notes**: No file upload needed initially, just URL-based assets.

## Phase 3: Polish & Advanced Features

### 12. Advanced Style Inspector Panel

- [ ] Create `src/app/designs/[id]/components/inspector-sidebar/style-controls/` directory
- [ ] Create advanced typography controls: font family, line height, weight, letter spacing
- [ ] Create layout controls: width, height, padding, margin (individual sides + shorthand)
- [ ] Create border controls: width, color, style, radius (per side + all)
- [ ] Create background controls: color, image URL
- [ ] Implement real-time preview updates with debounced input

**Notes**: This builds on the basic property controls from Task 6. Use collapsible sections with Lucide icons. Add AtomicTooltip for style explanations.

### 13. Preview System

- [ ] Create `src/app/designs/[id]/components/email-section/preview-modal.tsx`
- [ ] Implement email client preview tabs: Gmail, Outlook, Apple Mail, Yahoo
- [ ] Add desktop/mobile preview toggle within modal
- [ ] Use @react-email/render for generating preview HTML

**Notes**: Modal should show how email renders across different providers.

### 14. Export Functionality

- [ ] Create `src/app/designs/[id]/components/email-section/export-modal.tsx`
- [ ] Implement React export: clean @react-email/components code generation
- [ ] Implement HTML export using @react-email/render with pretty() function
- [ ] Add copy-to-clipboard functionality for both exports

**Notes**: Ensure exported code maintains inline styling for email compatibility.

### 15. Device View Toggle

- [ ] Update email canvas to support desktop/mobile preview modes
- [ ] Implement smooth transitions between view modes using Framer Motion
- [ ] Add device frame for mobile preview (phone-like container)
- [ ] Update atoms to persist device view preference

**Notes**: Mobile preview should show email in phone-like rounded container with proper scaling.

### 16. Theme System

- [ ] Update theme toggle to work with email builder
- [ ] Ensure proper contrast and accessibility in both light/dark modes
- [ ] Add smooth theme transition animations
- [ ] Test all components in both themes

**Notes**: Use next-themes for theme management, add smooth transitions.

## Phase 4: Mobile & Final Polish

### 17. Mobile Home Page

- [ ] Create responsive home page that works on mobile
- [ ] Convert sidebar navigation to mobile-friendly format
- [ ] Implement mobile design preview modal (read-only)
- [ ] Add "Open on Desktop" messaging for email builder

**Notes**: Mobile users should see designs but be directed to desktop for editing.

### 18. List View for Home Page

- [ ] Create `src/app/home/components/design-list-view.tsx` - Three-column table layout
- [ ] Implement view toggle between grid and list views
- [ ] Add sorting functionality: alphabetical, modified date, created date
- [ ] Implement search functionality with real-time filtering

**Notes**: List view should show: thumbnail + name, last modified, created date.

### 19. Search and Filtering Enhancement

- [ ] Enhance `src/app/home/hooks/use-design-search.ts` - Advanced search and filter logic
- [ ] Implement design organization: projects, grouping, hierarchy
- [ ] Add "Recent", "Templates", "Trash" sections with proper filtering
- [ ] Create project management functionality for grouping designs

**Notes**: Use debounced search with real-time results.

### 20. Animation Polish

- [ ] Add Framer Motion animations throughout the app
- [ ] Implement subtle hover effects on interactive elements
- [ ] Add smooth state transitions (theme, view modes, selections)
- [ ] Polish drag-and-drop with visual feedback animations
- [ ] Add loading states and micro-interactions

**Notes**: Keep animations subtle and performance-focused. Enhance UX without being distracting.

### 21. Final Polish and Testing

- [ ] Implement complete keyboard navigation support
- [ ] Ensure WCAG accessibility compliance
- [ ] Add error boundaries and proper error handling
- [ ] Performance optimization: lazy loading, code splitting
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Email client compatibility testing for exports

**Notes**: Focus on accessibility, performance, and reliability. Test thoroughly across different environments.

## Development Notes

### Dependencies to Install

```bash
npm install framer-motion dnd-kit @react-email/components @react-email/render
```

### File Structure to Create

```
src/
├── hooks/                          # Global hooks
├── app/
│   ├── home/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── atoms.ts
│   └── designs/[id]/
│       ├── components/
│       │   ├── email-blocks/
│       │   ├── resource-sidebar/
│       │   ├── email-section/
│       │   └── inspector-sidebar/
│       └── hooks/
```

### Key Technical Considerations

1. **Email Block Inline Styles**: Every email block component MUST use inline styles only for email client compatibility
2. **State Management**: Use Jotai atoms for global state, useState for component-local state
3. **Hook Organization**: Global hooks in `src/hooks/`, feature-specific hooks in `[feature]/hooks/`
4. **Component Splitting**: Break large components (>200 lines) into smaller, focused files
5. **Accessibility**: Implement proper ARIA labels, keyboard navigation, and WCAG compliance
6. **Performance**: Use React.memo, useMemo, useCallback where appropriate for smooth drag-and-drop
7. **Animation**: Use Framer Motion for subtle, performant animations that enhance UX

### Testing Strategy

- Test drag-and-drop functionality across different browsers
- Verify email exports render correctly in Gmail, Outlook, Apple Mail, Yahoo
- Test responsive design across mobile and desktop viewports
- Validate keyboard shortcuts work correctly and don't conflict with browser shortcuts
- Ensure accessibility features work with screen readers and keyboard navigation
