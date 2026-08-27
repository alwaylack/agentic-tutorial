import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const _imports_0 = "/assets/book_cover.DRQcbEZD.png";
const _imports_1 = "/assets/toc.CFZMJI74.png";
const __pageData = JSON.parse('{"title":"第 1 章 · 语言模型导论","description":"","frontmatter":{},"headers":[],"relativePath":"hands-on-llm/ch01.md","filePath":"hands-on-llm/ch01.md","lastUpdated":1787585930000}');
const __default__ = { name: "hands-on-llm/ch01.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "本章用于加载预训练语言模型的核心类是？",
        options: [
          "AutoModelForCausalLM",
          "AutoModelForMaskedLM",
          "BertForSequenceClassification",
          "SentenceTransformer"
        ],
        answer: 0,
        explain: "本章通过 AutoModelForCausalLM.from_pretrained 加载 microsoft/Phi-3-mini-4k-instruct 因果语言模型。"
      },
      {
        question: "pipeline 构造参数中 return_full_text=False 的作用是？",
        options: [
          "禁止模型输出任何文本",
          "只返回新生成的文本，不包含输入提示词",
          "返回完整的输入提示词",
          "把输出截断为 500 个字符"
        ],
        answer: 1,
        explain: "return_full_text=False 让 pipeline 只返回新生成部分；若为 True 则输出会带上输入提示词本身。"
      },
      {
        question: "关于 messages 列表的格式，下列说法正确的是？",
        options: [
          "它是一个纯字符串列表",
          "每条消息是包含 role 和 content 两个键的字典",
          "必须至少包含 system、user、assistant 三条消息",
          "它的键名是 speaker 和 text"
        ],
        answer: 1,
        explain: '本章示例 messages = [{"role": "user", "content": "..."}]，采用 role/content 键值对表示对话消息。'
      },
      {
        question: "在 Google Colab 上运行本章示例时，官方建议的硬件配置是？",
        options: [
          "CPU runtime 即可",
          "TPU v3-8",
          "GPU 硬件加速器（T4）",
          "必须使用本地 A100"
        ],
        answer: 2,
        explain: "本章 NOTE 指出需要在 Runtime > Change runtime type 中选择 Hardware accelerator 为 GPU（T4）。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-1-章-·-语言模型导论" tabindex="-1">第 1 章 · 语言模型导论 <a class="header-anchor" href="#第-1-章-·-语言模型导论" aria-label="Permalink to &quot;第 1 章 · 语言模型导论&quot;">​</a></h1><blockquote><p>本章目标：探索激动人心的 Language AI 领域，加载并运行你的第一个语言模型 Phi-3，完成一次文本生成。</p></blockquote><h2 id="_1-1-关于本章与本书" tabindex="-1">1.1 关于本章与本书 <a class="header-anchor" href="#_1-1-关于本章与本书" aria-label="Permalink to &quot;1.1 关于本章与本书&quot;">​</a></h2><p>本章是《Hands-On Large Language Models》（Jay Alammar 与 Maarten Grootendorst 著，O&#39;Reilly 出版）第 1 章的配套笔记本。全书用大量可视化插图讲解 LLM 的内部原理与实践：</p><p><img${ssrRenderAttr("src", _imports_0)} alt="Hands-On Large Language Models 书籍封面"></p><p><em>上图为本书封面。</em></p><p>全书共 12 章，从 Token 与嵌入讲起，逐步深入分类、聚类、提示工程、语义搜索、多模态与微调：</p><p><img${ssrRenderAttr("src", _imports_1)} alt="全书结构总览"></p><p><em>上图为全书 12 章结构总览。</em></p><p>你也可以在 Google Colab 中打开本章原始笔记本运行：<a href="https://colab.research.google.com/github/HandsOnLLM/Hands-On-Large-Language-Models/blob/main/chapter01/Chapter%201%20-%20Introduction%20to%20Language%20Models.ipynb" target="_blank" rel="noreferrer">Open In Colab</a>。</p><h2 id="_1-2-可选-在-colab-中安装依赖" tabindex="-1">1.2 [可选] 在 Colab 中安装依赖 <a class="header-anchor" href="#_1-2-可选-在-colab-中安装依赖" aria-label="Permalink to &quot;1.2 [可选] 在 Colab 中安装依赖&quot;">​</a></h2><p>如果你在 Google Colab（或任何其他云厂商）上查看本笔记本，需要<strong>取消注释并运行</strong>下面的代码块来安装本章依赖：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># %%capture</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># !pip install transformers==4.41.2 accelerate==0.31.0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>💡 <strong>注意</strong>：我们需要 GPU 来运行本笔记本中的示例。在 Google Colab 中，依次进入 <strong>Runtime &gt; Change runtime type &gt; Hardware accelerator &gt; GPU &gt; GPU type &gt; T4</strong>。</p><h2 id="_1-3-phi-3-加载模型与分词器" tabindex="-1">1.3 Phi-3：加载模型与分词器 <a class="header-anchor" href="#_1-3-phi-3-加载模型与分词器" aria-label="Permalink to &quot;1.3 Phi-3：加载模型与分词器&quot;">​</a></h2><p>第一步是把模型加载到 GPU 上以获得更快的推理速度。注意我们分别加载模型和分词器（尽管这并非总是必需）。</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> transformers </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> AutoModelForCausalLM, AutoTokenizer</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Load model and tokenizer</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">model </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> AutoModelForCausalLM.from_pretrained(</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;microsoft/Phi-3-mini-4k-instruct&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    device_map</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;cuda&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    torch_dtype</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;auto&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    trust_remote_code</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">False</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">tokenizer </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> AutoTokenizer.from_pretrained(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;microsoft/Phi-3-mini-4k-instruct&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="_1-4-用-pipeline-封装生成器" tabindex="-1">1.4 用 pipeline 封装生成器 <a class="header-anchor" href="#_1-4-用-pipeline-封装生成器" aria-label="Permalink to &quot;1.4 用 pipeline 封装生成器&quot;">​</a></h2><p>虽然现在可以直接使用模型和分词器，但把它们包装进一个 <code>pipeline</code> 对象会方便得多：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> transformers </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> pipeline</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Create a pipeline</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">generator </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> pipeline(</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;text-generation&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    model</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">model,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    tokenizer</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">tokenizer,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    return_full_text</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">False</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    max_new_tokens</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">500</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">    do_sample</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">False</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="_1-5-第一次对话-让模型讲个笑话" tabindex="-1">1.5 第一次对话：让模型讲个笑话 <a class="header-anchor" href="#_1-5-第一次对话-让模型讲个笑话" aria-label="Permalink to &quot;1.5 第一次对话：让模型讲个笑话&quot;">​</a></h2><p>最后，我们以 user 身份创建提示词并交给模型：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># The prompt (user input / query)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">messages </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    {</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;role&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;user&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;content&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Create a funny joke about chickens.&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Generate output</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">output </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> generator(messages)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">print</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(output[</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">][</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;generated_text&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">])</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>模型会返回一段关于鸡的笑话文本。<code>messages</code> 采用对话角色格式（<code>role</code> + <code>content</code>），<code>return_full_text=False</code> 表示只返回新生成的部分而不包含输入提示词。</p><h2 id="_1-6-本章小结" tabindex="-1">1.6 本章小结 <a class="header-anchor" href="#_1-6-本章小结" aria-label="Permalink to &quot;1.6 本章小结&quot;">​</a></h2><ul><li>《Hands-On Large Language Models》全书 12 章，从 Token 嵌入到微调生成模型层层递进；</li><li>使用 <code>AutoModelForCausalLM</code> 与 <code>AutoTokenizer</code> 分别加载模型与分词器（示例为 <code>microsoft/Phi-3-mini-4k-instruct</code>），并通过 <code>device_map=&quot;cuda&quot;</code> 放到 GPU 上；</li><li><code>pipeline(&quot;text-generation&quot;, ...)</code> 是最便捷的推理封装，<code>max_new_tokens=500</code> 控制生成长度，<code>do_sample=False</code> 表示贪心解码；</li><li>对话式输入使用 <code>messages</code> 列表，每条消息包含 <code>role</code> 与 <code>content</code> 字段；</li><li>运行示例需要 GPU（如 Colab 的 T4）。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>按 1.2 节安装依赖后，在 GPU 环境（本地或 Colab T4）中完整运行 1.3–1.5 节代码，把 <code>messages</code> 中的提示词换成中文问题，观察模型输出。</li><li>将 <code>pipeline</code> 的 <code>do_sample=True</code> 并添加 <code>temperature=0.7</code> 参数重新生成笑话，对比贪心解码（<code>do_sample=False</code>）与采样解码两次输出的差异。</li><li>把 <code>max_new_tokens</code> 分别改为 50 和 500 各运行一次，记录生成长度的变化，并解释 <code>return_full_text=False</code> 与 <code>True</code> 时输出的区别。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("hands-on-llm/ch01.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
