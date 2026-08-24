<template>
  <!-- 悬浮球：可拖动 -->
  <button
    ref="fabEl"
    class="askai-fab"
    :class="{ draggable: posSet }"
    :style="fabStyle"
    :title="open ? '收起 AI 助手' : '遇到问题？问问 AI 助手（可拖动）'"
    @pointerdown="onPointerDown"
  >
    <span v-if="!open">🤖</span>
    <span v-else>✕</span>
    <span v-if="!configured && !open" class="askai-dot"></span>
  </button>

  <!-- 聊天面板 -->
  <transition name="askai-slide">
    <div v-if="open" class="askai-panel" :style="panelStyle">
      <div class="askai-header">
        <strong>🎓 学习助手</strong>
        <span class="askai-header-actions">
          <button class="askai-icon-btn" title="清空对话记录" @click="clearChat">🧹 清空</button>
          <button class="askai-icon-btn" title="配置 Provider / 模型 / API Key" @click="showSettings = !showSettings">⚙️ 设置</button>
        </span>
      </div>

      <!-- 设置区 -->
      <div v-if="showSettings" class="askai-settings">
        <p class="askai-settings-hint">兼容 OpenAI Chat Completions 接口。API Key 仅保存在浏览器 localStorage，不会上传到任何第三方。</p>
        <label>
          API Base URL
          <input v-model="cfg.baseUrl" placeholder="https://api.deepseek.com/v1" />
        </label>
        <label>
          模型名称
          <input v-model="cfg.model" placeholder="deepseek-chat" />
        </label>
        <label>
          API Key
          <input v-model="cfg.apiKey" type="password" placeholder="sk-..." />
        </label>
        <div class="askai-settings-actions">
          <button class="askai-btn-primary" @click="saveSettings">保存</button>
          <span v-if="saveTip" class="askai-save-tip">{{ saveTip }}</span>
        </div>
      </div>

      <!-- 消息区 -->
      <div ref="listEl" class="askai-messages">
        <div v-if="messages.length === 0" class="askai-empty">
          <p>👋 我是本站学习助手。</p>
          <p>学习中遇到不懂的概念、代码报错、练习卡壳，都可以直接问我。当前页面的章节标题会自动作为上下文。</p>
          <p v-if="!configured" class="askai-empty-warn">⚠️ 尚未配置 Provider——请点击右上角 ⚙️ 填写 Base URL、模型与 API Key。</p>
        </div>
        <div v-for="(m, i) in messages" :key="i" class="askai-msg" :class="m.role">
          <div class="askai-bubble">{{ m.content }}</div>
        </div>
        <div v-if="loading" class="askai-msg assistant">
          <div class="askai-bubble askai-typing">思考中<span>.</span><span>.</span><span>.</span></div>
        </div>
      </div>

      <!-- 输入区 -->
      <div class="askai-input">
        <textarea
          v-model="draft"
          rows="2"
          :placeholder="configured ? '输入你的问题，Enter 发送，Shift+Enter 换行' : '请先在 ⚙️ 设置中完成配置'"
          :disabled="loading"
          @keydown.enter.exact.prevent="send"
        ></textarea>
        <button class="askai-btn-primary" :disabled="loading || !draft.trim() || !configured" @click="send">发送</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const open = ref(false)
const showSettings = ref(false)
const saveTip = ref('')
const loading = ref(false)
const draft = ref('')
const listEl = ref(null)

const DEFAULT_CFG = {
  baseUrl: '',
  model: '',
  apiKey: ''
}
const cfg = reactive({ ...DEFAULT_CFG })
const configured = computed(() => !!(cfg.baseUrl && cfg.model && cfg.apiKey))

/* ===== 拖动逻辑 ===== */
const fabEl = ref(null)
const pos = reactive({ x: null, y: null })   // null = 使用 CSS 默认右下角
const posSet = computed(() => pos.x !== null)
const panelPos = reactive({ x: null, y: null })
const FAB_SIZE = 52
let dragState = null

onMounted(() => {
  try {
    const raw = localStorage.getItem('askai-config')
    if (raw) Object.assign(cfg, JSON.parse(raw))
    const p = JSON.parse(localStorage.getItem('askai-pos') || 'null')
    if (p && typeof p.x === 'number') {
      const c = clampPos(p.x, p.y)
      pos.x = c.x; pos.y = c.y
      panelPos.x = c.x; panelPos.y = c.y
    }
  } catch (e) { /* 忽略损坏的缓存 */ }
})

