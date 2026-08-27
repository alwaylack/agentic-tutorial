import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 12 章 · ReAct：推理与行动协同","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch12.md","filePath":"agent/ch12.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch12.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "ReAct 框架的两个核心组成部分是什么？",
        options: [
          "Input 和 Output",
          "Reasoning 和 Acting",
          "Training 和 Testing",
          "Prompt 和 Completion"
        ],
        answer: 1,
        explain: "ReAct = Reasoning + Acting，结合了链式思考（推理）和工具使用（行动）两种能力。"
      },
      {
        question: "ReAct 循环的正确顺序是？",
        options: [
          "Action → Thought → Observation",
          "Thought → Action → Observation",
          "Observation → Thought → Action",
          "Thought → Observation → Action"
        ],
        answer: 1,
        explain: "ReAct 循环从 Thought 开始（模型思考下一步），然后执行 Action（调用工具），最后获得 Observation（工具返回结果），再回到 Thought。"
      },
      {
        question: "LangChain 中 ReAct Agent 的关键配置参数是？",
        options: [
          'agent="random"',
          'agent="zero-shot-react-description"',
          'agent="chat"',
          'agent="completion"'
        ],
        answer: 1,
        explain: 'LangChain 使用 agent="zero-shot-react-description" 来启用 ReAct 模式，它会加载预定义的 ReAct 提示模板。'
      },
      {
        question: "ReAct 相比纯 CoT 的主要优势是？",
        options: [
          "速度更快",
          "可以使用外部工具获取信息",
          "成本更低",
          "实现更简单"
        ],
        answer: 1,
        explain: "ReAct 允许模型在推理过程中调用工具（如搜索、计算器）获取外部信息，而 CoT 只依赖模型内部知识。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-12-章-·-react-推理与行动协同" tabindex="-1">第 12 章 · ReAct：推理与行动协同 <a class="header-anchor" href="#第-12-章-·-react-推理与行动协同" aria-label="Permalink to &quot;第 12 章 · ReAct：推理与行动协同&quot;">​</a></h1><blockquote><p>本章目标：理解 ReAct 框架的核心思想——推理与行动的交替循环，掌握 Thought-Action-Observation 结构，并学会使用 LangChain 实现 ReAct Agent。</p></blockquote><h2 id="_12-1-什么是-react" tabindex="-1">12.1 什么是 ReAct <a class="header-anchor" href="#_12-1-什么是-react" aria-label="Permalink to &quot;12.1 什么是 ReAct&quot;">​</a></h2><p>ReAct（Reasoning + Acting）是由 Yao et al. (2022) 提出的框架，核心创新是<strong>让语言模型同时完成推理和行动两个任务</strong>，并通过&quot;思考-行动-观察&quot;循环迭代求解复杂问题。</p><p>传统方法要么只推理（CoT），要么只行动（Act），而 ReAct 结合了两者的优势：</p><ul><li><strong>推理</strong>：模型可以解释为什么选择某个动作</li><li><strong>行动</strong>：模型可以通过工具获取额外信息</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ReAct 循环：</span></span>
<span class="line"><span>Thought → Action → Observation → Thought → Action → ... → Final Answer</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_12-2-react-的结构化格式" tabindex="-1">12.2 ReAct 的结构化格式 <a class="header-anchor" href="#_12-2-react-的结构化格式" aria-label="Permalink to &quot;12.2 ReAct 的结构化格式&quot;">​</a></h2><p>ReAct 使用三个关键元素构建推理轨迹：</p><h3 id="_1-thought-思考" tabindex="-1">1. Thought（思考） <a class="header-anchor" href="#_1-thought-思考" aria-label="Permalink to &quot;1. Thought（思考）&quot;">​</a></h3><p>模型的内部推理，解释当前需要什么信息、为什么选择某个动作。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Thought: I need to find out the population of Paris to compare it with London.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-action-行动" tabindex="-1">2. Action（行动） <a class="header-anchor" href="#_2-action-行动" aria-label="Permalink to &quot;2. Action（行动）&quot;">​</a></h3><p>调用工具的指令，格式为 <code>Action: &lt;工具名&gt;\\nAction Input: &lt;输入&gt;</code></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Action: Search</span></span>
<span class="line"><span>Action Input: &quot;population of Paris&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_3-observation-观察" tabindex="-1">3. Observation（观察） <a class="header-anchor" href="#_3-observation-观察" aria-label="Permalink to &quot;3. Observation（观察）&quot;">​</a></h3><p>工具执行的返回结果</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Observation: 2,161,000 (as of 2019)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="完整示例" tabindex="-1">完整示例 <a class="header-anchor" href="#完整示例" aria-label="Permalink to &quot;完整示例&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Question: What is the elevation range for the area that the eastern sector of the Colorado orogeny extends into?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thought 1: I need to search Colorado orogeny, find the area that the eastern sector extends into, then find the elevation range.</span></span>
<span class="line"><span>Action 1: Search[Colorado orogeny]</span></span>
<span class="line"><span>Observation 1: The Colorado orogeny was an episode of mountain building in Colorado and surrounding areas.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thought 2: It doesn&#39;t mention the eastern sector. I need to look up eastern sector.</span></span>
<span class="line"><span>Action 2: Lookup[eastern sector]</span></span>
<span class="line"><span>Observation 2: The eastern sector extends into the High Plains and is called the Central Plains orogeny.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thought 3: I need to search High Plains and find its elevation range.</span></span>
<span class="line"><span>Action 3: Search[High Plains elevation]</span></span>
<span class="line"><span>Observation 3: The High Plains rise from around 1,800 to 7,000 ft.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thought 4: I now have the elevation range.</span></span>
<span class="line"><span>Action 4: Finish[1,800 to 7,000 ft]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="_12-3-使用-langchain-实现-react" tabindex="-1">12.3 使用 LangChain 实现 ReAct <a class="header-anchor" href="#_12-3-使用-langchain-实现-react" aria-label="Permalink to &quot;12.3 使用 LangChain 实现 ReAct&quot;">​</a></h2><p>LangChain 提供了内置的 ReAct agent 实现：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> langchain.agents </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> load_tools, initialize_agent</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> langchain.llms </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> OpenAI</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> os</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 配置 LLM 和工具</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">llm </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> OpenAI(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">model_name</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;gpt-3.5-turbo-instruct&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">temperature</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">tools </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> load_tools([</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;google-serper&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;llm-math&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">], </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">llm</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">llm)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 初始化 ReAct Agent</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">agent </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> initialize_agent(</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    tools,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    llm,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    agent</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;zero-shot-react-description&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    verbose</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">True</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 执行复杂查询</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">result </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> agent.run(</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;Who is Olivia Wilde&#39;s boyfriend? What is his current age raised to the 0.23 power?&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>输出示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; Entering new AgentExecutor chain...</span></span>
<span class="line"><span>I need to find out who Olivia Wilde&#39;s boyfriend is and then calculate his age raised to the 0.23 power.</span></span>
<span class="line"><span>Action: Search</span></span>
<span class="line"><span>Action Input: &quot;Olivia Wilde boyfriend&quot;</span></span>
<span class="line"><span>Observation: Olivia Wilde started dating Harry Styles...</span></span>
<span class="line"><span>Thought: I need to find out Harry Styles&#39; age.</span></span>
<span class="line"><span>Action: Search</span></span>
<span class="line"><span>Action Input: &quot;Harry Styles age&quot;</span></span>
<span class="line"><span>Observation: 29 years</span></span>
<span class="line"><span>Thought: I need to calculate 29 raised to the 0.23 power.</span></span>
<span class="line"><span>Action: Calculator</span></span>
<span class="line"><span>Action Input: 29^0.23</span></span>
<span class="line"><span>Observation: 2.169</span></span>
<span class="line"><span>Thought: I now know the final answer.</span></span>
<span class="line"><span>Final Answer: Harry Styles, Olivia Wilde&#39;s boyfriend, is 29 years old and his age raised to the 0.23 power is 2.169.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; Finished chain.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_12-4-react-vs-其他方法对比" tabindex="-1">12.4 ReAct vs 其他方法对比 <a class="header-anchor" href="#_12-4-react-vs-其他方法对比" aria-label="Permalink to &quot;12.4 ReAct vs 其他方法对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>特性</th><th>ReAct</th><th>CoT</th><th>Act Only</th></tr></thead><tbody><tr><td>推理能力</td><td>✅ 内置</td><td>✅ 内置</td><td>❌ 无</td></tr><tr><td>工具使用</td><td>✅ 动态选择</td><td>❌ 无</td><td>✅ 固定顺序</td></tr><tr><td>可解释性</td><td>✅ 高（展示思考）</td><td>✅ 高</td><td>❌ 低</td></tr><tr><td>灵活性</td><td>✅ 高</td><td>⚠️ 中</td><td>⚠️ 低</td></tr><tr><td>实现复杂度</td><td>⚠️ 中</td><td>✅ 低</td><td>✅ 低</td></tr></tbody></table><h2 id="_12-5-react-的最佳实践" tabindex="-1">12.5 ReAct 的最佳实践 <a class="header-anchor" href="#_12-5-react-的最佳实践" aria-label="Permalink to &quot;12.5 ReAct 的最佳实践&quot;">​</a></h2><h3 id="_1-工具设计原则" tabindex="-1">1. 工具设计原则 <a class="header-anchor" href="#_1-工具设计原则" aria-label="Permalink to &quot;1. 工具设计原则&quot;">​</a></h3><ul><li><strong>清晰描述</strong>：每个工具提供详细的 description</li><li><strong>单一职责</strong>：每个工具只做一件事</li><li><strong>错误处理</strong>：工具应返回明确的错误信息</li></ul><h3 id="_2-prompt-模板优化" tabindex="-1">2. Prompt 模板优化 <a class="header-anchor" href="#_2-prompt-模板优化" aria-label="Permalink to &quot;2. Prompt 模板优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">react_prompt </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;&quot;&quot;Answer the following questions as best you can. </span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">You have access to the following tools:</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{tools}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Use the following format:</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Question: the input question you must answer</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Thought: you should always think about what to do</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Action: the action to take, should be one of [</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{tool_names}</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Action Input: the input to the action</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Observation: the result of the action</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">... (this Thought/Action/Action Input/Observation can repeat N times)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Thought: I now know the final answer</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Final Answer: the final answer to the original input question</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Begin!</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Question: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{input}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Thought: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">{agent_scratchpad}</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&quot;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="_3-性能优化" tabindex="-1">3. 性能优化 <a class="header-anchor" href="#_3-性能优化" aria-label="Permalink to &quot;3. 性能优化&quot;">​</a></h3><ul><li><strong>限制循环次数</strong>：防止无限循环（max_iterations=10）</li><li><strong>缓存观察结果</strong>：相同查询复用 Observation</li><li><strong>并行工具调用</strong>：支持并行 search</li></ul><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li><strong>ReAct 核心</strong>：Thought-Action-Observation 循环，推理与行动协同</li><li><strong>实现方式</strong>：LangChain 提供 zero-shot-react-description 模板</li><li><strong>优势</strong>：比纯 CoT 或纯 Act 更灵活、可解释</li><li><strong>实践要点</strong>：设计好的工具描述、限制迭代次数、考虑缓存</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>使用 LangChain 实现一个 ReAct Agent，让它能够搜索维基百科并回答涉及多人物关系的问题。</li><li>对比 ReAct、CoT、Act-only 三种方法在同一复杂问题上的回答质量和耗时。</li><li>为 ReAct Agent 添加并行工具调用支持，比较串行与并行的效率差异。</li></ol><p><a href="./ch13.html">下一章：大模型与提示工程概述</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch12.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
