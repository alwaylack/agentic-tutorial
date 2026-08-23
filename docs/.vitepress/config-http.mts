import { defineConfig } from 'vitepress'

// ===== HTTP 请求库教程 =====
const http = [
  { text: '0. 课程导学', link: '/http/' },
  { text: '01 HTTP 客户端生态概览', link: '/http/ch01' },
  { text: '02 GET 请求与响应处理', link: '/http/ch02' },
  { text: '03 POST 与请求体构建', link: '/http/ch03' },
  { text: '04 请求参数：Headers、Cookies、Auth', link: '/http/ch04' },
  { text: '05 响应详解：状态码、JSON、文件', link: '/http/ch05' },
  { text: '06 Session 与持久连接', link: '/http/ch06' },
  { text: '07 超时与重试机制', link: '/http/ch07' },
  { text: '08 代理与 SSL/TLS 配置', link: '/http/ch08' },
  { text: '09 异常处理与最佳实践', link: '/http/ch09' },
  { text: '10 httpx 简介与同步 API', link: '/http/ch10' },
  { text: '11 异步客户端 AsyncClient', link: '/http/ch11' },
  { text: '12 并发请求与并发控制', link: '/http/ch12' },
  { text: '13 HTTP/2 与 WebSocket', link: '/http/ch13' },
  { text: '14 中间件与事件钩子', link: '/http/ch14' },
  { text: '15 pytest 集成测试', link: '/http/ch15' },
  { text: '16 性能优化与资源管理', link: '/http/ch16' },
  { text: '17 API 客户端封装模式', link: '/http/ch17' },
  { text: '18 安全最佳实践', link: '/http/ch18' },
  { text: '19 生产部署与监控', link: '/http/ch19' },
  { text: '20 综合实战：GitHub API 客户端', link: '/http/ch20' }
]

export default defineConfig({
  title: '编程进阶教程站',
  description: '从零基础到生产实践：pytest · FastAPI · Agno · CrewAI · Playwright · Pi · HTTP',
  appearance: false,
  themeConfig: {
    siteTitle: '📚 编程进阶教程站',
    nav: [
      { text: '首页', link: '/' },
      { text: 'pytest', link: '/pytest/' },
      { text: 'FastAPI', link: '/fastapi/' },
      { text: 'Agno', link: '/agno/' },
      { text: 'CrewAI', link: '/crewai/' },
      { text: 'Playwright', link: '/playwright/' },
      { text: 'Pi', link: '/pi/' },
      { text: 'Agent 工程', link: '/agent/' },
      { text: 'HTTP 请求', link: '/http/' }
    ],
    sidebar: {
      '/pytest/': [{ text: 'pytest 9 教程（20 章）', items: [] }],
      '/fastapi/': [{ text: 'FastAPI 教程（22 章）', items: [] }],
      '/agno/': [{ text: 'Agno 2 教程（24 章）', items: [] }],
      '/crewai/': [{ text: 'CrewAI 教程（25 章）', items: [] }],
      '/playwright/': [{ text: 'Playwright 教程（22 章）', items: [] }],
      '/pi/': [{ text: 'Pi 编码智能体教程（20 章）', items: [] }],
      '/agent/': [{ text: 'Agent 工程基础教程（32 章）', items: [] }],
      '/http/': [{ text: 'HTTP 请求库教程（20 章）', items: http }]
    }
  }
})