function clampPos(x, y) {
  const maxX = window.innerWidth - FAB_SIZE - 8
  const maxY = window.innerHeight - FAB_SIZE - 8
  return { x: Math.min(Math.max(x, 8), maxX), y: Math.min(Math.max(y, 8), maxY) }
}

function onPointerDown(e) {
  // 只响应鼠标左键与触摸/笔，避免与右键冲突
  if (e.button !== undefined && e.button !== 0) return
  const rect = fabEl.value.getBoundingClientRect()
  dragState = {
    startX: e.clientX,
    startY: e.clientY,
    origX: rect.left,
    origY: rect.top,
    moved: false
  }
  ;(e.currentTarget).setPointerCapture?.(e.pointerId)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(e) {
  if (!dragState) return
  const dx = e.clientX - dragState.startX
  const dy = e.clientY - dragState.startY
  if (!dragState.moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return
  dragState.moved = true
  const c = clampPos(dragState.origX + dx, dragState.origY + dy)
  pos.x = c.x; pos.y = c.y
}

function onPointerUp() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  const wasDrag = dragState?.moved
  dragState = null
  if (wasDrag) {
    try { localStorage.setItem('askai-pos', JSON.stringify({ x: pos.x, y: pos.y })) } catch (e) {}
    updatePanelAnchor()
  } else {
    toggle() // 未拖动视为点击
  }
}

// 面板跟随悬浮球位置展开，并限制在视口内
function updatePanelAnchor() {
  const pw = Math.min(400, window.innerWidth - 32)
  const px = Math.min(Math.max(pos.x + FAB_SIZE - pw, 8), window.innerWidth - pw - 8)
  let py = pos.y - 12 - Math.min(560, window.innerHeight - 130)
  if (py < 60) py = Math.min(pos.y + FAB_SIZE + 12, window.innerHeight - 200)
  panelPos.x = px; panelPos.y = Math.max(py, 8)
}

const fabStyle = computed(() =>
  posSet.value ? { left: pos.x + 'px', top: pos.y + 'px', right: 'auto', bottom: 'auto' } : {}
)
const panelStyle = computed(() =>
  posSet.value ? { left: panelPos.x + 'px', top: panelPos.y + 'px', right: 'auto', bottom: 'auto', width: 'min(400px, calc(100vw - 32px))' } : {}
)

const SYSTEM_PROMPT_BASE =
  '你是一个中文编程教程网站的学习助手。用户正在学习智能体开发相关课程（pytest/FastAPI/Agno/CrewAI/Mastra/Flue/Pi Agent/Claude Code/Locust 等）。' +
  '请用简体中文回答，技术术语保留英文；回答要简洁、循序渐进、贴合教程语境；如果问题与当前章节相关，优先围绕当前章节内容解释。'

const messages = ref([])

onMounted(() => {
  try {
    const raw = localStorage.getItem('askai-config')
    if (raw) Object.assign(cfg, JSON.parse(raw))
  } catch (e) { /* 忽略损坏的缓存 */ }
})

function toggle() {
  open.value = !open.value
  if (open.value && posSet.value) updatePanelAnchor()
}

function saveSettings() {
  try {
    localStorage.setItem('askai-config', JSON.stringify({ ...cfg }))
    saveTip.value = '✅ 已保存'
    setTimeout(() => { saveTip.value = ''; showSettings.value = false }, 1200)
  } catch (e) {
    saveTip.value = '❌ 保存失败：' + e.message
  }
}

function clearChat() {
  messages.value = []
}

function scrollToBottom() {
  nextTick(() => {
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  })
}

async function send() {
  const text = draft.value.trim()
  if (!text || loading.value || !configured.value) return
  draft.value = ''
  messages.value.push({ role: 'user', content: text })
  scrollToBottom()

  const pageTitle = page.value?.title || ''
  const pagePath = page.value?.relativePath || ''
  const systemPrompt =
    SYSTEM_PROMPT_BASE +
    (pageTitle ? `\n用户当前浏览的页面：「${pageTitle}」（路径 ${pagePath}）。` : '')

  const history = messages.value.slice(-12).map(m => ({ role: m.role, content: m.content }))

  loading.value = true
  try {
    const url = cfg.baseUrl.replace(/\/+$/, '') + '/chat/completions'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.apiKey}`
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: [{ role: 'system', content: systemPrompt }, ...history],
        temperature: 0.7
      })
    })
    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      throw new Error(`HTTP ${res.status} ${errText.slice(0, 200)}`)
    }
    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    messages.value.push({
      role: 'assistant',
      content: reply || '（模型返回了空回复，请检查模型名称是否正确。）'
    })
  } catch (e) {
    messages.value.push({
      role: 'assistant',
      content: `❌ 请求失败：${e.message}\n\n常见原因：\n1. Base URL 不正确（需以 /v1 结尾的 OpenAI 兼容地址）\n2. 模型名称拼写错误\n3. API Key 无效或额度不足\n4. 网络无法访问该 Provider\n\n可点击右上角 ⚙️ 检查配置。`
    })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.askai-fab {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 999;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--gh-border);
  background: var(--gh-canvas);
  box-shadow: 0 4px 16px rgba(31, 35, 40, 0.16);
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  touch-action: none;
  user-select: none;
}
.askai-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(31, 35, 40, 0.22);
}
.askai-fab.draggable {
  touch-action: none;
  user-select: none;
  cursor: grab;
}
.askai-fab.draggable:active {
  cursor: grabbing;
}
.askai-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1242f;
}

.askai-panel {
  position: fixed;
  right: 20px;
  bottom: 88px;
  z-index: 999;
  width: min(400px, calc(100vw - 32px));
  height: min(560px, calc(100vh - 130px));
  display: flex;
  flex-direction: column;
  background: var(--gh-canvas);
  border: 1px solid var(--gh-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(31, 35, 40, 0.18);
  overflow: hidden;
}
.askai-slide-enter-active,
.askai-slide-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.askai-slide-enter-from,
.askai-slide-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.askai-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--gh-border);
  background: var(--gh-canvas-subtle);
  font-size: 14px;
}
.askai-header-actions {
  display: flex;
  gap: 6px;
}
.askai-icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  padding: 3px 8px;
  border-radius: 6px;
  color: var(--gh-fg);
}
.askai-icon-btn:hover {
  background: var(--gh-brand-soft, rgba(9, 105, 218, 0.14));
}

.askai-settings {
  padding: 10px 14px;
  border-bottom: 1px solid var(--gh-border);
  background: var(--gh-canvas-subtle);
  font-size: 12px;
}
.askai-settings-hint {
  margin: 0 0 8px;
  color: var(--gh-muted);
  line-height: 1.5;
}
.askai-settings label {
  display: block;
  margin-bottom: 8px;
  color: var(--gh-fg);
}
.askai-settings input {
  width: 100%;
  margin-top: 3px;
  padding: 5px 8px;
  border: 1px solid var(--gh-border);
  border-radius: 6px;
  font-size: 12px;
  box-sizing: border-box;
  background: var(--gh-canvas);
  color: var(--gh-fg);
}
.askai-settings input:focus {
  outline: none;
  border-color: var(--gh-accent);
}
.askai-settings-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.askai-save-tip {
  color: #1a7f37;
}

.askai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.askai-empty {
  color: var(--gh-muted);
  font-size: 13px;
  line-height: 1.7;
}
.askai-empty-warn {
  margin-top: 6px;
  color: #9a6700;
}

.askai-msg {
  display: flex;
}
.askai-msg.user {
  justify-content: flex-end;
}
.askai-msg.assistant {
  justify-content: flex-start;
}
.askai-bubble {
  max-width: 85%;
  padding: 8px 11px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-word;
}
.askai-msg.user .askai-bubble {
  background: var(--gh-accent);
  color: #fff;
  border-bottom-right-radius: 3px;
}
.askai-msg.assistant .askai-bubble {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-bottom-left-radius: 3px;
}
.askai-typing span {
  animation: askai-blink 1.2s infinite;
}
.askai-typing span:nth-child(2) { animation-delay: 0.2s; }
.askai-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes askai-blink {
  0%, 60%, 100% { opacity: 0.2; }
  30% { opacity: 1; }
}

.askai-input {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-top: 1px solid var(--gh-border);
  align-items: flex-end;
}
.askai-input textarea {
  flex: 1;
  resize: none;
  padding: 8px 10px;
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  line-height: 1.5;
  background: var(--gh-canvas);
  color: var(--gh-fg);
}
.askai-input textarea:focus {
  outline: none;
  border-color: var(--gh-accent);
}
.askai-btn-primary {
  padding: 7px 14px;
  border: none;
  border-radius: 8px;
  background: var(--gh-accent);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
}
.askai-btn-primary:hover:not(:disabled) {
  background: var(--gh-accent-hover, #0550ae);
}
.askai-btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
