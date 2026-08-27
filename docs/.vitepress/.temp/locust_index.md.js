import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Locust 性能测试 · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"locust/index.md","filePath":"locust/index.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "locust/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="locust-性能测试-·-课程导学" tabindex="-1">Locust 性能测试 · 课程导学 <a class="header-anchor" href="#locust-性能测试-·-课程导学" aria-label="Permalink to &quot;Locust 性能测试 · 课程导学&quot;">​</a></h1><p>本课程共 <strong>20 章</strong>，基于 <strong>Locust 2.46.x 官方文档</strong>，从零基础到分布式生产级压测。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>性能测试基础、HttpUser、任务编写、Web UI、断言</td></tr><tr><td>进阶</td><td>06–10</td><td>TaskSet 嵌套、事件钩子、参数化、分布式、Docker</td></tr><tr><td>高级</td><td>11–15</td><td>Kubernetes、非 HTTP 协议、asyncio、作为库使用、插件</td></tr><tr><td>生产</td><td>16–20</td><td>性能调优、CI/CD、监控分析、综合实战</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>docs.locust.io</td><td><a href="https://docs.locust.io/en/stable/" target="_blank" rel="noreferrer">https://docs.locust.io/en/stable/</a></td></tr><tr><td>github.com</td><td><a href="https://github.com/locustio/locust" target="_blank" rel="noreferrer">https://github.com/locustio/locust</a></td></tr></tbody></table><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>Python 基础；建议先完成本站 <a href="/pytest/">pytest 前 6 章</a>；</li><li>了解 HTTP 基础概念。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("locust/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
