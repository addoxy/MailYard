'use client';

import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  condition?: () => boolean;
}

export interface UseKeyboardShortcutsOptions {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
  target?: HTMLElement | Window | null;
}

export function useKeyboardShortcuts({
  shortcuts,
  enabled = true,
  target,
}: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Skip if user is typing in an input, textarea, or contenteditable element
      const activeElement = document.activeElement;
      if (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.getAttribute('contenteditable') === 'true' ||
        activeElement?.getAttribute('role') === 'textbox'
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        // Check if condition is met (if provided)
        if (shortcut.condition && !shortcut.condition()) {
          continue;
        }

        // Check key match
        if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) {
          continue;
        }

        // Check modifier keys
        const ctrlKeyMatch = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey;
        const metaKeyMatch = shortcut.metaKey ? event.metaKey : !event.metaKey;
        const shiftKeyMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        const altKeyMatch = shortcut.altKey ? event.altKey : !event.altKey;

        // Handle cross-platform Cmd/Ctrl
        const platformModifierMatch = shortcut.ctrlKey || shortcut.metaKey
          ? (event.ctrlKey || event.metaKey)
          : (!event.ctrlKey && !event.metaKey);

        if (
          (shortcut.ctrlKey || shortcut.metaKey ? platformModifierMatch : ctrlKeyMatch && metaKeyMatch) &&
          shiftKeyMatch &&
          altKeyMatch
        ) {
          if (shortcut.preventDefault !== false) {
            event.preventDefault();
          }
          if (shortcut.stopPropagation) {
            event.stopPropagation();
          }
          
          shortcut.handler(event);
          break; // Only execute the first matching shortcut
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    const targetElement = target || window;
    
    targetElement.addEventListener('keydown', handleKeyDown as EventListener);
    
    return () => {
      targetElement.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [handleKeyDown, enabled, target]);
}

// Utility function to check if we're on macOS
export const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

// Utility function to get the correct modifier key symbol
export const getModifierSymbol = () => isMac ? '⌘' : 'Ctrl';

// Utility function to create cross-platform shortcuts
export const createShortcut = (
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: Partial<Omit<KeyboardShortcut, 'key' | 'handler'>> = {}
): KeyboardShortcut => ({
  key,
  handler,
  ctrlKey: !isMac,
  metaKey: isMac,
  preventDefault: true,
  ...options,
});