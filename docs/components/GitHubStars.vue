<template>
  <a
    class="gh-star"
    href="https://github.com/alwaylack/agentic-tutorial"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`GitHub 仓库，${stars} 个 Star`"
  >
    <svg class="gh-icon" viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.66-.21-2.17.81a7.528 7.528 0 0 0-4 0c-1.51-1.03-2.17-.81-2.17-.81-.44 1.1-.16 1.92-.08 2.12-.52.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
    </svg>
    <span class="gh-label">Star</span>
    <span class="gh-count">{{ stars }}</span>
  </a>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const REPO = 'alwaylack/agentic-tutorial'
const stars = ref('—')

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) throw new Error(res.status)
    const data = await res.json()
    const n = data.stargazers_count ?? 0
    stars.value = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n)
  } catch {
    stars.value = 'Star'
  }
})
</script>

<style scoped>
.gh-star {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}
.gh-star:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}
.gh-icon {
  flex-shrink: 0;
}
.gh-label {
  line-height: 1;
}
.gh-count {
  min-width: 20px;
  text-align: center;
  padding: 1px 8px;
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  font-size: 13px;
  font-weight: 600;
}
</style>
