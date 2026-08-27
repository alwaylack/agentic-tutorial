import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"HTTP 请求库教程 · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"http/index.md","filePath":"http/index.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "http/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="http-请求库教程-·-课程导学" tabindex="-1">HTTP 请求库教程 · 课程导学 <a class="header-anchor" href="#http-请求库教程-·-课程导学" aria-label="Permalink to &quot;HTTP 请求库教程 · 课程导学&quot;">​</a></h1><p>本课程共 <strong>20 章</strong>，系统讲解 Python 最主流的两大 HTTP 客户端库：</p><table tabindex="0"><thead><tr><th>库</th><th>定位</th><th>版本基准</th></tr></thead><tbody><tr><td><strong>requests</strong></td><td>同步请求事实标准，生态最丰富</td><td>requests <strong>2.34.x</strong></td></tr><tr><td><strong>httpx</strong></td><td>现代全功能客户端，原生异步+HTTP2</td><td>httpx <strong>0.28.x</strong></td></tr></tbody></table><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>HTTP 基础、requests 核心 API、请求参数、响应处理、JSON/文件</td></tr><tr><td>进阶</td><td>06–10</td><td>Session、超时重试、代理 SSL、异常处理、httpx 简介</td></tr><tr><td>高级</td><td>11–15</td><td>异步请求、并发、HTTP/2、中间件、pytest 集成</td></tr><tr><td>生产</td><td>16–20</td><td>性能优化、API 客户端封装、安全、部署、实战项目</td></tr></tbody></table><h2 id="与其他课程的配合" tabindex="-1">与其他课程的配合 <a class="header-anchor" href="#与其他课程的配合" aria-label="Permalink to &quot;与其他课程的配合&quot;">​</a></h2><ul><li>与 <a href="/pytest/">pytest</a> 第 19 章（Web 服务测试）衔接；</li><li>与 <a href="/fastapi/">FastAPI</a> 第 20 章（测试）配合，形成完整的 Web 测试技能栈；</li><li>与 <a href="/playwright/">Playwright</a> 互补——Playwright 测浏览器，requests/httpx 测 API。</li></ul><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><p>本课程严格对照以下权威文档编写：</p><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>requests.readthedocs.io</td><td><a href="https://requests.readthedocs.io/en/latest/" target="_blank" rel="noreferrer">https://requests.readthedocs.io/en/latest/</a></td></tr><tr><td>www.python-httpx.org</td><td><a href="https://www.python-httpx.org/" target="_blank" rel="noreferrer">https://www.python-httpx.org/</a></td></tr></tbody></table><p>内容版本基准：<strong>requests 2.34 + httpx 0.28</strong></p><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>Python 基础；了解 HTTP 基本概念（GET/POST、状态码、Header）即可；</li><li>建议先完成本站 <a href="/pytest/">pytest 前 6 章</a> 了解测试基础。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("http/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
