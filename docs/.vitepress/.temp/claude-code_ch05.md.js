import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 5 章 · Bash 执行与自动化","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch05.md","filePath":"claude-code/ch05.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch05.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "Claude Code 对 ls 或 cat 这类只读 Bash 命令的默认行为是？",
        options: [
          "每次都需要用户确认",
          "自动允许不需要确认",
          "完全禁止执行",
          "只在 root 用户下允许"
        ],
        answer: 1,
        explain: "只读命令（ls/cat/grep/find/git status）被自动允许，因为它们不会修改系统状态。写操作才需要用户确认。"
      },
      {
        question: '在 .claude/settings.json 中配置 "Bash(pytest *)" 的含义是什么？',
        options: [
          "禁止运行任何 pytest 命令",
          "允许 Claude Code 自动运行以 pytest 开头的命令而不需要每次确认",
          "要求 pytest 必须在特定目录下运行",
          "将 pytest 输出保存到日志"
        ],
        answer: 1,
        explain: "allow 列表中的模式表示这些命令被预授权，Claude Code 可以自动执行而无需逐次确认，提升效率。"
      },
      {
        question: "--sandboxed 标志的作用是什么？",
        options: [
          "加速命令执行",
          "限制文件写入范围和网络访问，提供额外安全层",
          "禁用所有 Bash 命令",
          "启用调试日志"
        ],
        answer: 1,
        explain: "沙箱模式限制文件系统访问到工作目录内、网络请求需额外确认，适合处理不可信代码或谨慎场景。"
      },
      {
        question: "当 Claude Code 运行测试发现有失败时，最典型的 agentic 行为是什么？",
        options: [
          "报告失败然后等待用户指示",
          "自动分析失败原因、尝试修复代码、重跑测试",
          "回滚所有更改",
          "删除失败的测试文件"
        ],
        answer: 1,
        explain: "这正是 agentic 的核心——Claude Code 会读取失败输出，理解错误原因，修改相关代码，然后重跑验证，形成闭环。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-5-章-·-bash-执行与自动化" tabindex="-1">第 5 章 · Bash 执行与自动化 <a class="header-anchor" href="#第-5-章-·-bash-执行与自动化" aria-label="Permalink to &quot;第 5 章 · Bash 执行与自动化&quot;">​</a></h1><blockquote><p>本章目标：掌握 Bash 工具的使用方式与权限模型，理解安全沙箱机制，学会用 Claude Code 自动化构建/测试/部署流程。</p></blockquote><h2 id="_5-1-bash-工具基础" tabindex="-1">5.1 Bash 工具基础 <a class="header-anchor" href="#_5-1-bash-工具基础" aria-label="Permalink to &quot;5.1 Bash 工具基础&quot;">​</a></h2><p>Claude Code 能直接在终端执行 Shell 命令：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 运行项目的测试</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Claude Code 会：</p><ol><li>根据 CLAUDE.md 中的信息确定测试命令（如 <code>pytest tests/ -x</code>）</li><li>调用 Bash 工具执行</li><li>分析输出结果</li><li>如果有失败测试，自动修复并重跑</li></ol><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>正在运行 pytest tests/ -x --tb=short ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>======================== 14 passed in 2.35s ========================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>所有测试通过 ✅</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_5-2-权限模型" tabindex="-1">5.2 权限模型 <a class="header-anchor" href="#_5-2-权限模型" aria-label="Permalink to &quot;5.2 权限模型&quot;">​</a></h2><p>Bash 执行遵循分级权限策略：</p><table tabindex="0"><thead><tr><th>级别</th><th>行为</th><th>示例</th></tr></thead><tbody><tr><td><strong>自动允许</strong></td><td>只读操作</td><td><code>ls</code>, <code>cat</code>, <code>grep</code>, <code>find</code>, <code>git status</code></td></tr><tr><td><strong>需确认</strong></td><td>写入操作</td><td><code>pip install</code>, <code>npm install</code>, <code>git commit</code></td></tr><tr><td><strong>默认拒绝</strong></td><td>高危操作</td><td><code>rm -rf /</code>, \`curl</td></tr></tbody></table><h3 id="配置白名单" tabindex="-1">配置白名单 <a class="header-anchor" href="#配置白名单" aria-label="Permalink to &quot;配置白名单&quot;">​</a></h3><p>在项目 <code>.claude/settings.json</code> 中预授权常用命令：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;permissions&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;allow&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(npm run build)&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(npm test)&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(pytest *)&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(git add *)&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(ruff check *)&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    ],</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;deny&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(rm -rf /*)&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="_5-3-安全沙箱模式" tabindex="-1">5.3 安全沙箱模式 <a class="header-anchor" href="#_5-3-安全沙箱模式" aria-label="Permalink to &quot;5.3 安全沙箱模式&quot;">​</a></h2><p>使用 <code>--sandboxed</code> 标志限制文件系统和网络访问：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --sandboxed</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>沙箱模式下：</p><ul><li>文件写入限制在工作目录内</li><li>网络请求需要额外确认</li><li>系统目录只读</li></ul><p>适合处理不受信任的代码或运行不可预测的操作。</p><h2 id="_5-4-超时设置" tabindex="-1">5.4 超时设置 <a class="header-anchor" href="#_5-4-超时设置" aria-label="Permalink to &quot;5.4 超时设置&quot;">​</a></h2><p>长时间运行的命令可以设置超时：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 运行 docker-compose up 并等待 60 秒后检查状态</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Claude Code 默认有超时保护，防止无限阻塞。你也可以在提示中明确指定。</p><h2 id="_5-5-常见自动化场景" tabindex="-1">5.5 常见自动化场景 <a class="header-anchor" href="#_5-5-常见自动化场景" aria-label="Permalink to &quot;5.5 常见自动化场景&quot;">​</a></h2><h3 id="构建-测试-lint-一条龙" tabindex="-1">构建 + 测试 + Lint 一条龙 <a class="header-anchor" href="#构建-测试-lint-一条龙" aria-label="Permalink to &quot;构建 + 测试 + Lint 一条龙&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 运行完整的检查流程：先 lint，再 type check，最后跑测试。如果有任何失败就修复它。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="git-操作" tabindex="-1">Git 操作 <a class="header-anchor" href="#git-操作" aria-label="Permalink to &quot;Git 操作&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 提交当前更改，commit message 要描述清楚改了什么和为什么</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="环境搭建" tabindex="-1">环境搭建 <a class="header-anchor" href="#环境搭建" aria-label="Permalink to &quot;环境搭建&quot;">​</a></h3><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; 检查 Python 版本是否为 3.12，如果不是就帮我安装 pyenv 并切换</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Bash 工具让 Claude Code 直接执行 Shell 命令并分析结果；</li><li>三级权限：只读自动允许、写操作需确认、高危拒绝；</li><li><code>.claude/settings.json</code> 可配置白名单/黑名单；</li><li>沙箱模式提供额外安全层。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>让 Claude Code 运行你项目的完整测试套件。</li><li>在 settings.json 中配置常用命令白名单。</li><li>让它帮你提交一次 Git commit（观察确认流程）。</li></ol><blockquote><p>完成后进入<a href="./ch06.html">第 6 章</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch05.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
