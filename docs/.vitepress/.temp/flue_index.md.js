import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Flue · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"flue/index.md","filePath":"flue/index.md","lastUpdated":1787834555000}');
const _sfc_main = { name: "flue/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="flue-·-课程导学" tabindex="-1">Flue · 课程导学 <a class="header-anchor" href="#flue-·-课程导学" aria-label="Permalink to &quot;Flue · 课程导学&quot;">​</a></h1><p>本课程共 <strong>19 章</strong>，基于 <strong>Flue 官方仓库与文档</strong>，掌握可编程 TypeScript Agent Harness 框架。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>Harness 理念、项目搭建、&#39;use agent&#39; 函数式 Agent、模型与指令</td></tr><tr><td>进阶</td><td>06–10</td><td>Tools、Skills、MCP、Subagents、Channels</td></tr><tr><td>高级</td><td>11–14</td><td>Sandboxes 安全沙箱、Durability 持久化与恢复、Observability 可观测性、CLI 与本地运行</td></tr><tr><td>生产</td><td>15–19</td><td>Node/Cloudflare 部署、CI 与托管平台 · 三实战：GitHub 自动分诊 / Slack 值班助手 / 代码审查 Agent</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>GitHub 仓库</td><td><a href="https://github.com/withastro/flue" target="_blank" rel="noreferrer">withastro/flue</a></td></tr><tr><td>官方文档</td><td><a href="https://flueframework.com/docs" target="_blank" rel="noreferrer">https://flueframework.com/docs</a></td></tr></tbody></table><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>TypeScript/Node.js 基础；</li><li>至少一个 LLM Provider 的 API Key（Anthropic 等）。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("flue/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
