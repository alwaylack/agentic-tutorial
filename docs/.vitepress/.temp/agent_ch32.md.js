import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
const __pageData = JSON.parse('{"title":"第 32 章 · 课程总结与学习路线","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch32.md","filePath":"agent/ch32.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch32.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-32-章-·-课程总结与学习路线" tabindex="-1">第 32 章 · 课程总结与学习路线 <a class="header-anchor" href="#第-32-章-·-课程总结与学习路线" aria-label="Permalink to &quot;第 32 章 · 课程总结与学习路线&quot;">​</a></h1><blockquote><p>本章目标：串联本课程六大模块，绘制能力雷达图，明确后续学习路径（Agno / CrewAI / Pi 课程衔接），解答常见问题。</p></blockquote><h2 id="_32-1-六大模块串联" tabindex="-1">32.1 六大模块串联 <a class="header-anchor" href="#_32-1-六大模块串联" aria-label="Permalink to &quot;32.1 六大模块串联&quot;">​</a></h2><p>本课程围绕<strong>构建可靠 AI 编码助手</strong>这一目标，覆盖了六个相互支撑的模块：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Agent 工程基础                            │</span></span>
<span class="line"><span>├──────────┬──────────┬──────────┬──────────┬──────────┬───────┤</span></span>
<span class="line"><span>│  Prompt  │ Harness  │   MCP    │  Skills  │   Loop   │AGENTS │</span></span>
<span class="line"><span>│  工程    │  工程    │  协议    │  标准    │ Engineering│.md   │</span></span>
<span class="line"><span>│  01-09   │  10-15   │  16-21   │  22-25   │  26-29   │30-31  │</span></span>
<span class="line"><span>└──────────┴──────────┴──────────┴──────────┴──────────┴───────┘</span></span>
<span class="line"><span>     ↓            ↓           ↓          ↓          ↓         ↓</span></span>
<span class="line"><span>  写对提示    搭建环境    连接工具    封装能力    自动运行   项目说明</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="各模块核心收获" tabindex="-1">各模块核心收获 <a class="header-anchor" href="#各模块核心收获" aria-label="Permalink to &quot;各模块核心收获&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模块</th><th>核心问题</th><th>关键产出</th></tr></thead><tbody><tr><td><strong>Prompt 工程</strong></td><td>如何让模型理解并执行任务？</td><td>结构化提示、CoT、ReAct、RAG</td></tr><tr><td><strong>Harness 工程</strong></td><td>为什么强模型仍会失败？</td><td>五子系统模型、诊断循环</td></tr><tr><td><strong>MCP 协议</strong></td><td>如何让 agent 安全地使用外部工具？</td><td>Tools/Resources/Prompts 原语、传输层</td></tr><tr><td><strong>Agent Skills</strong></td><td>如何封装可复用的任务能力？</td><td>SKILL.md、渐进披露</td></tr><tr><td><strong>Loop Engineering</strong></td><td>如何从单次提示升级到自动循环？</td><td>五大积木、Loop Ready Score</td></tr><tr><td><strong>AGENTS.md</strong></td><td>如何给项目编写 agent 说明书？</td><td>标准化说明文件、嵌套优先级</td></tr></tbody></table><h2 id="_32-2-能力雷达图" tabindex="-1">32.2 能力雷达图 <a class="header-anchor" href="#_32-2-能力雷达图" aria-label="Permalink to &quot;32.2 能力雷达图&quot;">​</a></h2><p>完成本课程后，你应该能在以下维度自评：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                    Prompt 设计 ────────● 80%</span></span>
<span class="line"><span>                        /   \\</span></span>
<span class="line"><span>                       /     \\</span></span>
<span class="line"><span>             Harness 设计      MCP 集成 ────● 70%</span></span>
<span class="line"><span>                   |             |</span></span>
<span class="line"><span>                   |             |</span></span>
<span class="line"><span>             Skills 封装 ───● 75%</span></span>
<span class="line"><span>                   |             \\</span></span>
<span class="line"><span>                   |              \\</span></span>
<span class="line"><span>             Loop 设计 ──────────● 65%</span></span>
<span class="line"><span>                    \\              /</span></span>
<span class="line"><span>                     \\            /</span></span>
<span class="line"><span>                   AGENTS.md ────● 70%</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul><li>● 80%+：能独立设计复杂提示、诊断 harness 缺陷</li><li>● 70%+：能实现 MCP server、编写高质量技能、设计基础循环</li><li>● 60%+：理解原理，能在指导下完成实践</li></ul><h2 id="_32-3-后续学习路线" tabindex="-1">32.3 后续学习路线 <a class="header-anchor" href="#_32-3-后续学习路线" aria-label="Permalink to &quot;32.3 后续学习路线&quot;">​</a></h2><p>本课程是「原理与协议层」，建议按以下路径继续深入：</p><h3 id="路径-a-框架实战" tabindex="-1">路径 A：框架实战 <a class="header-anchor" href="#路径-a-框架实战" aria-label="Permalink to &quot;路径 A：框架实战&quot;">​</a></h3><p>学完本课后，进入框架课程将理论落地：</p><table tabindex="0"><thead><tr><th>课程</th><th>重点</th><th>与前序知识的衔接</th></tr></thead><tbody><tr><td><a href="/agno/">Agno</a></td><td>单 agent + team + workflow</td><td>MCP 工具、Skills 封装、Loop 编排</td></tr><tr><td><a href="/crewai/">CrewAI</a></td><td>多 agent 协作</td><td>Skills 自动触发、MCP 集成、循环模式</td></tr><tr><td><a href="/pi/">Pi</a></td><td>终端编码智能体定制</td><td>AGENTS.md、Skills、Hooks</td></tr></tbody></table><h3 id="路径-b-测试与验证" tabindex="-1">路径 B：测试与验证 <a class="header-anchor" href="#路径-b-测试与验证" aria-label="Permalink to &quot;路径 B：测试与验证&quot;">​</a></h3><p>配合测试课程强化可靠性：</p><table tabindex="0"><thead><tr><th>课程</th><th>重点</th></tr></thead><tbody><tr><td><a href="/pytest/">pytest</a></td><td>单元测试、fixture、插件开发</td></tr><tr><td><a href="/playwright/">Playwright</a></td><td>E2E 测试、网络 Mock、认证复用</td></tr></tbody></table><h3 id="路径-c-web-服务" tabindex="-1">路径 C：Web 服务 <a class="header-anchor" href="#路径-c-web-服务" aria-label="Permalink to &quot;路径 C：Web 服务&quot;">​</a></h3><p>构建 agent 的后端支撑：</p><table tabindex="0"><thead><tr><th>课程</th><th>重点</th></tr></thead><tbody><tr><td><a href="/fastapi/">FastAPI</a></td><td>API 开发、安全认证、数据库集成</td></tr></tbody></table><h2 id="_32-4-常见问题-faq" tabindex="-1">32.4 常见问题 FAQ <a class="header-anchor" href="#_32-4-常见问题-faq" aria-label="Permalink to &quot;32.4 常见问题 FAQ&quot;">​</a></h2><p><strong>Q：我学完了，接下来该用哪个框架？</strong> A：看目标：</p><ul><li>快速原型 → Pi</li><li>多 agent 协作 → CrewAI</li><li>深度定制 + 生产部署 → Agno</li></ul><p><strong>Q：Prompt 工程和 Harness 工程有什么区别？</strong> A：Prompt 解决&quot;怎么说&quot;，Harness 解决&quot;在哪说、怎么说、怎么验&quot;。前者是后者的子集。</p><p><strong>Q：MCP 和 Skills 有什么关系？</strong> A：MCP 提供通用工具能力（搜索、数据库），Skills 封装特定任务工作流。两者可叠加使用。</p><p><strong>Q：Loop Engineering 适合所有项目吗？</strong> A：不适合绿野项目（从零开始）。它最适合已有代码库的持续维护场景。</p><p><strong>Q：学完本课程能直接上生产吗？</strong> A：建议配合 <a href="/playwright/">Playwright</a> 和 <a href="/fastapi/">FastAPI</a> 课程，补足测试与后端能力后再部署。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>六大模块覆盖了从提示设计到自动循环的完整链路；</li><li>能力雷达图帮助你定位当前水平与提升方向；</li><li>后续可进入框架课程（Agno/CrewAI/Pi）或测试课程（pytest/Playwright）深化；</li><li>牢记核心原则：<strong>失败时先查 harness，再换模型</strong>。</li></ul><p><a href="./index.html">返回课程导学</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch32.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
