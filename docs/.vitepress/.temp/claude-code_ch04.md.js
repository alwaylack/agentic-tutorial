import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 4 章 · 文件操作与代码编辑","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch04.md","filePath":"claude-code/ch04.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch04.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "Claude Code 中哪个工具用于精确替换已有文件中的文本？",
        options: ["Write", "Edit", "Patch", "Modify"],
        answer: 1,
        explain: "Edit 工具用于对已有文件做精确文本替换；Write 用于创建新文件或完全覆盖。"
      },
      {
        question: "当 Claude Code 要写入或修改文件时，默认行为是什么？",
        options: [
          "静默执行不需要确认",
          "展示 diff 让你确认后才执行",
          "需要输入管理员密码",
          "只允许在 Git 提交前修改"
        ],
        answer: 1,
        explain: "所有写操作都会先展示 diff 预览，用户可以选择接受(y)、拒绝(n)或手动编辑(e)。这是安全设计的核心。"
      },
      {
        question: "要在项目中搜索所有包含 TODO 注释的 Python 文件，应该使用什么？",
        options: ["Read", "Write", "Grep", "Bash"],
        answer: 2,
        explain: "Grep 工具支持正则表达式搜索文件内容，等效于 ripgrep。它是只读操作不需要用户确认。"
      },
      {
        question: '"把项目里所有 print 改成 logging.info" 这种跨多文件的任务，Claude Code 会怎么处理？',
        options: [
          "只改一个文件就停止",
          "一次性修改所有文件不给确认",
          "找到所有匹配位置，逐个文件展示 diff 并请求确认",
          "生成一个 shell 脚本让你手动运行"
        ],
        answer: 2,
        explain: "多文件修改时 Claude Code 会先定位所有匹配，然后逐个文件应用 Edit 并分别展示 diff 供确认。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-4-章-·-文件操作与代码编辑" tabindex="-1">第 4 章 · 文件操作与代码编辑 <a class="header-anchor" href="#第-4-章-·-文件操作与代码编辑" aria-label="Permalink to &quot;第 4 章 · 文件操作与代码编辑&quot;">​</a></h1><blockquote><p>本章目标：掌握 Claude Code 的文件读写工具链，理解 diff 预览确认流程，学会高效搜索代码库。</p></blockquote><h2 id="_4-1-文件工具概览" tabindex="-1">4.1 文件工具概览 <a class="header-anchor" href="#_4-1-文件工具概览" aria-label="Permalink to &quot;4.1 文件工具概览&quot;">​</a></h2><p>Claude Code 内置以下文件操作工具：</p><table tabindex="0"><thead><tr><th>工具</th><th>功能</th><th>需要确认</th></tr></thead><tbody><tr><td><strong>Read</strong></td><td>读取文件内容</td><td>❌</td></tr><tr><td><strong>Write</strong></td><td>创建新文件或覆盖</td><td>✅</td></tr><tr><td><strong>Edit</strong></td><td>精确替换已有文件中的文本</td><td>✅</td></tr><tr><td><strong>Grep</strong></td><td>正则搜索文件内容（类似 ripgrep）</td><td>❌</td></tr><tr><td><strong>Glob</strong></td><td>按模式匹配文件路径</td><td>❌</td></tr></tbody></table><h2 id="_4-2-read-读取文件" tabindex="-1">4.2 Read：读取文件 <a class="header-anchor" href="#_4-2-read-读取文件" aria-label="Permalink to &quot;4.2 Read：读取文件&quot;">​</a></h2><p>当你提问&quot;这个函数做什么&quot;时，Claude Code 自动调用 Read 获取文件内容：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; src/utils/parser.py 的 parse_config 函数是干什么的？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>它会：</p><ol><li>用 Read 读取 <code>src/utils/parser.py</code></li><li>分析函数逻辑</li><li>返回解释</li></ol><p>你也可以指定行号范围：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 读一下 app/models/user.py 的第 50-100 行</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_4-3-write-与-edit-创建和修改" tabindex="-1">4.3 Write 与 Edit：创建和修改 <a class="header-anchor" href="#_4-3-write-与-edit-创建和修改" aria-label="Permalink to &quot;4.3 Write 与 Edit：创建和修改&quot;">​</a></h2><h3 id="创建新文件" tabindex="-1">创建新文件 <a class="header-anchor" href="#创建新文件" aria-label="Permalink to &quot;创建新文件&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 在 src/utils/ 下创建一个 date_utils.py，包含格式化日期和解析日期字符串的函数</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Claude Code 会用 Write 创建文件，并在终端显示 diff 预览供你确认：</p><div class="language-diff vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+ src/utils/date_utils.py (new file)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+ from datetime import datetime, timezone</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+ def format_iso(dt: datetime) -&gt; str:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+     &quot;&quot;&quot;Format datetime to ISO 8601 string in UTC.&quot;&quot;&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">+     ...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>按 <code>y</code> 确认，<code>n</code> 拒绝，<code>e</code> 编辑后保存。</p><h3 id="修改已有文件" tabindex="-1">修改已有文件 <a class="header-anchor" href="#修改已有文件" aria-label="Permalink to &quot;修改已有文件&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 把 parser.py 里的 ValueError 改成自定义的 ConfigParseError</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Claude Code 使用 Edit 工具做精确文本替换，同样展示 diff。</p><h2 id="_4-4-grep-与-glob-搜索" tabindex="-1">4.4 Grep 与 Glob：搜索 <a class="header-anchor" href="#_4-4-grep-与-glob-搜索" aria-label="Permalink to &quot;4.4 Grep 与 Glob：搜索&quot;">​</a></h2><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 找出项目中所有使用了 deprecated 的 requests.get 的地方</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>内部执行等效于 <code>grep -rn &quot;requests.get&quot; --include=&quot;*.py&quot;</code>。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 有哪些文件名包含 test 的 Python 文件？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用 Glob 匹配 <code>**/test*.py</code>。</p><h2 id="_4-5-多文件原子操作" tabindex="-1">4.5 多文件原子操作 <a class="header-anchor" href="#_4-5-多文件原子操作" aria-label="Permalink to &quot;4.5 多文件原子操作&quot;">​</a></h2><p>Claude Code 能在一次任务中跨多个文件协调修改：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 把项目里的 print() 全部换成 logger.info()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>它会：</p><ol><li>用 Grep 找到所有 <code>print(</code> 出现位置</li><li>逐个文件用 Edit 替换</li><li>展示每个文件的 diff</li><li>你逐个确认</li></ol><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>五大文件工具：Read / Write / Edit / Grep / Glob；</li><li>写操作需要你确认 diff 后才生效；</li><li>多文件修改自动协调、逐个确认；</li><li>Grep/Glob 免费搜索，不消耗额外权限。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>让 Claude Code 创建一个新模块并编写测试。</li><li>让它把项目中某个旧 API 调用替换为新版本。</li><li>用搜索功能找出项目中所有硬编码的 URL。</li></ol><blockquote><p>完成后进入<a href="./ch05.html">第 5 章</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch04.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
