<!--
  LangToggle — floating language switcher toggle button.
  Only renders in dev mode; hidden in production builds.
-->
<template>
  <button
    v-if="isDev"
    class="lang-toggle-btn"
    title="语言切换开关（开发模式）"
    @click="toggle"
  >
    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM1.5 8h13v1h-13zM8 1.5l-1.5 3h3L8 1.5z"/>
    </svg>
    <span class="label">{{ visible ? '隐藏' : '显示' }}语言切换</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV !== false

// Sync with the plugin's initial state
const visible = !document.documentElement.classList.contains('lang-toggle-hidden')

function toggle() {
  document.documentElement.classList.toggle('lang-toggle-hidden')
  visible.value = !visible.value
}

// Re-sync when switching tabs back (class may have been toggled externally)
onMounted(() => {
  const observer = new MutationObserver(() => {
    visible.value = !document.documentElement.classList.contains('lang-toggle-hidden')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
</script>

<style scoped>
.lang-toggle-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--gh-border, #d1d9e0);
  border-radius: 8px;
  background: var(--gh-canvas-subtle, #f6f8fa);
  color: var(--gh-fg, #1f2328);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.15s ease;
  line-height: 1.4;
}

.lang-toggle-btn:hover {
  background: var(--gh-canvas, #ffffff);
  border-color: var(--gh-accent, #0969da);
  color: var(--gh-accent, #0969da);
  box-shadow: 0 2px 6px rgba(9, 105, 218, 0.15);
}

.lang-toggle-btn .icon {
  opacity: 0.7;
}

.lang-toggle-btn:hover .icon {
  opacity: 1;
}
</style>
