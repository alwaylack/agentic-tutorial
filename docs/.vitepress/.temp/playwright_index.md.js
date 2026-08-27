import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Playwright 教程 · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"playwright/index.md","filePath":"playwright/index.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "playwright/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="playwright-教程-·-课程导学" tabindex="-1">Playwright 教程 · 课程导学 <a class="header-anchor" href="#playwright-教程-·-课程导学" aria-label="Permalink to &quot;Playwright 教程 · 课程导学&quot;">​</a></h1><p>本课程基于 **Playwright 1.6x 官方文档（Python 版）**编写，共 <strong>22 章</strong>，从零基础到生产级 E2E 测试体系。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>架构原理、定位器、自动等待、Web-First 断言</td></tr><tr><td>进阶</td><td>06–12</td><td>pytest 集成、iframe/popup、网络 Mock、认证复用、Trace、设备仿真</td></tr><tr><td>高级</td><td>13–18</td><td>POM 设计模式、并行 Sharding、CI/Docker、API 测试、异步 API</td></tr><tr><td>生产实践</td><td>19–22</td><td>Flaky 治理、无障碍测试、WebSocket 实时应用、E2E 策略</td></tr></tbody></table><h2 id="与本站其他课程的配合" tabindex="-1">与本站其他课程的配合 <a class="header-anchor" href="#与本站其他课程的配合" aria-label="Permalink to &quot;与本站其他课程的配合&quot;">​</a></h2><ul><li>第 06 章起的 pytest fixture 用法可直接衔接 <a href="/pytest/">pytest 教程</a>；</li><li>第 18 章与 <a href="/fastapi/">FastAPI 教程</a> 的测试章节互相呼应，组成完整的 Web 测试技能栈。</li></ul><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><p>本课程严格对照以下权威文档编写：</p><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>playwright.dev</td><td><a href="https://playwright.dev/python/docs/intro" target="_blank" rel="noreferrer">https://playwright.dev/python/docs/intro</a></td></tr><tr><td>github.com</td><td><a href="https://github.com/microsoft/playwright-python" target="_blank" rel="noreferrer">https://github.com/microsoft/playwright-python</a></td></tr></tbody></table><p>内容版本基准：<strong>Playwright 1.62 (Python)</strong></p><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>Python 基础 + 会用 pytest 写简单测试（可先读本站 pytest 前 6 章）；</li><li>本机可安装 Chromium/Firefox/WebKit 浏览器内核。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("playwright/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
