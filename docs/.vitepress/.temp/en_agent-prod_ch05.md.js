import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Chapter 1 · Python Async Programming","description":"","frontmatter":{},"headers":[],"relativePath":"en/agent-prod/ch05.md","filePath":"en/agent-prod/ch05.md","lastUpdated":1787869458000}');
const _sfc_main = { name: "en/agent-prod/ch05.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="chapter-1-·-python-async-programming" tabindex="-1">Chapter 1 · Python Async Programming <a class="header-anchor" href="#chapter-1-·-python-async-programming" aria-label="Permalink to &quot;Chapter 1 · Python Async Programming&quot;">​</a></h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/agent-prod/ch05.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ch05 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ch05 as default
};
