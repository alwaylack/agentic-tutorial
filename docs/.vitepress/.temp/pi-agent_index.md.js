import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Pi Agent 开发 · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"pi-agent/index.md","filePath":"pi-agent/index.md","lastUpdated":1787496198000}');
const _sfc_main = { name: "pi-agent/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="pi-agent-开发-·-课程导学" tabindex="-1">Pi Agent 开发 · 课程导学 <a class="header-anchor" href="#pi-agent-开发-·-课程导学" aria-label="Permalink to &quot;Pi Agent 开发 · 课程导学&quot;">​</a></h1><p>本课程共 <strong>23 章</strong>，基于 <strong>@earendil-works/pi-agent-core</strong> 与 <strong>@earendil-works/pi-ai</strong> 官方源码文档，用 TypeScript 从零构建生产级智能体。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>pi-ai 统一 LLM API、模型路由、第一个 Agent、事件流</td></tr><tr><td>进阶</td><td>06–10</td><td>工具定义与调用、消息转换、上下文变换、认证解析</td></tr><tr><td>高级</td><td>11–15</td><td>思考推理、图像、错误中止、自定义 Provider、测试</td></tr><tr><td>生产</td><td>16–20</td><td>跨提供商切换、会话持久化、浏览器使用、综合实战</td></tr><tr><td>扩展</td><td>21–23</td><td>Telemetry 可观测性、pi-tui 终端 UI、三章贯穿式实战</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>pi-agent-core 包</td><td><a href="https://github.com/earendil-works/pi/tree/main/packages/agent" target="_blank" rel="noreferrer">packages/agent</a></td></tr><tr><td>pi-ai 包</td><td><a href="https://github.com/earendil-works/pi/tree/main/packages/ai" target="_blank" rel="noreferrer">packages/ai</a></td></tr><tr><td>pi-telemetry 包</td><td><a href="https://github.com/earendil-works/pi/tree/main/packages/telemetry" target="_blank" rel="noreferrer">packages/telemetry</a></td></tr><tr><td>pi-tui 包</td><td><a href="https://github.com/earendil-works/pi/tree/main/packages/tui" target="_blank" rel="noreferrer">packages/tui</a></td></tr><tr><td>Pi 官网</td><td><a href="https://pi.dev" target="_blank" rel="noreferrer">https://pi.dev</a></td></tr></tbody></table><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>TypeScript/Node.js 基础；建议先完成本站 <a href="/pi/">Pi 编码智能体课程</a>；</li><li>至少一个 LLM Provider 的 API Key（Anthropic/OpenAI/DeepSeek 等）。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi-agent/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
