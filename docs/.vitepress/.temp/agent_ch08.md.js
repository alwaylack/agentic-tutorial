import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 8 章 · 提示基本要素与指令设计","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch08.md","filePath":"agent/ch08.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch08.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "提示的五大要素不包括？",
        options: [
          "角色",
          "任务",
          "模型参数",
          "格式"
        ],
        answer: 2,
        explain: "提示的五大要素是角色、任务、上下文、约束、格式。模型参数（如 temperature）是 API 层面的设置，不属于提示本身的内容。"
      },
      {
        question: "以下哪种指令设计最清晰？",
        options: [
          "帮我写点东西",
          "写一篇 500 字的博客，介绍 Python 异步编程，面向有基础的开发者",
          "写文章",
          "关于 Python 的东西"
        ],
        answer: 1,
        explain: "选项 B 包含了主题（Python 异步编程）、长度（500 字）、受众（有基础的开发者）等具体约束，最为清晰。"
      },
      {
        question: "调试提示时，以下哪种方法效果最好？",
        options: [
          "只修改一个变量进行对照实验",
          "同时修改所有部分",
          "完全不记录改动",
          "只增加提示长度"
        ],
        answer: 0,
        explain: "科学的调试方法是控制变量法：每次只修改一个部分，记录效果，便于定位问题所在。"
      },
      {
        question: "使用分隔符的主要目的是？",
        options: [
          "让提示更好看",
          "帮助模型区分不同部分的内容",
          "增加 token 数量",
          "没有任何作用"
        ],
        answer: 1,
        explain: "分隔符（如 ###、---）帮助模型识别提示的不同部分（角色、任务、输入、要求），提高理解准确性。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-8-章-·-提示基本要素与指令设计" tabindex="-1">第 8 章 · 提示基本要素与指令设计 <a class="header-anchor" href="#第-8-章-·-提示基本要素与指令设计" aria-label="Permalink to &quot;第 8 章 · 提示基本要素与指令设计&quot;">​</a></h1><blockquote><p>本章目标：掌握提示的基本构成要素，学会设计清晰、有效的指令，理解指令设计对模型输出的影响。</p></blockquote><h2 id="_8-1-提示的五大要素" tabindex="-1">8.1 提示的五大要素 <a class="header-anchor" href="#_8-1-提示的五大要素" aria-label="Permalink to &quot;8.1 提示的五大要素&quot;">​</a></h2><p>一个完整的提示通常包含以下要素：</p><table tabindex="0"><thead><tr><th>要素</th><th>作用</th><th>示例</th></tr></thead><tbody><tr><td><strong>角色</strong></td><td>设定模型的&quot;人设&quot;</td><td>&quot;你是一个专业的 Python 工程师&quot;</td></tr><tr><td><strong>任务</strong></td><td>明确要完成什么</td><td>&quot;分析这段代码的性能瓶颈&quot;</td></tr><tr><td><strong>上下文</strong></td><td>提供背景信息</td><td>代码片段、文档链接、领域知识</td></tr><tr><td><strong>约束</strong></td><td>限制输出范围</td><td>&quot;用中文回答&quot;、&quot;不超过 200 字&quot;</td></tr><tr><td><strong>格式</strong></td><td>指定输出结构</td><td>JSON、Markdown、列表等</td></tr></tbody></table><h2 id="_8-2-指令设计原则" tabindex="-1">8.2 指令设计原则 <a class="header-anchor" href="#_8-2-指令设计原则" aria-label="Permalink to &quot;8.2 指令设计原则&quot;">​</a></h2><h3 id="_1-清晰明确" tabindex="-1">1. 清晰明确 <a class="header-anchor" href="#_1-清晰明确" aria-label="Permalink to &quot;1. 清晰明确&quot;">​</a></h3><p>避免模糊表述，使用具体、可执行的指令：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ❌ 不好的示例</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;帮我写点东西&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ✅ 好的示例</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;写一篇 500 字的技术博客，介绍 Python 异步编程的最佳实践，面向有一定基础的开发者&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_2-结构化管理" tabindex="-1">2. 结构化管理 <a class="header-anchor" href="#_2-结构化管理" aria-label="Permalink to &quot;2. 结构化管理&quot;">​</a></h3><p>使用分隔符和结构化格式：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"># 角色</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">你是一个技术文档撰写专家。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"># 任务</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">将以下技术笔记整理成规范的 API 文档。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"># 输入</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{notes}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"># 要求</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">1. 使用 Markdown 格式</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">2. 包含参数说明表格</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">3. 提供至少一个代码示例</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">4. 语言：中文</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"># 输出格式</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">## API 名称</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">## 描述</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">## 参数</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">## 示例</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&quot;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="_3-正面表述" tabindex="-1">3. 正面表述 <a class="header-anchor" href="#_3-正面表述" aria-label="Permalink to &quot;3. 正面表述&quot;">​</a></h3><p>优先使用正面指令而非否定：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ❌ 避免负面表述</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;不要使用复杂的术语&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ✅ 使用正面表述</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;使用简单易懂的语言&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_8-3-常见指令模式" tabindex="-1">8.3 常见指令模式 <a class="header-anchor" href="#_8-3-常见指令模式" aria-label="Permalink to &quot;8.3 常见指令模式&quot;">​</a></h2><h3 id="_1-角色扮演模式" tabindex="-1">1. 角色扮演模式 <a class="header-anchor" href="#_1-角色扮演模式" aria-label="Permalink to &quot;1. 角色扮演模式&quot;">​</a></h3><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">role_prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">你是一位拥有 10 年经验的系统架构师。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">请从架构角度分析以下设计的优缺点：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{design_doc}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&quot;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_2-分步推理模式" tabindex="-1">2. 分步推理模式 <a class="header-anchor" href="#_2-分步推理模式" aria-label="Permalink to &quot;2. 分步推理模式&quot;">​</a></h3><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">step_by_step </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">请逐步解决这个问题：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">1. 首先理解问题的核心</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">2. 列出已知条件和约束</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">3. 推导解决方案</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">4. 验证结果的正确性</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">问题：</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{problem}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&quot;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_3-对比分析模式" tabindex="-1">3. 对比分析模式 <a class="header-anchor" href="#_3-对比分析模式" aria-label="Permalink to &quot;3. 对比分析模式&quot;">​</a></h3><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">compare_prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">请对比以下两种方案：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">- 方案 A：</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{option_a}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">- 方案 B：</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{option_b}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">从成本、性能、可维护性三个维度进行分析，给出推荐。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&quot;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_8-4-调试提示的技巧" tabindex="-1">8.4 调试提示的技巧 <a class="header-anchor" href="#_8-4-调试提示的技巧" aria-label="Permalink to &quot;8.4 调试提示的技巧&quot;">​</a></h2><p>当模型输出不理想时，尝试以下方法：</p><ol><li><strong>添加更多上下文</strong>：提供更详细的背景信息</li><li><strong>调整约束条件</strong>：收紧或放宽限制</li><li><strong>改变表述方式</strong>：换一种说法可能效果更好</li><li><strong>使用示例</strong>：few-shot 示例能有效引导模型</li><li><strong>分解任务</strong>：将复杂任务拆分为子步骤</li></ol><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>提示包含角色、任务、上下文、约束、格式五大要素</li><li>指令设计要清晰、结构化、使用正面表述</li><li>掌握角色扮演、分步推理、对比分析等常用模式</li><li>调试时从上下文、约束、表述、示例、分解五个角度尝试</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>设计一个&quot;代码审查助手&quot;的完整提示，包含所有五大要素，并测试不同表述的效果差异。</li><li>将同一个任务分别用&quot;直接询问&quot;和&quot;分步推理&quot;两种方式提示，对比输出质量。</li><li>实现一个提示调试工具：记录不同参数组合的输出，自动生成改进建议。</li></ol><p><a href="./ch09.html">下一章：Zero-shot 与 Few-shot</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch08.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
