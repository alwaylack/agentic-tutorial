import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Mastra · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"mastra/index.md","filePath":"mastra/index.md","lastUpdated":1787834555000}');
const _sfc_main = { name: "mastra/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="mastra-·-课程导学" tabindex="-1">Mastra · 课程导学 <a class="header-anchor" href="#mastra-·-课程导学" aria-label="Permalink to &quot;Mastra · 课程导学&quot;">​</a></h1><p>本课程共 <strong>21 章</strong>，基于 <strong>Mastra 官方文档与仓库</strong>，掌握 TypeScript 全栈 AI 应用框架。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–06</td><td>项目脚手架、Studio、模型路由、Agent、工具</td></tr><tr><td>进阶</td><td>07–13</td><td>Workflow 图引擎、Suspend/Resume、Memory、RAG、Storage</td></tr><tr><td>高级</td><td>14–17</td><td>MCP Server、Evals 评估、可观测性、前端集成</td></tr><tr><td>生产</td><td>18–21</td><td>独立部署与服务端 · 三实战：生产级智能客服 / 全栈 AI 应用 / 数据问答 BI Agent</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>GitHub 仓库</td><td><a href="https://github.com/mastra-ai/mastra" target="_blank" rel="noreferrer">mastra-ai/mastra</a></td></tr><tr><td>官方文档</td><td><a href="https://mastra.ai/docs" target="_blank" rel="noreferrer">https://mastra.ai/docs</a></td></tr><tr><td>模型路由</td><td><a href="https://mastra.ai/models" target="_blank" rel="noreferrer">https://mastra.ai/models</a></td></tr></tbody></table><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>TypeScript/Node.js 基础；</li><li>Node.js 20+；至少一个 LLM Provider 的 API Key。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("mastra/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
