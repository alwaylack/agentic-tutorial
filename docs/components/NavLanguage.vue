<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vitepress'

const route = useRoute()
const router = useRouter()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

// 英文站点当前只有落地页；其余路径一律回落到英文首页
const enPages = ['/en/', '/en', '/en/about.html', '/en/about']

function current(): 'zh' | 'en' {
  return route.path.startsWith('/en') ? 'en' : 'zh'
}

function switchTo(lang: 'zh' | 'en') {
  open.value = false
  localStorage.setItem('vp-lang', lang)
  const path = route.path
  if (lang === 'en') {
    const normalized = path.replace(/\/$/, '').replace(/\.html$/, '')
    const known = enPages.includes(normalized) || enPages.includes(normalized + '/')
    router.go(known ? path : '/en/')
  } else {
    router.go(path.replace(/^\/en/, '').replace(/\.html$/, '') || '/')
  }
}

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="root" class="lang-switch">
    <button class="lang-btn" :aria-expanded="open" aria-label="切换语言 / Switch language" @click="open = !open">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
      <span class="lang-label">{{ current() === 'zh' ? '简体中文' : 'EN' }}</span>
      <span class="caret" :class="{ up: open }">▾</span>
    </button>
    <Transition name="lang-fade">
      <ul v-if="open" class="lang-menu">
        <li>
          <button :class="{ active: current() === 'zh' }" @click="switchTo('zh')">简体中文</button>
        </li>
        <li>
          <button :class="{ active: current() === 'en' }" @click="switchTo('en')">English</button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.lang-switch {
  position: relative;
  display: inline-flex;
  margin-left: 8px;
}
.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: 1px solid var(--gh-border);
  border-radius: 6px;
  padding: 0.22rem 0.55rem;
  font-size: 0.82em;
  font-weight: 600;
  color: var(--gh-muted);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  font-family: inherit;
}
.lang-btn:hover {
  color: var(--gh-accent);
  border-color: var(--gh-accent);
  background: var(--gh-canvas-subtle);
}
.caret {
  font-size: 0.7em;
  transition: transform 0.15s;
}
.caret.up {
  transform: rotate(180deg);
}
.lang-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 130px;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: var(--gh-canvas);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 60;
}
.lang-menu button {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-radius: 5px;
  padding: 0.35rem 0.6rem;
  font-size: 0.85em;
  color: var(--gh-fg);
  cursor: pointer;
  font-family: inherit;
}
.lang-menu button:hover {
  background: var(--gh-canvas-subtle);
}
.lang-menu button.active {
  color: var(--gh-accent);
  font-weight: 700;
  background: var(--vp-c-brand-soft);
}
.lang-fade-enter-active,
.lang-fade-leave-active {
  transition: opacity 0.12s, transform 0.12s;
}
.lang-fade-enter-from,
.lang-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
