import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"FastAPI 教程 · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"fastapi/index.md","filePath":"fastapi/index.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "fastapi/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="fastapi-教程-·-课程导学" tabindex="-1">FastAPI 教程 · 课程导学 <a class="header-anchor" href="#fastapi-教程-·-课程导学" aria-label="Permalink to &quot;FastAPI 教程 · 课程导学&quot;">​</a></h1><p>本课程基于 <strong>FastAPI 0.14x 官方文档</strong>编写，共 <strong>22 章</strong>，从零基础到生产部署。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–06</td><td>环境搭建、路由、路径/查询/请求体参数、Pydantic 校验、响应模型</td></tr><tr><td>进阶</td><td>07–13</td><td>表单文件、错误处理、依赖注入体系、中间件、数据库集成</td></tr><tr><td>高级</td><td>14–20</td><td>OAuth2/JWT 安全、异步并发、WebSocket、模板、大型项目结构、测试</td></tr><tr><td>生产实践</td><td>21–22</td><td>配置管理（Pydantic Settings）、lifespan、Docker 与部署</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><p>本课程严格对照以下权威文档编写：</p><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>fastapi.tiangolo.com</td><td><a href="https://fastapi.tiangolo.com/" target="_blank" rel="noreferrer">https://fastapi.tiangolo.com/</a></td></tr><tr><td>github.com</td><td><a href="https://github.com/fastapi/fastapi/tree/master/docs/en/docs" target="_blank" rel="noreferrer">https://github.com/fastapi/fastapi/tree/master/docs/en/docs</a></td></tr></tbody></table><p>内容版本基准：<strong>FastAPI 0.141+</strong></p><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>Python 基础 + 了解类型注解（<code>def f(x: int) -&gt; str</code>）；</li><li>建议先完成本站 <a href="/pytest/">pytest 教程</a> 的前 10 章，第 20 章会用到。</li></ul><h2 id="版本说明" tabindex="-1">版本说明 <a class="header-anchor" href="#版本说明" aria-label="Permalink to &quot;版本说明&quot;">​</a></h2><p>教程使用当前最新的 FastAPI（0.141+）与 Pydantic v2 语法：统一采用官方推荐的 <code>Annotated</code> 依赖写法、<code>lifespan</code> 生命周期管理、<code>fastapi dev</code> CLI。</p><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("fastapi/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
