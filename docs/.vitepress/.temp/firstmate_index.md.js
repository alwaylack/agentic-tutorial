import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"FirstMate · 课程导学","description":"","frontmatter":{},"headers":[],"relativePath":"firstmate/index.md","filePath":"firstmate/index.md","lastUpdated":1787528977000}');
const _sfc_main = { name: "firstmate/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="firstmate-·-课程导学" tabindex="-1">FirstMate · 课程导学 <a class="header-anchor" href="#firstmate-·-课程导学" aria-label="Permalink to &quot;FirstMate · 课程导学&quot;">​</a></h1><p>本课程共 <strong>18 章</strong>，基于 <strong>FirstMate 官方仓库与文档</strong>（AGENTS.md / docs/architecture.md 等），掌握「Talk to one agent. Ship with a crew.」的多智能体舰队编排方法。</p><h2 id="你将学到什么" tabindex="-1">你将学到什么 <a class="header-anchor" href="#你将学到什么" aria-label="Permalink to &quot;你将学到什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>阶段</th><th>章节</th><th>内容</th></tr></thead><tbody><tr><td>入门</td><td>01–05</td><td>Agent Distro 理念、环境搭建、AGENTS.md 解剖、五条硬规则、FM_HOME 布局</td></tr><tr><td>进阶</td><td>06–10</td><td>tmux 参考后端、实验性后端、ship/scout 任务、worktree 隔离、项目模式</td></tr><tr><td>高级</td><td>11–15</td><td>零 token 监督 watcher、内置技能、两层技能体系、Secondmate、远程舰队与 Relay</td></tr><tr><td>生产</td><td>16–18</td><td>三章贯穿式实战：个人舰队 → 并行交付流水线 → Secondmate 规模化运营</td></tr></tbody></table><h2 id="官方参考源" tabindex="-1">官方参考源 <a class="header-anchor" href="#官方参考源" aria-label="Permalink to &quot;官方参考源&quot;">​</a></h2><p>本课程严格对照以下权威文档编写：</p><table tabindex="0"><thead><tr><th>来源</th><th>链接</th></tr></thead><tbody><tr><td>GitHub 仓库</td><td><a href="https://github.com/kunchenguid/firstmate" target="_blank" rel="noreferrer">kunchenguid/firstmate</a></td></tr><tr><td>运营契约 AGENTS.md</td><td><a href="https://github.com/kunchenguid/firstmate/blob/main/AGENTS.md" target="_blank" rel="noreferrer">AGENTS.md</a></td></tr><tr><td>架构总览</td><td><a href="https://github.com/kunchenguid/firstmate/blob/main/docs/architecture.md" target="_blank" rel="noreferrer">docs/architecture.md</a></td></tr><tr><td>配置手册</td><td><a href="https://github.com/kunchenguid/firstmate/blob/main/docs/configuration.md" target="_blank" rel="noreferrer">docs/configuration.md</a></td></tr><tr><td>脚本工具带</td><td><a href="https://github.com/kunchenguid/firstmate/blob/main/docs/scripts.md" target="_blank" rel="noreferrer">docs/scripts.md</a></td></tr></tbody></table><p>内容版本基准：<strong>firstmate 最新 main 分支</strong></p><h2 id="学习建议" tabindex="-1">学习建议 <a class="header-anchor" href="#学习建议" aria-label="Permalink to &quot;学习建议&quot;">​</a></h2><ul><li><strong>先读第 1–4 章</strong>再动手：五条硬规则是整个体系的根基，不理解边界就无法安全放权；</li><li><strong>tmux 后端优先</strong>（第 6 章）：它是参考实现，其他后端都是实验性的；</li><li><strong>实战章节按顺序完成</strong>：三章构成一个从单人舰队到远程规模化的完整成长路径。</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("firstmate/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
