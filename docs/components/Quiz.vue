<script setup>
import { reactive } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }
})

// state[qIdx] = { picked: number|null, revealed: bool }
const state = reactive(props.items.map(() => ({ picked: null, revealed: false })))

function pick(qi, oi) {
  if (state[qi].revealed) return
  state[qi].picked = oi
  state[qi].revealed = true
}

function letter(i) {
  return String.fromCharCode(65 + i)
}
</script>

<template>
  <div class="quiz">
    <h2 tabindex="-1">🧪 随堂测验</h2>
    <p class="quiz-tip">点击你认为正确的选项。答错时会展示正确答案与原因解析。</p>
    <div v-for="(q, qi) in items" :key="qi" class="quiz-q">
      <p class="quiz-title"><strong>{{ qi + 1 }}. {{ q.question || q.q }}</strong></p>
      <div v-for="(opt, oi) in q.options" :key="oi" class="quiz-opt">
        <button
          :class="{
            correct: state[qi].revealed && oi === q.answer,
            wrong: state[qi].revealed && state[qi].picked === oi && oi !== q.answer,
            plain: !state[qi].revealed
          }"
          @click="pick(qi, oi)"
        >
          <span class="letter">{{ letter(oi) }}</span> {{ opt }}
        </button>
      </div>
      <div v-if="state[qi].revealed" :class="['verdict', state[qi].picked === q.answer ? 'ok' : 'bad']">
        <template v-if="state[qi].picked === q.answer">✅ 回答正确！</template>
        <template v-else>❌ 正确答案是 {{ letter(q.answer) }}：「{{ q.options[q.answer] }}」</template>
        <p class="explain">{{ q.explain }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  margin-top: 3rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--gh-border);
  border-radius: 6px;
  background: var(--gh-canvas-subtle);
}
.quiz-tip {
  color: var(--gh-muted);
  font-size: 0.9em;
}
.quiz-q {
  padding: 0.75rem 0;
  border-top: 1px dashed var(--gh-border);
}
.quiz-title {
  margin: 0.4rem 0;
}
.quiz-opt button {
  display: block;
  width: 100%;
  text-align: left;
  margin: 0.35rem 0;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--gh-border);
  background: var(--gh-canvas);
  color: var(--gh-fg);
  cursor: pointer;
  font-size: 0.92em;
}
.quiz-opt button:hover.plain {
  border-color: var(--gh-accent);
}
.quiz-opt button .letter {
  display: inline-block;
  min-width: 1.4em;
  font-weight: 600;
}
.quiz-opt button.correct {
  border-color: #1a7f37;
  background: #dafbe1;
}
.quiz-opt button.wrong {
  border-color: #cf222e;
  background: #ffebe9;
}
.verdict {
  margin: 0.5rem 0 0;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  font-size: 0.92em;
}
.verdict.ok {
  background: #dafbe1;
  border: 1px solid #1a7f37;
}
.verdict.bad {
  background: #ffebe9;
  border: 1px solid #cf222e;
}
.explain {
  margin: 0.4rem 0 0;
  color: var(--gh-fg);
}
</style>
