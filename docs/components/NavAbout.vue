<script setup>
import { aboutState } from './aboutState'
</script>

<template>
  <button class="about-nav-btn" @click="aboutState.open = true">About</button>
</template>

<style scoped>
.about-nav-btn {
  background: none;
  border: 1px solid var(--gh-border);
  border-radius: 6px;
  padding: 0.2rem 0.55rem;
  font-size: 0.82em;
  font-weight: 600;
  color: var(--gh-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  font-family: inherit;
}
.about-nav-btn:hover {
  background: var(--gh-canvas-subtle);
  color: var(--gh-accent);
  border-color: var(--gh-accent);
}
</style>
