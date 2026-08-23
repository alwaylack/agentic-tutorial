<template>
  <a
    class="nav-gh"
    href="https://github.com/alwaylack/agentic-tutorial"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub 仓库 Star 数量"
  >
    <svg class="gh-icon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.66-.21-2.17.81a7.528 7.528 0 0 0-4 0c-1.51-1.03-2.17-.81-2.17-.81-.44 1.1-.16 1.92-.08 2.12-.52.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
    </svg>
    <span class="gh-count">{{ display }}</span>
  </a>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const REPO = 'alwaylack/agentic-tutorial'
const display = ref('')

onMounted(async () => {
  // 会话内缓存，避免每次刷新都请求 API
  const cached = sessionStorage.getItem('gh-stars')
  if (cached) { display.value = cached; return }
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) throw new Error(res.status)
    const n = (await res.json()).stargazers_count ?? 0
    display.value = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n)
    sessionStorage.setItem('gh-stars', display.value)
  } catch {
    display.value = '' // 静默失败，仅显示图标
  }
})
</script>

<style scoped>
.nav-gh {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.25s, color 0.25s;
}
.nav-gh:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.gh-icon {
  flex-shrink: 0;
}
@media (min-width: 1280px) {
  /* 与默认 social link 图标对齐 */
  .nav-gh { margin-right: 4px; }
}
</style>
