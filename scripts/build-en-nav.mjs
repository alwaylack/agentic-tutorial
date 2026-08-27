// 依据 docs/tmp/course-map-with-items.json（顺序） + docs/.vitepress/en-titles.json（英文标题）
// 重建 config.mts 中 locales.en 的 nav 与 sidebar。
// 仅包含目标文件已存在的条目 → 支持翻译渐进上线。用法: node scripts/build-en-nav.mjs
import { readFileSync, writeFileSync, existsSync } from 'fs'

const CFG = 'docs/.vitepress/config.mts'
const MAP = JSON.parse(readFileSync('docs/tmp/course-map-with-items.json', 'utf8'))
const TITLES = JSON.parse(readFileSync('docs/.vitepress/en-titles.json', 'utf8'))

const items = TITLES.items || {}
const courses = TITLES.courses || {}

function urlFor(dir, link) {
  if (link === '/' + dir + '/') return `/en/${dir}/`
  const file = link.replace('/' + dir + '/', '')
  return `/en/${dir}/${file}.html`
}

function fileFor(dir, link) {
  return link === '/' + dir + '/' ? 'index.md' : link.replace('/' + dir + '/', '') + '.md'
}

function titleFor(dir, link) {
  const key = link === '/' + dir + '/' ? `/${dir}/index` : link.replace(/\/$/, '')
  const zh = MAP.find(m => m.dir === dir)?.items.find(i => i.link === link)?.title
    || items[key] || ''
  // 标题缺失时回退用英文章节名占位，避免键入未定义
  if (!items[key]) return null
  return items[key].replace(/'/g, "\\'") || zh
}

const sidebarLines = []
const navGroupItems = []
let usedTitles = 0

for (const group of MAP) {
  const dir = group.dir
  const ready = []
  for (const it of group.items) {
    const dest = `docs/${'en'}/${dir}/${fileFor(dir, it.link)}`
    if (!existsSync(dest)) continue
    const t = titleFor(dir, it.link)
    if (t === null) continue
    ready.push({ text: t, link: urlFor(dir, it.link) })
    usedTitles++
  }
  if (!ready.length) continue
  sidebarLines.push(`      '/${dir}/': [{ text: '${courses[dir] || dir}', items: [` +
    ready.map(i => `{ text: '${i.text}', link: '${i.link}' }`).join(', ') + `] }],`)
  navGroupItems.push({ dir, text: courses[dir] || dir, link: ready[0].link })
}

const groupOf = d => ['http','pytest','playwright','locust','fastapi'].includes(d) ? 'web'
  : ['agno','crewai','ai-sdk','agent-prod','mastra','flue','firstmate','pi-agent'].includes(d) ? 'agent'
  : 'assist'

const icons = { web: '🌐', agent: '🤖', assist: '🧠' }
const names = { web: 'Web & Testing', agent: 'Agent Frameworks', assist: 'AI Assistants & Engineering' }

const navGroups = ['web', 'agent', 'assist'].map(g => {
  const inG = navGroupItems.filter(i => groupOf(i.dir) === g)
  if (!inG.length) return ''
  return `          {\n            text: '${icons[g]} ${names[g]}',\n            items: [\n` +
    inG.map(i => `              { text: '${i.text.replace(/'/g, "\\'")}', link: '${i.link}' }`).join(',\n') +
    `\n            ]\n          }`
}).filter(Boolean).join(',\n')

const enNav = `        // EN-NAV-START\n        nav: [\n          { text: 'Home', link: '/en/' },\n${navGroups},\n          { text: 'About', link: '/en/about.html' }\n        ],\n        // EN-NAV-END`

const enSidebar = `        // EN-SIDEBAR-START\n        sidebar: {\n${sidebarLines.join('\n')}\n        },\n        // EN-SIDEBAR-END`

let cfg = readFileSync(CFG, 'utf8')
cfg = cfg.replace(/ *\/\/ EN-NAV-START[\s\S]*?\/\/ EN-NAV-END/, enNav)
cfg = cfg.replace(/ *\/\/ EN-SIDEBAR-START[\s\S]*?\/\/ EN-SIDEBAR-END/, enSidebar)
writeFileSync(CFG, cfg)
console.log(`OK EN nav/sidebar: ${sidebarLines.length} courses, ${usedTitles} translated entries`)
