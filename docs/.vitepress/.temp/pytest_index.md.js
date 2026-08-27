import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"pytest 教程 · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"pytest/index.md","filePath":"pytest/index.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "pytest/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="pytest-教程-·-课程导学" tabindex="-1">pytest 教程 · 课程导学 <a class="header-anchor" href="#pytest-教程-·-课程导学" aria-label="Permalink to &quot;pytest 教程 · 课程导学&quot;">​</a></h1><p>本课程基于 <strong>pytest 9.x 官方文档</strong>编写，共 <strong>20 章</strong>，从零基础一路讲到生产实践。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>测试基础、断言、组织与标记、参数化</td></tr><tr><td>进阶</td><td>06–11</td><td>fixture 全家桶、内置 fixture、mock、配置文件</td></tr><tr><td>高级</td><td>12–18</td><td>插件开发、覆盖率、并行执行、异步测试、Hypothesis</td></tr><tr><td>生产实践</td><td>19–20</td><td>Web 服务集成测试、CI 与测试治理</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><p>本课程严格对照以下权威文档编写：</p><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>docs.pytest.org</td><td><a href="https://docs.pytest.org/en/stable/" target="_blank" rel="noreferrer">https://docs.pytest.org/en/stable/</a></td></tr><tr><td>github.com</td><td><a href="https://github.com/pytest-dev/pytest/tree/main/doc/en" target="_blank" rel="noreferrer">https://github.com/pytest-dev/pytest/tree/main/doc/en</a></td></tr></tbody></table><p>内容版本基准：<strong>pytest 9.x</strong></p><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>会 Python 基础语法（函数、类、模块导入）；</li><li>本机装有 Python 3.10+。</li></ul><h2 id="如何学习" tabindex="-1">如何学习 <a class="header-anchor" href="#如何学习" aria-label="Permalink to &quot;如何学习&quot;">​</a></h2><ol><li>每章先读讲解、亲手敲示例代码；</li><li>完成「随堂测验」（答错会给出正确答案和原因）；</li><li>完成「动手实践」3 道小题后再进入下一章。</li></ol><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pytest/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
