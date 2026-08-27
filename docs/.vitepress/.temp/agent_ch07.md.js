import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 7 章 · 大模型与提示工程概述","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch07.md","filePath":"agent/ch07.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch07.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "CoT 对以下哪类任务效果最显著？",
        options: [
          "简单的情感分类",
          "多步算术推理与逻辑推导",
          "诗歌创作",
          "快速问答"
        ],
        answer: 1,
        explain: "CoT 的核心优势在于展示中间推理步骤，这对需要多步计算的复杂任务（如算术、逻辑）效果显著，而对简单分类或创意写作帮助有限。"
      },
      {
        question: `"Let's think step by step" 属于哪种 CoT 类型？`,
        options: [
          "Manual Few-shot CoT",
          "Zero-shot CoT",
          "Auto-CoT",
          "Meta-prompting"
        ],
        answer: 1,
        explain: `"Let's think step by step" 是 Zero-shot CoT 的标志性触发词，无需提供任何示例即可激活模型的链式推理能力。`
      },
      {
        question: "Auto-CoT 的第一步是什么？",
        options: [
          "直接生成所有问题的答案",
          "对问题进行聚类并采样代表问题",
          "手动编写每个问题的推理链",
          "训练一个新的推理模型"
        ],
        answer: 1,
        explain: "Auto-CoT 的流程是：先对问题进行聚类，再从每个簇中采样代表性问题，最后用 Zero-shot CoT 为这些代表问题生成推理链。"
      },
      {
        question: "以下哪个模型最适合使用 CoT？",
        options: [
          "1B 参数的微型模型",
          "任意大小的模型都同等有效",
          "22B 以上的较大模型",
          "只有 GPT-4 才能使用 CoT"
        ],
        answer: 2,
        explain: "研究表明，CoT 的效果与模型规模正相关，22B 以上的模型能更好地利用推理步骤，而小模型可能无法正确遵循 CoT 模式。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-7-章-·-大模型与提示工程概述" tabindex="-1">第 7 章 · 大模型与提示工程概述 <a class="header-anchor" href="#第-7-章-·-大模型与提示工程概述" aria-label="Permalink to &quot;第 7 章 · 大模型与提示工程概述&quot;">​</a></h1><blockquote><p>本章目标：理解思维链（CoT）的核心原理，掌握 Manual CoT、Few-shot CoT 和 Zero-shot CoT 的使用方法，并了解何时使用 CoT 能获得最佳效果。</p></blockquote><h2 id="_7-1-什么是思维链" tabindex="-1">7.1 什么是思维链 <a class="header-anchor" href="#_7-1-什么是思维链" aria-label="Permalink to &quot;7.1 什么是思维链&quot;">​</a></h2><p>思维链（Chain-of-Thought，简称 CoT）是一种提示工程技术，通过在问题与答案之间添加<strong>推理步骤</strong>，引导模型逐步思考，从而提升复杂任务的表现。</p><p>传统提示往往是直接给出问题和答案：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：小明有5个苹果，吃了2个，又买了3个，现在有几个？</span></span>
<span class="line"><span>答案：6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>而思维链会展示中间推理过程：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：小明有5个苹果，吃了2个，又买了3个，现在有几个？</span></span>
<span class="line"><span>思考：</span></span>
<span class="line"><span>- 开始有5个苹果</span></span>
<span class="line"><span>- 吃了2个，剩下 5 - 2 = 3 个</span></span>
<span class="line"><span>- 又买了3个，现在有 3 + 3 = 6 个</span></span>
<span class="line"><span>答案：6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Google 团队在 2022 年的论文中首次系统性地展示了 CoT 的力量：对于算术、常识推理和符号推理等需要多步计算的<strong>复杂任务</strong>，CoT 能够带来显著的性能提升。</p><h2 id="_7-2-manual-few-shot-cot" tabindex="-1">7.2 Manual Few-shot CoT <a class="header-anchor" href="#_7-2-manual-few-shot-cot" aria-label="Permalink to &quot;7.2 Manual Few-shot CoT&quot;">​</a></h2><p>最简单有效的方式是手动编写几个包含推理步骤的示例（few-shot），让模型模仿这种&quot;展示思考过程&quot;的风格。</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Q: The cafeteria had 23 apples. If they used 20 to make lunch and bought 6 more, how many apples do they have?</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">A: They started with 23 apples, used 20 for lunch (23 - 20 = 3), then bought 6 more (3 + 6 = 9). The answer is 9.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Q: A retail store marks up a price of $80 by 50%. Then they offer a 20</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">% d</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">iscount. What is the final price?</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">A: Original price $80. Markup by 50%: $80 * 1.5 = $120. Discount of 20%: $120 * 0.8 = $96. The answer is $96.</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Q: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{question}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">A:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&quot;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>关键点：</p><ul><li><strong>示例要具体</strong>：每个示例都展示清晰的推理链条</li><li><strong>保持多样性</strong>：示例覆盖不同类型的推理（算术、逻辑、常识）</li><li><strong>格式一致</strong>：使用固定的&quot;思考：&quot;前缀帮助模型理解模式</li></ul><h2 id="_7-3-zero-shot-cot" tabindex="-1">7.3 Zero-shot CoT <a class="header-anchor" href="#_7-3-zero-shot-cot" aria-label="Permalink to &quot;7.3 Zero-shot CoT&quot;">​</a></h2><p>当没有足够示例时，可以使用 Zero-shot CoT。核心技巧是在问题后加上一个<strong>触发短语</strong>，如：</p><blockquote><p>&quot;Let&#39;s think step by step.&quot;</p></blockquote><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 传统 prompt（容易出错）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;I went to the market and bought 10 apples. I gave 2 apples to my neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Zero-shot CoT</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;&quot;&quot;I went to the market and bought 10 apples. I gave 2 apples to my neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Let&#39;s think step by step.&quot;&quot;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>研究表明，简单的 &quot;Let&#39;s think step by step&quot; 足以触发模型的链式推理能力，尤其是在较大的模型上（如 GPT-3.5+）。</p><h2 id="_7-4-auto-cot-自动生成思维链" tabindex="-1">7.4 Auto-CoT：自动生成思维链 <a class="header-anchor" href="#_7-4-auto-cot-自动生成思维链" aria-label="Permalink to &quot;7.4 Auto-CoT：自动生成思维链&quot;">​</a></h2><p>对于大规模应用场景，手动编写示例成本较高。Auto-CoT 提出了自动化方法：</p><ol><li><strong>问题聚类</strong>：将问题数据集分成若干簇</li><li><strong>代表性采样</strong>：从每个簇中选取代表性问题</li><li><strong>自动推理链生成</strong>：用 Zero-shot CoT 为每个代表问题生成推理过程</li><li><strong>构建示例集</strong>：将生成的推理链作为 few-shot 示例</li></ol><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Auto-CoT 示例生成流程</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">def</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> auto_cot_example</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(question):</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    base_prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> f</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">question</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">}\\n</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Let&#39;s think step by step.&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    response </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> llm.complete(base_prompt)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">    # 提取推理链部分</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    return</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> extract_chain_of_thought(response)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这种方法特别适用于需要大量示例的场景，如 benchmark 评估或生产系统中的 prompt 优化。</p><h2 id="_7-5-cot-的适用场景与限制" tabindex="-1">7.5 CoT 的适用场景与限制 <a class="header-anchor" href="#_7-5-cot-的适用场景与限制" aria-label="Permalink to &quot;7.5 CoT 的适用场景与限制&quot;">​</a></h2><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>数学计算与算术推理</li><li>多步逻辑推导</li><li>需要中间状态的规划任务</li><li>事实性知识查询（减少幻觉）</li></ul><h3 id="不适用场景" tabindex="-1">不适用场景 <a class="header-anchor" href="#不适用场景" aria-label="Permalink to &quot;不适用场景&quot;">​</a></h3><ul><li>简单分类任务（如情感分析）</li><li>创意写作（可能限制发散思维）</li><li>实时对话（增加延迟）</li><li>小规模模型（能力不足时反而有害）</li></ul><h3 id="实践建议" tabindex="-1">实践建议 <a class="header-anchor" href="#实践建议" aria-label="Permalink to &quot;实践建议&quot;">​</a></h3><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 判断是否需要 CoT 的决策树</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">def</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> should_use_cot</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(task_type, model_size):</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    if</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> task_type </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;math&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;logic&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;multi_step&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">        return</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> model_size </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 10</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  # 至少 10B 参数</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    elif</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> task_type </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;classification&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;summary&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">        return</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> False</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    return</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> model_size </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 70</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  # 大模型才值得尝试</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li><strong>CoT 核心思想</strong>：通过展示推理步骤引导模型逐步思考</li><li><strong>Manual CoT</strong>：手写包含思考过程的 few-shot 示例</li><li><strong>Zero-shot CoT</strong>：添加 &quot;Let&#39;s think step by step&quot; 触发词</li><li><strong>Auto-CoT</strong>：自动生成推理链用于大规模场景</li><li><strong>适用性</strong>：复杂推理任务效果好，简单任务可能适得其反</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>创建一个 Manual Few-shot CoT prompt，用 3 个示例解决数学应用题，测试不同模型的效果差异。</li><li>对比 Zero-shot CoT（添加 &quot;Let&#39;s think step by step&quot;）与传统 prompt 在同一个复杂问题上的表现。</li><li>尝试实现一个简单的 Auto-CoT 流程：为 5 个问题自动生成推理链并构建 few-shot 示例集。</li></ol><p><a href="./ch08.html">下一章：提示基本要素与指令设计</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch07.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
