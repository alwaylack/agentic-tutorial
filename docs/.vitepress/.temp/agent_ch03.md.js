import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 3 章 · 仓库即记录系统与初始化","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch03.md","filePath":"agent/ch03.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch03.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: '"新会话测试"的目的是什么？',
        options: [
          "测试智能体的速度",
          "验证仓库地图是否足够让新会话无需人类帮助即可开始工作",
          "测试 CI/CD 流程",
          "评估模型性能"
        ],
        answer: 1,
        explain: "新会话测试是检验知识库完整性的方法：新智能体仅凭仓库内容应能回答系统是什么、如何运行、如何验证、当前进度等五个基本问题。"
      },
      {
        question: "AGENTS.md 的理想定位是？",
        options: [
          "项目完整技术文档",
          "目录页，指引智能体到详细文档",
          "代码注释的替代品",
          "等同于 README"
        ],
        answer: 1,
        explain: "AGENTS.md 应是目录页而非百科全书，约 100 行，告诉智能体项目是什么、技术栈、首次运行命令、硬约束，以及详细文档的位置。"
      },
      {
        question: "init.sh 中 set -euo pipefail 的作用是什么？",
        options: [
          "加速脚本执行",
          "任何错误立即中止，防止在错误基础上堆叠",
          "输出彩色日志",
          "并行执行多个任务"
        ],
        answer: 1,
        explain: "set -euo pipefail 确保脚本在任何错误时立即中止（-e），未定义变量报错（-u），管道中任何命令失败则整体失败（-o pipefail）。这确保基线验证失败时立即停止，而不是在破损基础上继续。"
      },
      {
        question: "邻近性原则在 harness 工程中的含义是？",
        options: [
          "文档应该放在项目根目录",
          "关键信息应放在智能体最需要它的地方附近",
          "代码应该靠近文档",
          "所有文档应合并为一个文件"
        ],
        answer: 1,
        explain: "邻近性比长度更重要：放在 src/api/ 的 50 行 ARCHITECTURE.md 比 Confluence 里 500 页文档有用，因为信息在智能体需要它的瞬间就在手边。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-3-章-·-仓库即记录系统与初始化" tabindex="-1">第 3 章 · 仓库即记录系统与初始化 <a class="header-anchor" href="#第-3-章-·-仓库即记录系统与初始化" aria-label="Permalink to &quot;第 3 章 · 仓库即记录系统与初始化&quot;">​</a></h1><blockquote><p>本章目标：理解为什么仓库必须是单一事实来源，掌握 AGENTS.md 的正确定位，学会设计 init.sh 启动脚本。</p></blockquote><h2 id="_3-1-知识可见性缺口" tabindex="-1">3.1 知识可见性缺口 <a class="header-anchor" href="#_3-1-知识可见性缺口" aria-label="Permalink to &quot;3.1 知识可见性缺口&quot;">​</a></h2><p>你们团队的架构决策分散在 Confluence、Slack、Jira 和几位 senior 工程师的头脑中。对人类来说这勉强能工作——你可以问同事、搜索聊天记录、翻文档，实在不行还能在茶水间堵住人。但对 AI 智能体来说，<strong>不在仓库里的信息等于不存在</strong>。</p><p>这不是夸张。智能体只有三个输入源：系统提示和任务描述、仓库中的文件内容、工具执行输出。你的 Slack 历史、Jira 工单、Confluence 页面、周五下午和同事敲定的架构决策——智能体都看不到。它不能&quot;去问问别人&quot;或&quot;搜索聊天记录&quot;。它的整个世界就是仓库本身。</p><p>所以真正的问题是：你要给它一张足够好的地图吗？</p><h2 id="_3-2-地图上应该有什么" tabindex="-1">3.2 地图上应该有什么 <a class="header-anchor" href="#_3-2-地图上应该有什么" aria-label="Permalink to &quot;3.2 地图上应该有什么&quot;">​</a></h2><p>OpenAI 在 harness 工程文章中直言：<strong>不在仓库里的信息，对智能体来说不存在。</strong> 他们称之为&quot;仓库即规范&quot;原则——仓库本身是最权威的规格文档。</p><p>Anthropic 的长运行智能体文档呼应类似观点：持久化状态是长任务连续性的必要条件，跨会话知识可恢复性直接决定任务成功率。而且这种状态必须存在于仓库中——因为那是智能体唯一稳定、可靠访问的存储。</p><p>你可能觉得：&quot;我们团队小，知识都在每个人脑子里，这样也挺好。&quot;没错——对人类而言。但如果你想用智能体，必须接受一个事实：<strong>智能体不能问人。</strong> 它需要知道的一切必须写下来，放在它能找到的地方。</p><p>这不是&quot;多写文档&quot;的问题——是&quot;把决策信息放在正确位置&quot;的问题。一份放在 <code>src/api/</code> 目录下的 50 行 <code>ARCHITECTURE.md</code>，比 Confluence 里 500 页无人维护的设计文档有用得多。** proximity（邻近性）比长度更重要**，因为信息只有在你需要它的瞬间就在手边，才是真正有用的。</p><h2 id="_3-3-知识可见性测试" tabindex="-1">3.3 知识可见性测试 <a class="header-anchor" href="#_3-3-知识可见性测试" aria-label="Permalink to &quot;3.3 知识可见性测试&quot;">​</a></h2><p>怎么测试你的地图够不够好？做一个&quot;新会话测试&quot;：打开一个全新智能体会话，只给它仓库内容，看它能否回答五个基本问题：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Q1: 这是什么系统？     → AGENTS.md / README</span></span>
<span class="line"><span>Q2: 结构如何组织？     → ARCHITECTURE.md / module docs</span></span>
<span class="line"><span>Q3: 怎么运行？         → Makefile / init.sh / package scripts</span></span>
<span class="line"><span>Q4: 怎么验证？         → Test, lint, check commands</span></span>
<span class="line"><span>Q5: 现在进行到哪？     → PROGRESS.md / feature list / git history</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果都能答 → 新会话可以直接开始工作，无需问人</span></span>
<span class="line"><span>如果答不出 → 地图有空白，智能体必须猜</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>地图空白的地方，智能体只能猜——错误猜测变成 bug，过度猜测浪费上下文。而且每个新会话都要重新猜一遍。猜错的代价总是远高于一开始就把地图画好。</p><h2 id="_3-4-agents-md-的正确定位" tabindex="-1">3.4 AGENTS.md 的正确定位 <a class="header-anchor" href="#_3-4-agents-md-的正确定位" aria-label="Permalink to &quot;3.4 AGENTS.md 的正确定位&quot;">​</a></h2><p><code>AGENTS.md</code> 不是百科全书，是目录页。它应该告诉智能体：</p><ol><li><strong>项目是什么</strong>（一两句话）</li><li><strong>技术栈和版本</strong>（Python 3.11, FastAPI 0.100, ...)</li><li><strong>首次运行命令</strong>（<code>./init.sh</code>）</li><li><strong>不可协商的硬约束</strong>（禁止事项、必须遵循的规范）</li><li><strong>详细文档在哪</strong>（指向 <code>docs/</code> 或 <code>ARCHITECTURE.md</code>）</li></ol><p>示例：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># AGENTS.md</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 项目</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">用户偏好管理系统，FastAPI + PostgreSQL + Redis，~15K 行代码。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 技术栈</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Python 3.11+, FastAPI 0.100+, SQLAlchemy 2.0 (async)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> PostgreSQL 15, Redis 7</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> pytest, mypy --strict, ruff</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 首次运行</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">\`\`\`bash</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">./init.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="硬约束" tabindex="-1">硬约束 <a class="header-anchor" href="#硬约束" aria-label="Permalink to &quot;硬约束&quot;">​</a></h2><ul><li>所有 API 端点必须经过 OAuth 2.0 认证</li><li>禁止使用 SQLAlchemy 1.x 语法</li><li>新增代码必须通过 pytest 和 mypy</li><li>禁止直接修改生产数据库，必须先写 migration</li></ul><h2 id="详细文档" tabindex="-1">详细文档 <a class="header-anchor" href="#详细文档" aria-label="Permalink to &quot;详细文档&quot;">​</a></h2><ul><li>架构: docs/ARCHITECTURE.md</li><li>API 规范: docs/API.md</li><li>部署: docs/DEPLOYMENT.md</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>## 3.5 init.sh：标准化启动流程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`init.sh\` 是让智能体&quot;打卡上班&quot;的标准流程：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>#!/usr/bin/env bash</span></span>
<span class="line"><span>set -euo pipefail</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ROOT_DIR=&quot;$(cd &quot;$(dirname &quot;\${BASH_SOURCE[0]}&quot;)&quot; &amp;&amp; pwd)&quot;</span></span>
<span class="line"><span>cd &quot;$ROOT_DIR&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;==&gt; 工作目录: $PWD&quot;</span></span>
<span class="line"><span>echo &quot;==&gt; 同步依赖...&quot;</span></span>
<span class="line"><span>pip install -e &quot;.[dev]&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;==&gt; 基线验证...&quot;</span></span>
<span class="line"><span>pytest tests/ -x --tb=short</span></span>
<span class="line"><span>mypy src/ --strict</span></span>
<span class="line"><span>ruff check src/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;==&gt; 启动命令&quot;</span></span>
<span class="line"><span>printf &#39;    %q\\n&#39; &quot;uvicorn src.main:app --reload&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ &quot;\${RUN_START_COMMAND:-0}&quot; = &quot;1&quot; ]; then</span></span>
<span class="line"><span>    exec &quot;\${START_CMD[@]}&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;设置 RUN_START_COMMAND=1 以直接启动应用。&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>关键设计：</p><ul><li><code>set -euo pipefail</code>：任何错误立即中止</li><li>基线验证：确保仓库处于可工作状态</li><li>可选启动：默认不启动服务，让智能体决定是否启动</li></ul><h2 id="_3-6-初始化阶段的价值" tabindex="-1">3.6 初始化阶段的价值 <a class="header-anchor" href="#_3-6-初始化阶段的价值" aria-label="Permalink to &quot;3.6 初始化阶段的价值&quot;">​</a></h2><p>为什么初始化需要独立阶段？因为：</p><ol><li><strong>环境一致性</strong>：确保所有智能体会话从相同基线开始</li><li><strong>快速失败</strong>：如果基线验证失败，立即修复而不是在错误基础上堆叠新功能</li><li><strong>上下文节省</strong>：智能体不需要每次重新探索环境配置</li></ol><p>OpenAI 的实验证明：五个工程师五个月后用 Codex 从空仓库构建出约 100 万行代码。早期进展缓慢——Codex 不是不够好，只是缺少足够的工具和结构来驱动高层目标。他们逐渐找到模式：把大目标拆成小模块——设计、编码、审查、测试——让智能体一个个组装，然后用这些模块组合更复杂的任务。</p><h2 id="_3-7-本章小结" tabindex="-1">3.7 本章小结 <a class="header-anchor" href="#_3-7-本章小结" aria-label="Permalink to &quot;3.7 本章小结&quot;">​</a></h2><ul><li>仓库是智能体的唯一可靠信息源；不在仓库里的信息等于不存在</li><li>做&quot;新会话测试&quot;：新智能体能否不靠人类回答五个基本问题</li><li>AGENTS.md 是目录页不是百科全书，约 100 行</li><li>init.sh 标准化启动流程，确保环境一致性和快速失败</li><li>邻近性比长度重要：50 行近在手边的文档 &gt; 500 页远程文档</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>找一个开源项目，运行&quot;新会话测试&quot;：让一个全新智能体会话只读仓库，看它能否回答 Q1-Q5。</li><li>为一个新项目创建 AGENTS.md + init.sh 组合，确保新会话无需询问人类即可开始工作。</li><li>测试邻近性原则：把关键决策放在靠近代码的位置（如 <code>src/api/ARCHITECTURE.md</code>），对比放在项目根目录的效果。</li></ol><p><a href="./ch04.html">下一章：长任务连续性管理</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch03.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
