// 根目录兜底配置：使不带 docs 参数的 `npx vitepress build` 也能正确构建
// （Cloudflare Pages 的 VitePress 预设默认执行该命令）
import { defineConfig } from 'vitepress'
import base from '../docs/.vitepress/config.mts'

export default defineConfig({
  ...base,
  srcDir: 'docs',
  // 输出与主配置保持一致，wrangler.toml 指向此目录
  outDir: 'docs/.vitepress/dist',
  ignoreDeadLinks: true
})
