/**
 * LangToggleClient — VitePress client plugin.
 *
 * Language selector is always visible in both dev and production.
 * The floating LangToggle button (dev only) can hide it via
 * `window.__toggleLangSelector()`.
 * Exposes `window.__toggleLangSelector()` for the floating LangToggle button.
 */
import type { App } from 'vue'

export default {
  enhanceApp({ app }: { app: App }) {
    // Language selector stays visible by default (dev & prod)
    document.documentElement.classList.remove('lang-toggle-hidden')

    // Global toggle API
    ;(window as unknown as Record<string, unknown>).__toggleLangSelector = () => {
      document.documentElement.classList.toggle('lang-toggle-hidden')
    }
  },
}
