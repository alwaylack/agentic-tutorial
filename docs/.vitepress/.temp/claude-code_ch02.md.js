import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 2 章 · 基本对话与代码生成","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch02.md","filePath":"claude-code/ch02.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch02.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "哪个命令可以清空当前对话历史？",
        options: ["/reset", "/clear", "/new", "/flush"],
        answer: 1,
        explain: "/clear 清空当前对话历史；/compact 是压缩（不是清空）上下文；/reset 不是有效命令。"
      },
      {
        question: "当对话很长导致上下文接近上限时，应该使用什么命令？",
        options: ["/clear", "/compact", "/save", "/truncate"],
        answer: 1,
        explain: "/compact 会压缩当前对话为摘要，保留关键信息但释放 token 空间，适合长会话场景。"
      },
      {
        question: "以下哪种提问方式最有可能获得高质量代码？",
        options: [
          '"帮我写个脚本"',
          '"用 Python 3.11 写一个异步函数，用 httpx 抓取网页标题并处理超时"',
          '"给我一些代码"',
          '"解决我的问题"'
        ],
        answer: 1,
        explain: "具体指定语言、版本、库、功能和错误处理要求，能让模型精确匹配你的需求。"
      },
      {
        question: "如何查看当前会话消耗了多少 token？",
        options: ["/tokens", "/usage", "/cost", "/stats"],
        answer: 2,
        explain: "/cost 命令显示当前会话的 token 用量和费用估算，帮助你监控成本。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-2-章-·-基本对话与代码生成" tabindex="-1">第 2 章 · 基本对话与代码生成 <a class="header-anchor" href="#第-2-章-·-基本对话与代码生成" aria-label="Permalink to &quot;第 2 章 · 基本对话与代码生成&quot;">​</a></h1><blockquote><p>本章目标：掌握交互式 REPL 的使用方法，学会有效提问以生成高质量代码，理解上下文理解能力。</p></blockquote><h2 id="_2-1-交互式-repl-基础" tabindex="-1">2.1 交互式 REPL 基础 <a class="header-anchor" href="#_2-1-交互式-repl-基础" aria-label="Permalink to &quot;2.1 交互式 REPL 基础&quot;">​</a></h2><p>在项目目录中启动 <code>claude</code> 后，你进入一个交互式对话环境：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭───────────────────────────────────╮</span></span>
<span class="line"><span>│ Welcome to Claude Code!           │</span></span>
<span class="line"><span>│                                   │</span></span>
<span class="line"><span>│ /help for help                    │</span></span>
<span class="line"><span>│ Type your request and press Enter │</span></span>
<span class="line"><span>╰───────────────────────────────────╯</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="常用快捷键与命令" tabindex="-1">常用快捷键与命令 <a class="header-anchor" href="#常用快捷键与命令" aria-label="Permalink to &quot;常用快捷键与命令&quot;">​</a></h3><table tabindex="0"><thead><tr><th>快捷键/命令</th><th>功能</th></tr></thead><tbody><tr><td><code>Enter</code></td><td>发送消息</td></tr><tr><td><code>Shift+Tab</code></td><td>多行输入模式</td></tr><tr><td><code>Ctrl+C</code></td><td>取消当前操作或退出</td></tr><tr><td><code>/clear</code></td><td>清空对话历史</td></tr><tr><td><code>/compact</code></td><td>压缩上下文（长会话时节省 token）</td></tr><tr><td><code>/help</code></td><td>查看帮助</td></tr><tr><td><code>/cost</code></td><td>查看当前会话 token 用量</td></tr><tr><td><code>/exit</code></td><td>退出</td></tr></tbody></table><h2 id="_2-2-直接提问与代码生成" tabindex="-1">2.2 直接提问与代码生成 <a class="header-anchor" href="#_2-2-直接提问与代码生成" aria-label="Permalink to &quot;2.2 直接提问与代码生成&quot;">​</a></h2><p>Claude Code 能理解自然语言描述并生成代码：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 写一个 Python 函数，解析 CSV 文件并返回指定列的去重值列表</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>输出示例：</p><div class="language-python vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> csv</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> typing </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Any</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">def</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> get_unique_column_values</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(filepath: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">str</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, column_name: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">str</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) -&gt; list[Any]:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">    &quot;&quot;&quot;读取 CSV 文件并返回指定列的去重值列表。&quot;&quot;&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    values </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> set</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    with</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> open</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(filepath, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">newline</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">encoding</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;utf-8&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">) </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">as</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> f:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">        reader </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> csv.DictReader(f)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">        for</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> row </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> reader:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">            if</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> column_name </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">in</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> row:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">                values.add(row[column_name])</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">    return</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> sorted</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(values)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">提问技巧</p><ul><li><strong>具体</strong>：&quot;写一个函数解析 CSV 并返回列去重值&quot; 比 &quot;帮我处理 CSV&quot; 效果好</li><li><strong>提供约束</strong>：指定语言、框架、错误处理方式</li><li><strong>给出上下文</strong>：告诉它项目用的 Python 版本、依赖库</li></ul></div><h2 id="_2-3-上下文理解能力" tabindex="-1">2.3 上下文理解能力 <a class="header-anchor" href="#_2-3-上下文理解能力" aria-label="Permalink to &quot;2.3 上下文理解能力&quot;">​</a></h2><p>Claude Code 会自动扫描项目目录来理解代码库：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 这个项目的 API 端点有哪些？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>它会：</p><ol><li>扫描目录结构</li><li>查找路由定义文件</li><li>解析代码提取端点列表</li><li>以表格形式返回结果</li></ol><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>找到以下 API 端点：</span></span>
<span class="line"><span>| 方法 | 路径 | 说明 |</span></span>
<span class="line"><span>|---|---|---|</span></span>
<span class="line"><span>| GET | /api/users | 获取用户列表 |</span></span>
<span class="line"><span>| POST | /api/users | 创建新用户 |</span></span>
<span class="line"><span>| GET | /api/users/{id} | 获取单个用户 |</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_2-4-输出格式" tabindex="-1">2.4 输出格式 <a class="header-anchor" href="#_2-4-输出格式" aria-label="Permalink to &quot;2.4 输出格式&quot;">​</a></h2><p>Claude Code 的回复使用 Markdown 格式：</p><ul><li><strong>代码块</strong>：带语言标签的 fenced code block，可直接复制</li><li><strong>表格</strong>：结构化数据展示</li><li><strong>列表</strong>：步骤和要点</li><li><strong>粗体</strong>：关键概念高亮</li></ul><h2 id="_2-5-追问与迭代" tabindex="-1">2.5 追问与迭代 <a class="header-anchor" href="#_2-5-追问与迭代" aria-label="Permalink to &quot;2.5 追问与迭代&quot;">​</a></h2><p>你可以对生成的代码持续追问和修改：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 加上类型注解</span></span>
<span class="line"><span>&gt; 给这个函数写单元测试</span></span>
<span class="line"><span>&gt; 把异常处理改成抛出自定义异常而不是 ValueError</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>每轮对话都保留之前的上下文，Claude Code 知道你在说哪个函数。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>使用 <code>claude</code> 进入 REPL，<code>/clear</code> 清空历史，<code>/compact</code> 压缩上下文；</li><li>提问要具体，提供语言/框架/约束等上下文；</li><li>Claude Code 自动扫描项目目录理解代码库；</li><li>支持多轮追问和迭代修改。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在项目中用 Claude Code 生成一个工具函数，然后追问添加测试。</li><li>让它列出你项目中的所有环境变量引用。</li><li>用 <code>/cost</code> 查看当前会话的 token 用量。</li></ol><blockquote><p>完成后进入<a href="./ch03.html">第 3 章</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch02.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
