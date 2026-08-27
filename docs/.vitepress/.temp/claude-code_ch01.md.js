import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 1 章 · Claude Code 简介与安装","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch01.md","filePath":"claude-code/ch01.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch01.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "Claude Code 与传统 IDE 插件的核心区别是什么？",
        options: [
          "它只能生成单文件代码片段",
          "它是独立终端进程，能执行命令和管理 Git",
          "它需要互联网连接才能工作",
          "它只支持 Python 项目"
        ],
        answer: 1,
        explain: "Claude Code 是独立的终端进程，可以直接读写文件、执行 Shell 命令、运行测试和提交 Git，而 IDE 插件通常只能做被动补全。"
      },
      {
        question: "安装 Claude Code 的正确命令是？",
        options: [
          "pip install claude-code",
          "npm install -g @anthropic-ai/claude-code",
          "brew install claude",
          "cargo install claude-code"
        ],
        answer: 1,
        explain: "Claude Code 是 Node.js 包，通过 npm 全局安装：`npm install -g @anthropic-ai/claude-code`。"
      },
      {
        question: "Claude Code 支持哪两种认证方式？",
        options: [
          "用户名密码和 OAuth",
          "API Key 和 Claude Pro/Max 订阅",
          "SSH Key 和 TLS 证书",
          "GitHub Token 和 Google OAuth"
        ],
        answer: 1,
        explain: "支持设置 ANTHROPIC_API_KEY 环境变量按量计费，或通过 OAuth 登录 Claude Pro/Max 订阅账号。"
      },
      {
        question: "Claude Code 要求的最低 Node.js 版本是？",
        options: ["14", "16", "18", "20"],
        answer: 2,
        explain: "官方要求 Node.js 18 或更高版本。建议使用 LTS 版本以获得最佳兼容性。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-1-章-·-claude-code-简介与安装" tabindex="-1">第 1 章 · Claude Code 简介与安装 <a class="header-anchor" href="#第-1-章-·-claude-code-简介与安装" aria-label="Permalink to &quot;第 1 章 · Claude Code 简介与安装&quot;">​</a></h1><blockquote><p>本章目标：理解 Claude Code 的定位与核心价值，完成安装与认证配置，验证环境可用。</p></blockquote><h2 id="_1-1-什么是-claude-code" tabindex="-1">1.1 什么是 Claude Code <a class="header-anchor" href="#_1-1-什么是-claude-code" aria-label="Permalink to &quot;1.1 什么是 Claude Code&quot;">​</a></h2><p>Claude Code 是 Anthropic 推出的<strong>终端 AI 编码助手</strong>（agentic coding tool）。它运行在你的终端中，能直接读写项目文件、执行 Shell 命令、运行测试、提交 Git——而不只是生成代码片段让你手动粘贴。</p><p>与传统 IDE 插件的核心区别：</p><table tabindex="0"><thead><tr><th>特性</th><th>IDE 补全插件</th><th>Claude Code</th></tr></thead><tbody><tr><td>运行位置</td><td>编辑器内</td><td>独立终端进程</td></tr><tr><td>能否执行命令</td><td>❌</td><td>✅ Bash / 测试 / Git</td></tr><tr><td>上下文来源</td><td>当前文件</td><td>整个项目目录</td></tr><tr><td>多文件编辑</td><td>单文件</td><td>跨文件原子操作</td></tr><tr><td>自主性</td><td>被动补全</td><td>主动规划并执行</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">核心理念</p><p>Claude Code 遵循 <strong>&quot;agentic&quot;</strong> 设计哲学：你描述目标，它自主规划步骤、调用工具、验证结果、迭代修正——你负责审查和决策。</p></div><h2 id="_1-2-安装" tabindex="-1">1.2 安装 <a class="header-anchor" href="#_1-2-安装" aria-label="Permalink to &quot;1.2 安装&quot;">​</a></h2><h3 id="前置条件" tabindex="-1">前置条件 <a class="header-anchor" href="#前置条件" aria-label="Permalink to &quot;前置条件&quot;">​</a></h3><ul><li>Node.js <strong>18+</strong></li><li>macOS / Linux / Windows (WSL)</li></ul><h3 id="npm-全局安装" tabindex="-1">npm 全局安装 <a class="header-anchor" href="#npm-全局安装" aria-label="Permalink to &quot;npm 全局安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npm</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> install</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -g</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @anthropic-ai/claude-code</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="验证安装" tabindex="-1">验证安装 <a class="header-anchor" href="#验证安装" aria-label="Permalink to &quot;验证安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 输出版本号，如 2.1.241</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --help</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 显示所有可用子命令和选项</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_1-3-认证配置" tabindex="-1">1.3 认证配置 <a class="header-anchor" href="#_1-3-认证配置" aria-label="Permalink to &quot;1.3 认证配置&quot;">​</a></h2><p>Claude Code 支持两种认证方式：</p><h3 id="方式一-anthropic-api-key-按用量计费" tabindex="-1">方式一：Anthropic API Key（按用量计费） <a class="header-anchor" href="#方式一-anthropic-api-key-按用量计费" aria-label="Permalink to &quot;方式一：Anthropic API Key（按用量计费）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">export</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> ANTHROPIC_API_KEY</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;sk-ant-...&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>建议将此行加入 <code>~/.zshrc</code> 或 <code>~/.bashrc</code> 持久化。</p><h3 id="方式二-claude-pro-max-订阅-包含在订阅内" tabindex="-1">方式二：Claude Pro/Max 订阅（包含在订阅内） <a class="header-anchor" href="#方式二-claude-pro-max-订阅-包含在订阅内" aria-label="Permalink to &quot;方式二：Claude Pro/Max 订阅（包含在订阅内）&quot;">​</a></h3><p>首次运行 <code>claude</code> 时选择 &quot;Log in with Claude account&quot;，浏览器会打开 OAuth 认证页面。</p><h2 id="_1-4-首次启动" tabindex="-1">1.4 首次启动 <a class="header-anchor" href="#_1-4-首次启动" aria-label="Permalink to &quot;1.4 首次启动&quot;">​</a></h2><p>进入任意项目目录，启动 Claude Code：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> my-project/</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>你会看到交互式 REPL 提示符。输入一条消息测试：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 请告诉我这个项目的结构和技术栈</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Claude Code 会自动读取目录中的文件、分析代码、给出总结。</p><h2 id="_1-5-版本管理" tabindex="-1">1.5 版本管理 <a class="header-anchor" href="#_1-5-版本管理" aria-label="Permalink to &quot;1.5 版本管理&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 检查当前版本</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 更新到最新版</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npm</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> update</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -g</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @anthropic-ai/claude-code</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 固定特定版本（团队协作推荐）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">npm</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> install</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -g</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> @anthropic-ai/claude-code@2.1.241</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">版本一致性</p><p>团队协作时，建议所有成员使用相同版本的 Claude Code，避免因行为差异导致 CLAUDE.md 指令效果不一致。</p></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Claude Code 是终端 AI 编码助手，能直接操作文件、执行命令、管理 Git；</li><li>通过 <code>npm install -g @anthropic-ai/claude-code</code> 安装；</li><li>支持 API Key 和 Pro/Max 订阅两种认证方式；</li><li>在项目根目录启动 <code>claude</code> 即可开始使用。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>安装 Claude Code 并验证版本号。</li><li>配置 API Key 或登录订阅账号。</li><li>在一个已有项目中启动 <code>claude</code>，让它描述项目结构。</li></ol><blockquote><p>完成后进入<a href="./ch02.html">第 2 章</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch01.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
