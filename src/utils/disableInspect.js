/**
 * Stark HUD Protocol - Anti-Inspect & DevTools Protection Module
 * Disables Right-Click Context Menu, F12, Ctrl+Shift+I/J/C/K, Ctrl+U, Cmd+Option+I/J/C, Image Dragging, and DevTools inspection.
 */
export function initInspectProtection() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click Context Menu
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Disable Key Combinations for DevTools & View Source
  window.addEventListener('keydown', (e) => {
    const key = e.key ? e.key.toLowerCase() : '';
    const code = e.keyCode || e.which;

    // F12 key
    if (code === 123 || key === 'f12') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl + Shift + I / J / C / K (Inspect / Console / Selector)
    if (
      e.ctrlKey &&
      e.shiftKey &&
      (key === 'i' || key === 'j' || key === 'c' || key === 'k')
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Mac Cmd + Option + I / J / C / K
    if (
      e.metaKey &&
      e.altKey &&
      (key === 'i' || key === 'j' || key === 'c' || key === 'k')
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl + U or Cmd + Alt + U (View Source)
    if ((e.ctrlKey || (e.metaKey && e.altKey)) && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl + S or Cmd + S (Save Webpage)
    if ((e.ctrlKey || e.metaKey) && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Disable Image Dragging
  window.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 4. Console Clearing & Anti-Debugging Trap
  setInterval(() => {
    console.clear();
    const startTime = performance.now();
    // Debugger trap pauses execution if DevTools is open
    (function () {
      return false;
    })['constructor']('debugger')();
    const endTime = performance.now();
    if (endTime - startTime > 100) {
      console.clear();
    }
  }, 800);
}
