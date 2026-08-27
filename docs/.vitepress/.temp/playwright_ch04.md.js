import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 4 章 · 自动等待与 Actionability","description":"","frontmatter":{},"headers":[],"relativePath":"playwright/ch04.md","filePath":"playwright/ch04.md","lastUpdated":1787480284000}');
const __default__ = { name: "playwright/ch04.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "对一个带入场动画的按钮执行 click()，Playwright 会？",
        options: [
          "立刻点击，可能点空",
          "等待 Stable 检查通过（动画结束、位置不再变化）后才点击",
          "直接抛错拒绝执行",
          "强制点击并打印警告"
        ],
        answer: 1,
        explain: "click 要求五项检查全部通过，其中 Stable 表示元素未在动画中；动画期间位置不稳定，Playwright 会一直等到动画结束。"
      },
      {
        question: "关于 locator.fill() 的 actionability 检查，正确的是？",
        options: [
          "和 click 完全相同的五项检查",
          "要求 Visible 和 Enabled 和 Editable，但不要求 Stable 与 Receives Events",
          "不做任何检查",
          "只检查 Visible"
        ],
        answer: 1,
        explain: "官方检查表中 fill 需要 Visible/Enabled/Editable 三项；输入文字不需要元素停止动画或未被遮挡，所以不查 Stable 和 Receives Events。"
      },
      {
        question: "测试里大量出现 time.sleep(2) 的最大危害是？",
        options: [
          "让报告变得难看",
          "既拖慢每次运行，又不能保证等待条件真正满足——快了浪费时间、慢了照样失败",
          "会被浏览器拦截",
          "消耗过多内存"
        ],
        answer: 1,
        explain: "固定睡眠是最差的等待策略：下限太高（慢）、上限不保证（flaky）。应依赖自动等待或 wait_for_url/expect_response 这类条件等待。"
      },
      {
        question: "什么时候适合使用 force=True？",
        options: [
          "作为提高测试速度的常规手段",
          "元素被自定义动画永久遮挡导致 Receives Events 无法通过，且确认遮挡物不拦截事件的特殊场景",
          "所有 click 都加上更保险",
          "元素不存在时用它避免报错"
        ],
        answer: 1,
        explain: "force 跳过 actionability 检查，等于放弃 Playwright 的核心安全网，只在极少数动画误伤场景使用，且必须注明理由。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-4-章-·-自动等待与-actionability" tabindex="-1">第 4 章 · 自动等待与 Actionability <a class="header-anchor" href="#第-4-章-·-自动等待与-actionability" aria-label="Permalink to &quot;第 4 章 · 自动等待与 Actionability&quot;">​</a></h1><blockquote><p>本章目标：理解 Playwright 自动等待的原理与五项 actionability 检查，知道每个操作到底在等什么，以及 timeout / force 的正确用法。</p></blockquote><h2 id="_4-1-自动等待解决的是什么问题" tabindex="-1">4.1 自动等待解决的是什么问题 <a class="header-anchor" href="#_4-1-自动等待解决的是什么问题" aria-label="Permalink to &quot;4.1 自动等待解决的是什么问题&quot;">​</a></h2><p>Selenium 时代的测试长这样：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># ❌ 反模式：猜一个&quot;应该够久&quot;的时间</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">time.sleep(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">3</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">driver.find_element(By.</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">ID</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;submit&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">).click()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>睡 3 秒：网络快时浪费 2.8 秒，网络慢时依然失败。Playwright 把等待内置进每个操作——<strong>执行动作前自动等所有相关检查通过，超时才报 TimeoutError</strong>。你的测试代码里不应该再出现任何 <code>sleep</code>。</p><h2 id="_4-2-五项-actionability-检查" tabindex="-1">4.2 五项 Actionability 检查 <a class="header-anchor" href="#_4-2-五项-actionability-检查" aria-label="Permalink to &quot;4.2 五项 Actionability 检查&quot;">​</a></h2><p>以 <code>locator.click()</code> 为例，执行前会依次确认：</p><table tabindex="0"><thead><tr><th>检查项</th><th>含义</th></tr></thead><tbody><tr><td><strong>Visible</strong></td><td>有非空边界框且无 <code>visibility:hidden</code></td></tr><tr><td><strong>Stable</strong></td><td>未处于动画中（连续两帧位置一致）</td></tr><tr><td><strong>Receives Events</strong></td><td>命中测试证明该点没有被遮罩层挡住</td></tr><tr><td><strong>Enabled</strong></td><td>不是 <code>disabled</code></td></tr><tr><td><strong>Editable</strong></td><td>（输入类）可编辑</td></tr></tbody></table><p>不同操作的检查组合不同，官方文档给出了完整对照表（节选）：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Action                Visible Stable Receives Events Enabled Editable</span></span>
<span class="line"><span>locator.click()         Yes     Yes       Yes         Yes      -</span></span>
<span class="line"><span>locator.check()         Yes     Yes       Yes         Yes      -</span></span>
<span class="line"><span>locator.hover()         Yes     Yes       Yes          -       -</span></span>
<span class="line"><span>locator.fill()          Yes      -         -          Yes     Yes</span></span>
<span class="line"><span>locator.select_option() Yes      -         -          Yes      -</span></span>
<span class="line"><span>locator.set_input_files() -      -         -           -       -</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>两个值得注意的细节：</p><ul><li><code>fill</code> 不要求 Stable 和 Receives Events——往 input 里填文本不需要它静止或可点击；</li><li><code>press</code>、<code>focus</code>、<code>dispatch_event</code> 几乎不做 actionability 检查——它们模拟的是键盘/事件层面的行为。</li></ul><h2 id="_4-3-timeout-局部覆盖与全局默认" tabindex="-1">4.3 timeout：局部覆盖与全局默认 <a class="header-anchor" href="#_4-3-timeout-局部覆盖与全局默认" aria-label="Permalink to &quot;4.3 timeout：局部覆盖与全局默认&quot;">​</a></h2><p>每次操作的默认超时是 30 秒，可按需调整：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 单次操作放宽到 10 秒</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">page.get_by_role(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;button&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;提交&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">).click(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">timeout</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">10_000</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 全局默认改成 15 秒</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">page.set_default_timeout(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">15_000</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 导航有独立的默认超时（45 秒），也可单独设置</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">page.set_default_navigation_timeout(</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">60_000</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">不要用加长 timeout 来掩盖问题</p><p>timeout 是给&quot;合理慢&quot;的缓冲，不是失败重试器。一个稳定 5 秒内完成的页面配 120 秒超时，只会让 CI 失败时多等两分钟。</p></div><h2 id="_4-4-force-true-绕过检查的代价与用途" tabindex="-1">4.4 force=True：绕过检查的代价与用途 <a class="header-anchor" href="#_4-4-force-true-绕过检查的代价与用途" aria-label="Permalink to &quot;4.4 force=True：绕过检查的代价与用途&quot;">​</a></h2><p><code>force=True</code> 会跳过 actionability 检查直接派发动作：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 即使元素被动画遮挡也强行点击</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">page.get_by_role(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;button&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">).click(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">force</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">True</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>适用场景很窄：自定义动画导致 Receives Events 永远不通过、或确知遮挡元素不拦截事件时的一把&quot;手术刀&quot;。代价是放弃了 Playwright 最重要的安全保障——<strong>能用则不用</strong>，用了请在代码注释里写明原因。</p><h2 id="_4-5-等待的另一半-显式状态等待" tabindex="-1">4.5 等待的另一半：显式状态等待 <a class="header-anchor" href="#_4-5-等待的另一半-显式状态等待" aria-label="Permalink to &quot;4.5 等待的另一半：显式状态等待&quot;">​</a></h2><p>自动等待管的是&quot;操作前等元素就绪&quot;，但有些场景需要你主动声明等待条件：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 等 URL 变化（如登录跳转）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">page.wait_for_url(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;**/dashboard&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 等特定网络响应到达</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">with</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> page.expect_response(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;**/api/user&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">as</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> resp_info:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    page.get_by_role(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;button&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;刷新&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">).click()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">print</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(resp_info.value.status)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 等某个请求发出</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">with</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> page.expect_request(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;**/analytics&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">as</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> req_info:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    page.goto(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;https://example.com&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 等 load/networkidle 状态</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">page.wait_for_load_state(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;networkidle&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>这些&quot;事件等待器&quot;同样是自动重试语义：在超时窗口内持续探测，而不是只查一次就走。</p><h2 id="_4-6-本章小结" tabindex="-1">4.6 本章小结 <a class="header-anchor" href="#_4-6-本章小结" aria-label="Permalink to &quot;4.6 本章小结&quot;">​</a></h2><ul><li>每个动作前自动执行 actionability 检查，全部通过才执行，超时报 TimeoutError；</li><li>五大检查：可见（Visible）、稳定（Stable）、接收事件（Receives Events）、可用（Enabled）、可编辑（Editable），不同动作组合的检查项不同；</li><li>测试代码中禁止 <code>sleep</code>；timeout 只做局部微调，别全局调大掩盖问题；</li><li><code>force=True</code> 跳过检查是最后手段；</li><li>页面级变化用 <code>wait_for_url</code> / <code>expect_response</code> 等显式等待表达意图。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>写一个含 CSS 加载动画按钮的本地页面，分别在动画进行中和结束后点击，观察 Playwright 自动等待的行为。</li><li>用 <code>expect_response</code> 捕获一次真实站点的 XHR 请求，打印其状态码。</li><li>故意把 timeout 设为 1ms 点击一个延迟出现的按钮，观察 TimeoutError 报错信息里的检查细节。</li></ol><blockquote><p>进入<a href="./ch05.html">第 5 章：Web-First 断言 expect</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("playwright/ch04.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
