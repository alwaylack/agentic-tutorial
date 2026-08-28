/**
 * LangToggleClient — VitePress client plugin.
 *
 * Production (NODE_ENV=production): hides the language selector by default.
 * Development (NODE_ENV=development): shows it by default so the locale switcher
 * is visible while previewing locally.
 *
 * Exposes `window.__toggleLangSelector()` for the floating LangToggle button.
 */
import type { App } from 'vue'

export default {
  enhanceApp({ app }: { app: App }) {
    // Set default state: hidden in prod, shown in dev
    const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV !== false
    document.documentElement.classList.toggle('lang-toggle-hidden', !isDev)

    // Global toggle API
    ;(window as unknown as Record<string, unknown>).__toggleLangSelector = () => {
      document.documentElement.classList.toggle('lang-toggle-hidden')
    }
  },
}
