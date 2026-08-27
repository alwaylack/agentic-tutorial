import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 3 章 · 项目上下文与 CLAUDE.md","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch03.md","filePath":"claude-code/ch03.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch03.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: '当项目根目录的 CLAUDE.md 说"用 npm"，而子目录 CLAUDE.md 说"用 pnpm"，处理该子目录下文件时会怎样？',
        options: [
          "只使用根目录的指令",
          "只使用子目录的指令",
          "两者都生效，子目录覆盖冲突部分",
          "产生错误"
        ],
        answer: 2,
        explain: "CLAUDE.md 采用就近覆盖原则：两层都会加载，子目录中的指令覆盖根目录中冲突的部分。非冲突部分仍然生效。"
      },
      {
        question: "官方建议 CLAUDE.md 的理想长度是多少？",
        options: ["越详细越好", "约 100 行以内", "不超过 10 行", "至少 500 行"],
        answer: 1,
        explain: '官方经验是 CLAUDE.md 应作为"目录页"而非"百科全书"，约 100 行足够；详细内容放 docs/ 目录让 agent 按需读取。'
      },
      {
        question: ".claude/CLAUDE.local.md 的用途是什么？",
        options: [
          "存放全局共享配置",
          "存放个人本地偏好且不会被提交到 Git",
          "存放生产环境密钥",
          "替代 CLAUDE.md 的旧格式"
        ],
        answer: 1,
        explain: "CLAUDE.local.md 用于存放个人的本地指令覆盖（如个人代码风格偏好），设计上不应加入版本控制。"
      },
      {
        question: "如果项目中同时有 CLAUDE.md 和 AGENTS.md，会发生什么？",
        options: [
          "只有 CLAUDE.md 被读取",
          "只有 AGENTS.md 被读取",
          "两者都被加载",
          "产生冲突错误"
        ],
        answer: 2,
        explain: "Claude Code 同时兼容两种格式。两者都存在时会全部加载，适合多工具团队共用同一份指令文件。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-3-章-·-项目上下文与-claude-md" tabindex="-1">第 3 章 · 项目上下文与 CLAUDE.md <a class="header-anchor" href="#第-3-章-·-项目上下文与-claude-md" aria-label="Permalink to &quot;第 3 章 · 项目上下文与 CLAUDE.md&quot;">​</a></h1><blockquote><p>本章目标：理解 CLAUDE.md 的作用与加载层级，学会编写有效的项目指令文件，掌握嵌套优先级规则。</p></blockquote><h2 id="_3-1-为什么需要-claude-md" tabindex="-1">3.1 为什么需要 CLAUDE.md <a class="header-anchor" href="#_3-1-为什么需要-claude-md" aria-label="Permalink to &quot;3.1 为什么需要 CLAUDE.md&quot;">​</a></h2><p>每次启动 Claude Code 时它对项目一无所知。没有 CLAUDE.md，它会花大量 token 探索目录结构、猜测技术栈、试错构建命令。有了 CLAUDE.md，它直接获得：</p><ul><li>项目是什么（技术栈、框架版本）</li><li>怎么构建和测试</li><li>代码风格约定</li><li>不能违反的硬约束</li></ul><div class="tip custom-block"><p class="custom-block-title">ROI 最高的第一步</p><p>在仓库根目录放一个 <code>CLAUDE.md</code> 文件是 harness engineering 中投入产出比最高的操作——一个文件可能比升级到更贵的模型更有效。</p></div><h2 id="_3-2-加载层级" tabindex="-1">3.2 加载层级 <a class="header-anchor" href="#_3-2-加载层级" aria-label="Permalink to &quot;3.2 加载层级&quot;">​</a></h2><p>Claude Code 按以下优先级加载指令文件（就近覆盖远端）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 企业策略   /Library/Application Support/ClaudeCode/CLAUDE.md  (最高)</span></span>
<span class="line"><span>2. 用户全局   ~/.claude/CLAUDE.md</span></span>
<span class="line"><span>3. 项目根目录 ./CLAUDE.md 或 ./.claude/CLAUDE.md</span></span>
<span class="line"><span>4. 子目录     src/components/CLAUDE.md (仅当读取该目录下的文件时)</span></span>
<span class="line"><span>5. 本地覆盖   ./.claude/CLAUDE.local.md (不提交到 Git)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="嵌套优先级示例" tabindex="-1">嵌套优先级示例 <a class="header-anchor" href="#嵌套优先级示例" aria-label="Permalink to &quot;嵌套优先级示例&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>my-project/</span></span>
<span class="line"><span>├── CLAUDE.md              ← &quot;使用 pnpm 作为包管理器&quot;</span></span>
<span class="line"><span>├── frontend/</span></span>
<span class="line"><span>│   └── CLAUDE.md          ← &quot;前端测试用 vitest&quot;</span></span>
<span class="line"><span>└── backend/</span></span>
<span class="line"><span>    └── CLAUDE.md          ← &quot;后端测试用 pytest&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>当前端任务时，两个文件都生效：<code>pnpm</code> + <code>vitest</code>。 当后端任务时：<code>pnpm</code> + <code>pytest</code>。</p><h2 id="_3-3-编写有效的-claude-md" tabindex="-1">3.3 编写有效的 CLAUDE.md <a class="header-anchor" href="#_3-3-编写有效的-claude-md" aria-label="Permalink to &quot;3.3 编写有效的 CLAUDE.md&quot;">​</a></h2><p>官方建议 <strong>约 100 行以内</strong>——它是&quot;地图&quot;而非&quot;百科全书&quot;。超过的内容拆到 <code>docs/</code> 目录让 agent 按需读取。</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># CLAUDE.md</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Project Overview</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">E-commerce API built with FastAPI + PostgreSQL.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Tech Stack</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Python 3.12, FastAPI 0.141, SQLAlchemy 2.0 (async)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> PostgreSQL 16, Redis 7</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Commands</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Install: pip install -e &quot;.[</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-light-text-decoration": "underline", "--shiki-dark": "#DBEDFF", "--shiki-dark-text-decoration": "underline" })}">dev</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Test: pytest tests/ -x --tb=short</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Lint: ruff check src/</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Type check: mypy src/ --strict</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Run dev: uvicorn app.main:app --reload</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Code Style</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Use Annotated dependencies for DI</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> All API responses use Pydantic response_model</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Error handling via custom exceptions in app/exceptions.py</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Hard Constraints</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Never modify alembic/migrations manually</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Always run tests before marking task complete</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="_3-4-与-agents-md-的兼容性" tabindex="-1">3.4 与 AGENTS.md 的兼容性 <a class="header-anchor" href="#_3-4-与-agents-md-的兼容性" aria-label="Permalink to &quot;3.4 与 AGENTS.md 的兼容性&quot;">​</a></h2><p>Claude Code 也支持读取 <code>AGENTS.md</code> 文件（开放标准）。如果两者同时存在，<strong>两者都会被加载</strong>。推荐做法：</p><table tabindex="0"><thead><tr><th>场景</th><th>建议</th></tr></thead><tbody><tr><td>只用 Claude Code</td><td>用 <code>CLAUDE.md</code></td></tr><tr><td>多工具团队</td><td>用 <code>AGENTS.md</code>（Codex/Cursor 等也认）</td></tr><tr><td>需要差异化指令</td><td>同时维护，CLAUDE.md 放 Claude 特有配置</td></tr></tbody></table><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>CLAUDE.md 告诉 agent 项目全貌和约束，ROI 极高；</li><li>五层加载优先级：企业 &gt; 全局 &gt; 项目 &gt; 子目录 &gt; 本地；</li><li>约 100 行以内，超出的拆到 docs/ 按需读；</li><li>AGENTS.md 兼容，可共存。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>为你的项目编写一份 CLAUDE.md，包含构建命令和技术栈。</li><li>在子目录中创建嵌套 CLAUDE.md，设置不同的测试命令，验证就近优先。</li><li>创建 <code>.claude/CLAUDE.local.md</code> 写入个人偏好，确认不被 Git 追踪。</li></ol><blockquote><p>完成后进入<a href="./ch04.html">第 4 章</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch03.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
