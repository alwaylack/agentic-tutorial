import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Pi 编码智能体教程 · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"pi/index.md","filePath":"pi/index.md","lastUpdated":1787834555000}');
const _sfc_main = { name: "pi/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="pi-编码智能体教程-·-课程导学" tabindex="-1">Pi 编码智能体教程 · 课程导学 <a class="header-anchor" href="#pi-编码智能体教程-·-课程导学" aria-label="Permalink to &quot;Pi 编码智能体教程 · 课程导学&quot;">​</a></h1><p>本课程基于 <strong>pi 0.8x 官方文档</strong>（README + docs/ 全部 30+ 篇）编写，共 <strong>21 章</strong>，从零基础到构建你自己的智能体工作流。</p><p>Pi 是一个极简的终端编码 harness：核心只做&quot;模型 + 工具 + 会话&quot;，其余一切（子代理、计划模式、主题、技能）都通过 <strong>TypeScript 扩展 / 技能 / 提示词模板 / 包生态</strong> 按需加装——&quot;让 pi 适配你的工作流，而不是反过来&quot;。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–04</td><td>理念与架构、安装上手、模型配置、交互模式</td></tr><tr><td>进阶</td><td>05–09</td><td>会话分支、上下文压缩、设置与项目信任、提示词模板、技能</td></tr><tr><td>高级</td><td>10–15</td><td>TypeScript 扩展开发、自定义工具、主题、包生态、SDK、RPC</td></tr><tr><td>生产实践</td><td>16–21</td><td>CI 自动化、CLI 全解、安全模型、容器化、团队工作流、多会话协作（intercom/messenger）</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><p>本课程严格对照以下权威文档编写：</p><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>pi.dev</td><td><a href="https://pi.dev" target="_blank" rel="noreferrer">https://pi.dev</a></td></tr><tr><td>github.com</td><td><a href="https://github.com/earendil-works/pi" target="_blank" rel="noreferrer">https://github.com/earendil-works/pi</a>（coding-agent 为 monorepo 内的包）</td></tr></tbody></table><p>内容版本基准：<strong>pi 0.84.3</strong></p><h2 id="学习前提" tabindex="-1">学习前提 <a class="header-anchor" href="#学习前提" aria-label="Permalink to &quot;学习前提&quot;">​</a></h2><ul><li>熟悉终端基本操作；扩展/SDK 章节需要 TypeScript 基础；</li><li>一个 LLM API Key（支持 OpenAI 兼容端点等主流 provider）。</li></ul><p>👉 从 <a href="./ch01.html">第 1 章</a> 开始。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
