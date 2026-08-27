import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Hands-On Large Language Models · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"hands-on-llm/index.md","filePath":"hands-on-llm/index.md","lastUpdated":1787834555000}');
const _sfc_main = { name: "hands-on-llm/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="hands-on-large-language-models-·-课程导学" tabindex="-1">Hands-On Large Language Models · 课程导学 <a class="header-anchor" href="#hands-on-large-language-models-·-课程导学" aria-label="Permalink to &quot;Hands-On Large Language Models · 课程导学&quot;">​</a></h1><p>本课程共 <strong>12 章 + 扩展阅读</strong>，逐章对照 O&#39;Reilly 图书《Hands-On Large Language Models》（Jay Alammar &amp; Maarten Grootendorst 著）官方仓库的笔记本编写：<strong>章节结构、代码、图片与仓库保持一致</strong>，文字说明翻译为中文。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>奠基</td><td>01–03</td><td>语言模型导论、Token 与 Token 嵌入、深入 LLM 内部</td></tr><tr><td>应用</td><td>04–06</td><td>文本分类、文本聚类与主题建模、提示工程</td></tr><tr><td>进阶</td><td>07–09</td><td>高级文本生成技术与工具、语义搜索、多模态大语言模型</td></tr><tr><td>训练</td><td>10–12</td><td>构建文本嵌入模型、微调 BERT、微调生成模型</td></tr><tr><td>扩展</td><td>Bonus</td><td>Agent、扩散模型、MoE、Mamba/SSM、量化与推理等前沿主题延伸阅读</td></tr></tbody></table><p>每章对应仓库 <code>chapter01</code>–<code>chapter12</code> 目录下的官方笔记本（<code>.ipynb</code>），代码原样保留、可在 Colab 直接运行。</p><h2 id="扩展阅读-bonus-material" tabindex="-1">扩展阅读（Bonus Material） <a class="header-anchor" href="#扩展阅读-bonus-material" aria-label="Permalink to &quot;扩展阅读（Bonus Material）&quot;">​</a></h2><p>作者围绕图书撰写的 8 篇视觉化深度指南，本站已全部收录并配图：</p><p><strong>How Transformer LLMs Work（DeepLearning.AI 课程）· 量化可视化指南 · Mamba 与状态空间模型 · 混合专家模型 MoE · 图解 Stable Diffusion · 推理 LLM 可视化指南 · 图解 DeepSeek-R1 · LLM Agent 可视化指南</strong></p><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>GitHub 仓库</td><td><a href="https://github.com/HandsOnLLM/Hands-On-Large-Language-Models" target="_blank" rel="noreferrer">HandsOnLLM/Hands-On-Large-Language-Models</a></td></tr><tr><td>图书官网</td><td><a href="https://huggingface.co/blog/hands-on-llms" target="_blank" rel="noreferrer">huggingface.co/learn</a></td></tr><tr><td>环境</td><td>仓库根目录 <code>environment.yml</code> / <code>requirements.txt</code></td></tr></tbody></table><p>内容版本基准：<strong>仓库最新 main 分支</strong></p><h2 id="学习建议" tabindex="-1">学习建议 <a class="header-anchor" href="#学习建议" aria-label="Permalink to &quot;学习建议&quot;">​</a></h2><ul><li><strong>第 1–3 章是全书地基</strong>：Tokenizer、嵌入与 Transformer 内部机制贯穿后续所有章节；</li><li><strong>应用章节（4–8）可按需跳读</strong>：分类/聚类/语义搜索相互独立；</li><li><strong>训练三部曲（10–12）循序渐进</strong>：先造嵌入模型，再微调 BERT，最后微调生成模型；</li><li>笔记本默认在 GPU 上运行（Colab 免费档即可满足绝大多数示例）。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("hands-on-llm/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
