import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"pytest Course · Guide","description":"","frontmatter":{},"headers":[],"relativePath":"en/pytest/index.md","filePath":"en/pytest/index.md","lastUpdated":1787839771000}');
const _sfc_main = { name: "en/pytest/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="pytest-course-·-guide" tabindex="-1">pytest Course · Guide <a class="header-anchor" href="#pytest-course-·-guide" aria-label="Permalink to &quot;pytest Course · Guide&quot;">​</a></h1><p>This course is built on the <strong>pytest 9.x official documentation</strong>, spanning <strong>20 chapters</strong> from zero basics all the way to production practice.</p><h2 id="what-you-will-learn" tabindex="-1">What You Will Learn <a class="header-anchor" href="#what-you-will-learn" aria-label="Permalink to &quot;What You Will Learn&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Stage</th><th>Chapters</th><th>Content</th></tr></thead><tbody><tr><td>Getting started</td><td>01–05</td><td>Testing basics, assertions, organization &amp; markers, parametrization</td></tr><tr><td>Intermediate</td><td>06–11</td><td>The full fixture toolbox, built-in fixtures, mocking, configuration files</td></tr><tr><td>Advanced</td><td>12–18</td><td>Plugin development, coverage, parallel execution, async testing, Hypothesis</td></tr><tr><td>Production</td><td>19–20</td><td>Web-service integration testing, CI and test governance</td></tr></tbody></table><h2 id="official-references" tabindex="-1">Official References <a class="header-anchor" href="#official-references" aria-label="Permalink to &quot;Official References&quot;">​</a></h2><p>This course is written strictly against the following authoritative sources:</p><table tabindex="0"><thead><tr><th>Source</th><th>Link</th></tr></thead><tbody><tr><td>docs.pytest.org</td><td><a href="https://docs.pytest.org/en/stable/" target="_blank" rel="noreferrer">https://docs.pytest.org/en/stable/</a></td></tr><tr><td>github.com</td><td><a href="https://github.com/pytest-dev/pytest/tree/main/doc/en" target="_blank" rel="noreferrer">https://github.com/pytest-dev/pytest/tree/main/doc/en</a></td></tr></tbody></table><p>Version baseline: <strong>pytest 9.x</strong></p><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><ul><li>Basic Python syntax (functions, classes, module imports);</li><li>Python 3.10+ installed locally.</li></ul><h2 id="how-to-study" tabindex="-1">How to Study <a class="header-anchor" href="#how-to-study" aria-label="Permalink to &quot;How to Study&quot;">​</a></h2><ol><li>Read each chapter&#39;s explanations and type out the example code yourself;</li><li>Take the quiz (wrong answers reveal the correct choice and why);</li><li>Finish the 3 hands-on exercises before moving to the next chapter.</li></ol><p>👉 Start from <a href="/en/pytest/ch01.html">Chapter 1</a>.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/pytest/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
