# 部署指南

本项目支持两种部署方式，任选其一。

## 方式一：Vercel（已配置）

1. 登录 [vercel.com](https://vercel.com)，导入 GitHub 仓库 `alwaylack/agentic-tutorial`
2. Vercel 会自动读取 `vercel.json`：
   - Build: `npm run build`
   - Output: `docs/.vitepress/dist`
3. 每次推送到 `main` 自动重新部署

或用 CLI：

```bash
npx vercel --prod
```

## 方式二：Cloudflare Pages

### Git 自动部署（推荐）

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 选择仓库 `agentic-tutorial`，构建配置：
   - Framework preset: **VitePress**（若无则选 None）
   - Build command: `npm run build`（若预设填了 `npx vitepress build`，请改为 `npm run build`；仓库已内置根目录兜底配置，两种均可，但 `npm run build` 更稳妥）
   - Build command: `npm run build`
   - Build output directory: `docs/.vitepress/dist`
   - 环境变量：`NODE_VERSION` = `22`（wrangler.toml 已内置）
3. 保存并部署；后续 push 到 `main` 自动触发

### CLI 手动部署

```bash
# 首次登录（浏览器授权）
npx wrangler login

# 构建并部署到 Pages
npm run deploy:cf
```

### 自定义域名

Cloudflare Dashboard → Pages 项目 → **Custom domains** → 添加你的域名。

## 本地预览

```bash
npm run dev       # 开发服务器 http://localhost:5173
npm run build     # 生产构建
npm run preview   # 本地预览构建产物
```
