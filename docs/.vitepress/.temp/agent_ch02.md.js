import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 2 章 · Harness 到底是什么","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch02.md","filePath":"agent/ch02.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch02.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: '根据 OpenAI 的表述，harness 工程的核心原则"the repo IS the spec"意味着什么？',
        options: [
          "仓库里的代码就是最终产品",
          "所有必要上下文应存在于仓库中，通过结构化文件交付",
          "仓库必须是 Git 版本控制系统",
          "specification 应该写在 README 里"
        ],
        answer: 1,
        explain: 'OpenAI 的"仓库即规范"原则指：所有必要上下文应存在于仓库中，通过结构化指令文件、显式验证命令和清晰目录组织交付。智能体看不到的信息等于不存在。'
      },
      {
        question: '以下哪个工具被描述为"缺乏结构化状态管理导致上下文无限累积"的反面教材？',
        options: [
          "Claude Code",
          "Cursor",
          "AutoGPT",
          "Codex"
        ],
        answer: 2,
        explain: 'AutoGPT 被作为反面教材：缺乏结构化状态管理导致长任务中上下文无限累积，缺乏精确反馈机制导致智能体陷入循环。很多人说 AutoGPT"不行"，其实是 harness 不行。'
      },
      {
        question: "harness 五子系统中，ROI 最高的是哪个？",
        options: [
          "指令子系统",
          "工具子系统",
          "反馈子系统",
          "状态子系统"
        ],
        answer: 2,
        explain: '反馈子系统（验证命令、测试、lint）是 ROI 最高的。明确的验证手段让智能体能客观判断完成质量，而非凭"感觉"。'
      },
      {
        question: "AGENTS.md 的理想长度应该是？",
        options: [
          "越详细越好，最好 500 行以上",
          "约 100 行的目录页，过长按模块拆分到 docs/",
          "只需一句话说明项目是什么",
          "不需要 AGENTS.md，README 就够了"
        ],
        answer: 1,
        explain: "OpenAI 的经验是 AGENTS.md 应是目录页而非百科全书，约 100 行即可。如果放不下，拆到 docs/ 目录让智能体按需读取。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-2-章-·-harness-到底是什么" tabindex="-1">第 2 章 · Harness 到底是什么 <a class="header-anchor" href="#第-2-章-·-harness-到底是什么" aria-label="Permalink to &quot;第 2 章 · Harness 到底是什么&quot;">​</a></h1><blockquote><p>本章目标：掌握 harness 的精确定义——五子系统模型，理解&quot;仓库即规范&quot;的核心原则，学会区分 harness 与简单提示文件。</p></blockquote><h2 id="_2-1-一个被滥用的词" tabindex="-1">2.1 一个被滥用的词 <a class="header-anchor" href="#_2-1-一个被滥用的词" aria-label="Permalink to &quot;2.1 一个被滥用的词&quot;">​</a></h2><p>&quot;Harness&quot;这个词在 AI 编码智能体圈子里被频繁使用，但大多数时候，人们说的&quot; harness &quot;其实只是一个提示文件。提示文件不是 harness。</p><p>本章给 harness 一个精确、可操作的定义——不是学术抽象，而是你今天就能用到的框架。一个完整的 harness 包含五个子系统：<strong>指令、工具、环境、状态、反馈</strong>。每个子系统有明确的责任和评估标准。</p><h2 id="_2-2-从类比开始" tabindex="-1">2.2 从类比开始 <a class="header-anchor" href="#_2-2-从类比开始" aria-label="Permalink to &quot;2.2 从类比开始&quot;">​</a></h2><p>想象你是一个新入职的工程师，被扔进一个零文档的项目。没有 README，代码里没有注释，没人告诉你怎么跑测试，CI 配置埋在某个角落。你能写出好代码吗？也许——如果你足够聪明且有耐心。但你会花大量时间&quot;搞懂这个项目是什么&quot;，而不是&quot;解决问题&quot;。</p><p>AI 智能体面临完全相同的困境，而且更糟。你至少可以问同事。智能体只能看到你放在它面前的文件和它能执行的命令。</p><p>OpenAI 将 harness 工程的核心原则表述为**&quot;仓库即规范&quot; (the repo IS the spec)**——所有必要的上下文应存在于仓库中，通过结构化指令文件、显式验证命令和清晰的目录结构交付。Anthropic 的长运行智能体文档强调状态持久化、显式恢复路径和结构化进度跟踪。两家公司关注不同方面，但说的是同一件事：<strong>模型权重之外的一切工程基础设施，决定了模型的多少能力能被真正实现。</strong></p><p>看看一些你已经熟悉的工具：</p><p><strong>Claude Code</strong> 体现了 harness 思维。它读取仓库中的 <code>CLAUDE.md</code>，能运行 shell 命令，在本地环境执行，维护会话历史，能运行测试看结果。但如果你不告诉它如何运行测试，它就无法验证自己做对了没有。</p><p><strong>Cursor</strong> 遵循类似逻辑。<code>.cursorrules</code> 文件是它的指令源，终端是它的工具，它能读取项目结构和 lint 配置。然而 Cursor 的状态管理相对较弱——关闭 IDE 再打开，之前的上下文就没了。</p><p><strong>Codex</strong> (OpenAI 的编码智能体) 使用 git worktree 隔离每个任务的运行时环境，配合本地可观测性栈（日志、指标、追踪），所以每个变更都在独立环境中验证。它在有 <code>AGENTS.md</code> 和清晰验证命令的仓库中表现 far better。</p><p><strong>AutoGPT</strong> 是反面教材。缺乏结构化状态管理导致长任务中上下文无限累积，缺乏精确反馈机制导致智能体陷入循环。许多人说 AutoGPT &quot;不行&quot;，但其实是 harness 不行。</p><h2 id="_2-3-五子系统模型" tabindex="-1">2.3 五子系统模型 <a class="header-anchor" href="#_2-3-五子系统模型" aria-label="Permalink to &quot;2.3 五子系统模型&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    AI Agent                         │</span></span>
<span class="line"><span>└───────────────┬─────────────────────────────────────┘</span></span>
<span class="line"><span>                │</span></span>
<span class="line"><span>    ┌───────────┼───────────┬───────────┬───────────┐</span></span>
<span class="line"><span>    ↓           ↓           ↓           ↓           ↓</span></span>
<span class="line"><span>┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐</span></span>
<span class="line"><span>│指令子系统│  │工具子系统│  │环境子系统│  │状态子系统│  │反馈子系统│</span></span>
<span class="line"><span>│        │  │        │  │        │  │        │  │        │</span></span>
<span class="line"><span>│AGENTS.md│  │shell   │  │deps    │  │PROGRESS│  │test    │</span></span>
<span class="line"><span>│CLAUDE.md│  │files   │  │versions│  │DECISIONS│  │lint    │</span></span>
<span class="line"><span>│rules   │  │tests   │  │docker  │  │commits │  │check   │</span></span>
<span class="line"><span>└────────┘  └────────┘  └────────┘  └────────┘  └────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_2-3-1-指令子系统-instructions" tabindex="-1">2.3.1 指令子系统 (Instructions) <a class="header-anchor" href="#_2-3-1-指令子系统-instructions" aria-label="Permalink to &quot;2.3.1 指令子系统 (Instructions)&quot;">​</a></h3><p>创建 <code>AGENTS.md</code>（或 <code>CLAUDE.md</code>），包含：项目概述与目标、技术栈与版本、首次运行命令、不可协商的硬约束、详细文档链接。</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># AGENTS.md</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 项目概述</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">用户偏好管理系统，FastAPI + PostgreSQL + Redis。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 技术栈</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Python 3.11+, FastAPI 0.100+, SQLAlchemy 2.0</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> PostgreSQL 15, Redis 7</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> pytest, mypy --strict, ruff</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 首次运行</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">\`\`\`bash</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">./init.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="硬约束" tabindex="-1">硬约束 <a class="header-anchor" href="#硬约束" aria-label="Permalink to &quot;硬约束&quot;">​</a></h2><ul><li>所有 API 端点必须经过 OAuth 2.0 认证</li><li>禁止使用旧版 SQLAlchemy 1.x 语法</li><li>新增代码必须通过 pytest 和 mypy</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### 2.3.2 工具子系统 (Tools)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>确保智能体有充足的工具访问权限。不要因为&quot;安全原因&quot;禁用 shell——如果智能体甚至不能运行 \`pip install\`，它怎么可能完成任务？但也不要开放一切——遵循最小权限原则。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 2.3.3 环境子系统 (Environment)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>让环境状态自描述。用 \`pyproject.toml\` 或 \`package.json\` 锁定依赖，用 \`.nvmrc\` 或 \`.python-version\` 指定运行时版本，用 Docker 或 devcontainers 让环境可复现。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 2.3.4 状态子系统 (State)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>长任务必须有进度跟踪。用一个简单的 \`PROGRESS.md\` 文件记录：已完成、进行中、被阻塞。每次会话结束前更新；下次会话开始时读取。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 2.3.5 反馈子系统 (Feedback)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这是 ROI 最高的子系统。在 \`AGENTS.md\` 中明确列出验证命令：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`markdown</span></span>
<span class="line"><span>## 验证命令</span></span>
<span class="line"><span>- 测试：pytest tests/ -x</span></span>
<span class="line"><span>- 类型检查：mypy src/ --strict</span></span>
<span class="line"><span>- Lint：ruff check src/</span></span>
<span class="line"><span>- 完整验证：make check（包含以上全部）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>缺少五个子系统中任何一个，harness 就不完整，智能体用起来总会感觉别扭。</p><h2 id="_2-4-量化-harness-组件价值" tabindex="-1">2.4 量化 harness 组件价值 <a class="header-anchor" href="#_2-4-量化-harness-组件价值" aria-label="Permalink to &quot;2.4 量化 harness 组件价值&quot;">​</a></h2><p>想知道哪个组件当前最有价值？用&quot;控制变量排除法&quot;：保持模型不变，逐个移除五个子系统，看哪个移除导致性能下降最大。下降最大的组件对当前任务边际贡献最高，值得优先加强。</p><p>无论到是加强还是暂缓，都要先检查失败记录和归因：任务是任务不清晰？上下文不足？环境不可复现？验证反馈缺失？还是状态管理断裂？组件消融结果只能作为辅助证据。</p><h2 id="_2-5-一个真实案例" tabindex="-1">2.5 一个真实案例 <a class="header-anchor" href="#_2-5-一个真实案例" aria-label="Permalink to &quot;2.5 一个真实案例&quot;">​</a></h2><p>一个团队用 GPT-4o 开发 TypeScript + React 前端应用（约 20,000 行代码）。经历了四个阶段，本质上是逐个添加 harness 组件：</p><p><strong>阶段一</strong>：README 只有基本项目描述。5 次运行中 1 次成功（20%）。主要失败：选错包管理器（npm vs yarn）、不遵循组件命名规范、无法运行测试。</p><p><strong>阶段二</strong>：添加 <code>AGENTS.md</code> 指定技术栈版本、命名规范、关键架构决策。成功率升至 60%。剩余失败主要来自环境问题和缺少验证。</p><p><strong>阶段三</strong>：添加 <code>init.sh</code> 标准化启动、<code>PROGRESS.md</code> 记录进度、明确验证命令。成功率升至 85%。</p><p><strong>阶段四</strong>：添加 <code>DECISIONS.md</code> 记录设计决策、git worktree 隔离任务。成功率稳定在 95%+。</p><p>他们没换模型。他们换了 harness。</p><h2 id="_2-6-本章小结" tabindex="-1">2.6 本章小结 <a class="header-anchor" href="#_2-6-本章小结" aria-label="Permalink to &quot;2.6 本章小结&quot;">​</a></h2><ul><li>Harness ≠ 提示文件；是模型权重之外的一切工程基础设施</li><li>五子系统：指令、工具、环境、状态、反馈</li><li>&quot;仓库即规范&quot;：智能体看不到的信息等于不存在</li><li><code>AGENTS.md</code> 应是目录页而非百科全书，约 100 行</li><li>约束而非微观管理：用可执行规则约束智能体，而非逐一列举指令</li><li>量化价值：逐个移除子系统，观察性能变化</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>分析一个你熟悉的工具（Claude Code / Cursor / Codex），找出它的五子系统分别对应什么。</li><li>为一个空白仓库创建最小化 harness：AGENTS.md + init.sh + 验证命令。</li><li>做对照实验：同一个任务，分别用&quot;仅有 README&quot;和&quot;完整五子系统 harness&quot;运行，记录成功率和上下文效率差异。</li></ol><p><a href="./ch03.html">下一章：仓库即记录系统与初始化</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch02.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
