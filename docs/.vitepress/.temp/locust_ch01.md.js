import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 1 章 · 性能测试与 Locust 概述","description":"","frontmatter":{},"headers":[],"relativePath":"locust/ch01.md","filePath":"locust/ch01.md","lastUpdated":1787480284000}');
const __default__ = { name: "locust/ch01.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: '验证"连续运行 48 小时后内存占用持续增长"属于哪种性能测试？',
        options: ["负载测试", "压力测试", "浸泡测试", "冒烟测试"],
        answer: 2,
        explain: "浸泡测试（Soak Test）专门检测长时间运行下的资源泄漏——内存、连接池、文件句柄等缓慢增长的问题只有长时间运行才能暴露。"
      },
      {
        question: "Locust 的并发模型基于什么技术？",
        options: [
          "操作系统线程 threading",
          "multiprocessing 多进程",
          "gevent 协程 greenlet",
          "asyncio 事件循环"
        ],
        answer: 2,
        explain: "Locust 基于 gevent 库，每个虚拟用户运行在一个 greenlet（微线程）中。协程切换开销远小于 OS 线程，因此单进程可模拟数千并发用户。"
      },
      {
        question: "Locust 启动 Web UI 后默认监听的端口是？",
        options: ["8080", "8000", "8089", "9090"],
        answer: 2,
        explain: "Locust 默认在 http://0.0.0.0:8089 启动 Web 界面，可通过 --web-port 参数修改。"
      },
      {
        question: "关于 Locust 与 JMeter 的对比，下列说法正确的是？",
        options: [
          "JMeter 用 Python 编写脚本，更易上手",
          "Locust 压测脚本就是普通 Python 代码，可编程性最强",
          "k6 不支持分布式压测",
          "Locust 只支持 HTTP 协议"
        ],
        answer: 1,
        explain: "Locust 的核心优势是压测场景就是普通 Python 程序——可以用任意第三方库。JMeter 使用 XML/Groovy；k6 支持分布式但语言是 JS 子集。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-1-章-·-性能测试与-locust-概述" tabindex="-1">第 1 章 · 性能测试与 Locust 概述 <a class="header-anchor" href="#第-1-章-·-性能测试与-locust-概述" aria-label="Permalink to &quot;第 1 章 · 性能测试与 Locust 概述&quot;">​</a></h1><blockquote><p>本章目标：理解负载测试、压力测试与浸泡测试的区别，了解 Locust 的事件驱动架构，安装并验证 Locust 环境。</p></blockquote><h2 id="_1-1-性能测试的三种类型" tabindex="-1">1.1 性能测试的三种类型 <a class="header-anchor" href="#_1-1-性能测试的三种类型" aria-label="Permalink to &quot;1.1 性能测试的三种类型&quot;">​</a></h2><p>性能测试不是一种测试，而是一族测试。工程实践中最常混淆的是以下三种：</p><table tabindex="0"><thead><tr><th>类型</th><th>目标</th><th>典型问题</th></tr></thead><tbody><tr><td><strong>负载测试</strong></td><td>验证系统在预期并发下是否达标</td><td>&quot;500 人同时在线时页面还能在 2s 内打开吗？&quot;</td></tr><tr><td><strong>压力测试</strong></td><td>找到系统的崩溃点</td><td>&quot;再加多少用户系统会开始报错？&quot;</td></tr><tr><td><strong>浸泡测试</strong></td><td>检测长时间运行下的资源泄漏</td><td>&quot;连续运行 24h 后内存会不会涨满？&quot;</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">三者的关系</p><p>负载测试回答&quot;够不够快&quot;，压力测试回答&quot;能扛多少&quot;，浸泡测试回答&quot;撑得久吗&quot;。一次完整的性能评估通常三者都要做。</p></div><h2 id="_1-2-locust-是什么" tabindex="-1">1.2 Locust 是什么 <a class="header-anchor" href="#_1-2-locust-是什么" aria-label="Permalink to &quot;1.2 Locust 是什么&quot;">​</a></h2><p>Locust 是一个用 Python 编写的开源负载测试工具。它的核心特点：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> locust </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> HttpUser, task</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">class</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HelloWorldUser</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">HttpUser</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">):</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">    @task</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    def</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> hello_world</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(self):</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">        self</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">.client.get(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;/hello&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>一个压测脚本就是一个普通的 Python 文件——这意味着你可以用循环、函数、第三方库来构造任意复杂的用户行为，而不必学习 XML 配置或专有 DSL。</p><h2 id="_1-3-架构-事件驱动-gevent" tabindex="-1">1.3 架构：事件驱动 + gevent <a class="header-anchor" href="#_1-3-架构-事件驱动-gevent" aria-label="Permalink to &quot;1.3 架构：事件驱动 + gevent&quot;">​</a></h2><p>Locust 的并发模型建立在两个基石上：</p><ul><li><strong>gevent</strong>：基于协程的并发库，每个虚拟用户运行在自己的 greenlet（微线程）中。单进程可轻松模拟数千用户，远低于线程或进程方案的内存开销。</li><li><strong>事件驱动</strong>：请求完成、任务执行、测试启停都会触发事件钩子，你可以在这些钩子上注入自定义统计、告警和日志逻辑。</li></ul><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────┐     ┌──────────┐     ┌─────────────┐</span></span>
<span class="line"><span>│  Master 节点 │────▶│ Worker×N │────▶│  目标系统    │</span></span>
<span class="line"><span>│  (Web UI/统计)│◀────│ (greenlet)│◀────│             │</span></span>
<span class="line"><span>└─────────────┘     └──────────┘     └─────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>单机不够时，Locust 支持一主多从的分布式模式：Master 节点负责调度和汇总统计，Worker 节点各自产生流量。</p><h2 id="_1-4-locust-vs-jmeter-vs-k6" tabindex="-1">1.4 Locust vs JMeter vs k6 <a class="header-anchor" href="#_1-4-locust-vs-jmeter-vs-k6" aria-label="Permalink to &quot;1.4 Locust vs JMeter vs k6&quot;">​</a></h2><table tabindex="0"><thead><tr><th>特性</th><th>Locust</th><th>JMeter</th><th>k6</th></tr></thead><tbody><tr><td>脚本语言</td><td>Python</td><td>XML / Groovy</td><td>JavaScript</td></tr><tr><td>并发模型</td><td>gevent 协程</td><td>线程</td><td>Go goroutine</td></tr><tr><td>分布式</td><td>内置 master-worker</td><td>需要 JMeter Server</td><td>云原生</td></tr><tr><td>学习曲线</td><td>低（会 Python 即可）</td><td>中高</td><td>低</td></tr><tr><td>可编程性</td><td>⭐⭐⭐ 完整 Python</td><td>⭐⭐ Groovy 脚本</td><td>⭐⭐ JS 子集</td></tr><tr><td>GUI</td><td>Web UI（浏览器）</td><td>Swing 桌面</td><td>无</td></tr></tbody></table><p>选择建议：团队已用 Python 选 Locust；需要录制回放选 JMeter；追求极致单机吞吐选 k6。</p><h2 id="_1-5-安装与验证" tabindex="-1">1.5 安装与验证 <a class="header-anchor" href="#_1-5-安装与验证" aria-label="Permalink to &quot;1.5 安装与验证&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">python</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -m</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> venv</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> .venv</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> &amp;&amp; </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">source</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> .venv/bin/activate</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pip</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> install</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> locust</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>验证安装：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">locust</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --version</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># locust 2.46.x (Python 3.x.x)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>创建你的第一个脚本 <code>locustfile.py</code>：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> locust </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> HttpUser, task</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">class</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> HelloWorldUser</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">HttpUser</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">):</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">    @task</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    def</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> hello_world</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(self):</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">        self</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">.client.get(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;/hello&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">        self</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">.client.get(</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;/world&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在终端中运行：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">$</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> locust</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">[2026-01-01 10:00:00] INFO/locust.main: Starting web interface at http://0.0.0.0:8089</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>打开浏览器访问 <code>http://localhost:8089</code>，填入目标主机地址即可启动压测。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>性能测试分三类：负载（够不够快）、压力（能扛多少）、浸泡（撑得久吗）；</li><li>Locust 用 Python 写压测脚本，gevent 协程实现高并发；</li><li>单机不够时用内置的 master-worker 分布式模式扩展；</li><li>相比 JMeter/k6，Locust 的优势在于&quot;完整 Python 可编程性 + 低学习成本&quot;。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>安装 Locust 并运行 <code>locust --version</code>，记录版本号。</li><li>编写本章的 <code>locustfile.py</code>（把 URL 换成你能访问的网站），在 Web UI 中用 5 个用户跑 30 秒。</li><li>阅读 <a href="https://docs.locust.io/en/stable/increasing-request-rate.html" target="_blank" rel="noreferrer">Increasing the request rate</a> 页面，列出三种提高单机请求率的方法。</li></ol><blockquote><p>完成后进入<a href="./ch02.html">第 2 章</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("locust/ch01.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
