import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Claude Code · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/index.md","filePath":"claude-code/index.md","lastUpdated":1787835548000}');
const _sfc_main = { name: "claude-code/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="claude-code-·-课程导学" tabindex="-1">Claude Code · 课程导学 <a class="header-anchor" href="#claude-code-·-课程导学" aria-label="Permalink to &quot;Claude Code · 课程导学&quot;">​</a></h1><p>本课程共 <strong>21 章</strong>，基于 <strong>Claude Code 2.x</strong> 官方文档与 npm 包说明，从零基础到团队级工程化应用。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>安装配置、基本对话、CLAUDE.md、文件编辑、Bash 执行</td></tr><tr><td>进阶</td><td>06–10</td><td>权限安全、多轮会话、Git 集成、MCP 工具、Skills</td></tr><tr><td>高级</td><td>11–15</td><td>子代理、Hooks、IDE 集成、SDK 编程调用、企业配置</td></tr><tr><td>生产</td><td>16–21</td><td>企业配置、成本管理、最佳实践与团队规范、综合实战、近期新特性</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>docs.anthropic.com</td><td><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noreferrer">https://docs.anthropic.com/en/docs/claude-code</a></td></tr><tr><td>github.com</td><td><a href="https://github.com/anthropics/claude-code" target="_blank" rel="noreferrer">https://github.com/anthropics/claude-code</a></td></tr><tr><td>npm</td><td><a href="https://www.npmjs.com/package/@anthropic-ai/claude-code" target="_blank" rel="noreferrer">@anthropic-ai/claude-code</a></td></tr></tbody></table><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>终端基本操作；Node.js 18+；</li><li>Anthropic API Key 或 Claude Pro/Max 订阅。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
