// 依据 en-titles.json 重建 config.mts 中 locales.en 的 nav 与 sidebar
// 用法: node scripts/build-en-nav.mjs   （需先存在 docs/.vitepress/en-titles.json）
import { readFileSync, writeFileSync } from 'fs'

const CFG = 'docs/.vitepress/config.mts'
const TITLES = JSON.parse(readFileSync('docs/.vitepress/en-titles.json', 'utf8'))

const items = TITLES.items || {}
const courses = TITLES.courses || {}

function extractZh() {
  const src = readFileSync(CFG, 'utf8')
  const out = {}
  const re = /const (\w+) = \[([\s\S]*?)\n\]/g
  const varToDir = {
    http:'http', pytest:'pytest', playwright:'playwright', fastapi:'fastapi', locust:'locust',
    agno:'agno', crewai:'crewai', claudeCode:'claude-code', piAgent:'pi-agent', flue:'flue',
    firstmate:'firstmate', handsOnLLM:'hands-on-llm', aiSdk:'ai-sdk', agentProd:'agent-prod',
    mastra:'mastra', agent:'agent', pi:'pi'
  }
  let m
  while ((m = re.exec(src))) {
    const dir = varToDir[m[1]]
    if (!dir) continue
    const entries = [...m[2].matchAll(/text:\s*'[^']+',\s*link:\s*'([^']+)'/g)].map(x => x[1])
    out[dir] = entries
  }
  return out
}

const zh = extractZh()

function urlFor(dir, link) {
  if (link === '/' + dir + '/') return `/en/${dir}/`
  const file = link.replace('/' + dir + '/', '')
  return `/en/${dir}/${file}.html`
}

function titleFor(dir, link) {
  const key = link === '/' + dir + '/' ? `/${dir}/index` : link.replace(/\/$/, '')
  return (items[key] || key).replace(/'/g, "\\'")
}

let sidebarLines = []
let navGroupItems = []
for (const [dir, entries] of Object.entries(zh)) {
  const itemsJoined = entries
    .map(l => `{ text: '${titleFor(dir, l)}', link: '${urlFor(dir, l)}' }`)
    .join(', ')
  sidebarLines.push(`      '/${dir}/': [{ text: '${courses[dir] || dir}', items: [${itemsJoined}] }],`)
  navGroupItems.push({ dir, text: courses[dir] || dir, link: urlFor(dir, entries[0]) })
}

const groupOf = d => ['http','pytest','playwright','locust','fastapi'].includes(d) ? 'web'
  : ['agno','crewai','ai-sdk','agent-prod','mastra','flue','firstmate','pi-agent'].includes(d) ? 'agent'
  : 'assist'

const icons = { web: '🌐', agent: '🤖', assist: '🧠' }
const names = { web: 'Web & Testing', agent: 'Agent Frameworks', assist: 'AI Assistants & Engineering' }

const navGroups = ['web', 'agent', 'assist'].map(g => {
  const inG = navGroupItems.filter(i => groupOf(i.dir) === g)
  return `          {\n            text: '${icons[g]} ${names[g]}',\n            items: [\n` +
    inG.map(i => `              { text: '${i.text.replace(/'/g, "\\'")}', link: '${i.link}' }`).join(',\n') +
    `\n            ]\n          }`
}).join(',\n')

const enNav = `        // EN-NAV-START\n        nav: [\n          { text: 'Home', link: '/en/' },\n${navGroups},\n          { text: 'About', link: '/en/about.html' }\n        ],\n        // EN-NAV-END`

const enSidebar = `        // EN-SIDEBAR-START\n        sidebar: {\n${sidebarLines.join('\n')}\n        },\n        // EN-SIDEBAR-END`

let cfg = readFileSync(CFG, 'utf8')
cfg = cfg.replace(/ *\/\/ EN-NAV-START[\s\S]*?\/\/ EN-NAV-END/, enNav)
cfg = cfg.replace(/ *\/\/ EN-SIDEBAR-START[\s\S]*?\/\/ EN-SIDEBAR-END/, enSidebar)
writeFileSync(CFG, cfg)
console.log('OK EN nav/sidebar generated:', Object.keys(zh).length, 'courses,', Object.keys(items).length, 'titles')
