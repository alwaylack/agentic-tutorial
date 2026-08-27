import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 14 章 · IDE 集成","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch14.md","filePath":"claude-code/ch14.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch14.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "在 VS Code 中选中代码后如何快速向 Claude 提问？",
        options: ["Ctrl+Q", '右键选择 "Ask Claude"', "F1", "双击代码"],
        answer: 1,
        explain: 'VS Code 扩展通过右键菜单的 "Ask Claude" 选项将选中的代码作为上下文发送给 Claude。'
      },
      {
        question: "哪个环境变量控制 Claude Code 使用哪个编辑器处理多行文本？",
        options: ["$TERMINAL", "$VISUAL", "$EDITOR", "$CODE_PATH"],
        answer: 2,
        explain: '$EDITOR 环境变量决定 Claude Code 打开哪个编辑器来处理多行文本输入。设置为 "code --wait" 可使用 VS Code。'
      },
      {
        question: '`keybindingFlavor: "readline"` 设置的作用是？',
        options: [
          "让 Claude 用 Readline 库生成回复",
          "让 Ctrl+W 按 Bash 习惯删除前一个单词",
          "启用 Vim 键绑定",
          "加快响应速度"
        ],
        answer: 1,
        explain: 'v2.1.238 引入此设置，设为 "readline" 后 Ctrl+W 的行为与 Bash 一致——删除从光标到上一个空白符的内容。'
      },
      {
        question: "Shift+Tab 在 Claude Code 中的作用是？",
        options: ["缩进", "切换权限模式", "搜索文件", "撤销"],
        answer: 1,
        explain: "Shift+Tab 循环切换三种权限模式：normal（每次确认）→ auto-accept（自动接受编辑）→ plan（只规划不执行）。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-14-章-·-ide-集成" tabindex="-1">第 14 章 · IDE 集成 <a class="header-anchor" href="#第-14-章-·-ide-集成" aria-label="Permalink to &quot;第 14 章 · IDE 集成&quot;">​</a></h1><blockquote><p>本章目标：掌握 Claude Code 与主流 IDE 的集成方式——VS Code 扩展、JetBrains 插件、终端内嵌联动，以及常用快捷键映射，实现&quot;编辑器内无缝调用 AI&quot;。</p></blockquote><h2 id="_14-1-vs-code-扩展" tabindex="-1">14.1 VS Code 扩展 <a class="header-anchor" href="#_14-1-vs-code-扩展" aria-label="Permalink to &quot;14.1 VS Code 扩展&quot;">​</a></h2><p>Claude Code 提供 VS Code 扩展，安装后可直接在编辑器侧边栏使用：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 方式一：命令面板安装</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Ctrl+Shift+P → Extensions → 搜索 &quot;Claude Code&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 方式二：CLI 安装</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> install-vscode</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>安装后，侧边栏会出现 Claude Code 图标。点击后可进行对话，扩展会自动感知当前打开的文件和工作区上下文。</p><p>核心能力：</p><ul><li><strong>选中代码提问</strong>：在编辑器中选中一段代码，右键选择 &quot;Ask Claude&quot;，对话会自动附带选中内容；</li><li><strong>内联差异预览</strong>：Claude 修改文件时，VS Code 以 diff 视图展示变更，你可以逐行接受或拒绝；</li><li><strong>终端共享</strong>：扩展与终端中的 <code>claude</code> 命令共享会话状态。</li></ul><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// .vscode/settings.json — 扩展配置示例</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;claude-code.autoStart&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;claude-code.defaultModel&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;sonnet&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;claude-code.showDiffOnEdit&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">true</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_14-2-jetbrains-插件" tabindex="-1">14.2 JetBrains 插件 <a class="header-anchor" href="#_14-2-jetbrains-插件" aria-label="Permalink to &quot;14.2 JetBrains 插件&quot;">​</a></h2><p>IntelliJ IDEA / WebStorm / PyCharm 等 JetBrains 系列 IDE 通过插件市场安装：</p><ol><li>打开 Settings → Plugins → Marketplace；</li><li>搜索 &quot;Claude Code&quot; 并安装；</li><li>重启 IDE，在右侧工具栏找到 Claude Code 面板。</li></ol><p>JetBrains 插件的核心功能与 VS Code 类似：代码选中询问、diff 审查、终端集成。额外支持 <strong>Action 提示</strong>（Alt+Enter）——在光标处快速调用 Claude 进行重构或修复。</p><h2 id="_14-3-终端内嵌编辑器联动" tabindex="-1">14.3 终端内嵌编辑器联动 <a class="header-anchor" href="#_14-3-终端内嵌编辑器联动" aria-label="Permalink to &quot;14.3 终端内嵌编辑器联动&quot;">​</a></h2><p>即使不装 IDE 扩展，Claude Code 在终端运行时也能感知你的编辑器环境：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude Code 自动检测 $EDITOR 并用其展示长文本</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">export</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> EDITOR</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;code --wait&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">claude</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>设置 <code>EDITOR</code> 后，Claude Code 在需要你编辑多行文本（如编写 CLAUDE.md 或提交消息）时，会自动在 VS Code 中打开临时文件，保存关闭后内容回传到 Claude Code。</p><h2 id="_14-4-快捷键映射" tabindex="-1">14.4 快捷键映射 <a class="header-anchor" href="#_14-4-快捷键映射" aria-label="Permalink to &quot;14.4 快捷键映射&quot;">​</a></h2><p>以下是 Claude Code 中最常用的键盘快捷键：</p><table tabindex="0"><thead><tr><th>快捷键</th><th>功能</th></tr></thead><tbody><tr><td><code>Ctrl+C</code></td><td>中断当前操作</td></tr><tr><td><code>Ctrl+D</code></td><td>退出会话</td></tr><tr><td><code>Escape</code></td><td>取消当前输入</td></tr><tr><td><code>Shift+Tab</code></td><td>切换权限模式（normal → auto-accept → plan）</td></tr><tr><td><code>Alt+M</code></td><td>多行输入模式切换</td></tr><tr><td><code>Ctrl+R</code></td><td>搜索历史对话</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">keybindingFlavor 设置</p><p>v2.1.238 引入了 <code>keybindingFlavor</code> 设置。将其设为 <code>&quot;readline&quot;</code> 可让 <code>Ctrl+W</code> 在提示框中按 Bash 习惯删除前一个单词（默认 <code>&quot;classic&quot;</code> 行为不变）：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;keybindingFlavor&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;readline&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>VS Code 扩展提供侧边栏对话、选中提问和 diff 预览；</li><li>JetBrains 插件支持 Alt+Enter 快速调用；</li><li><code>$EDITOR</code> 环境变量让 Claude Code 用你偏好的编辑器处理多行文本；</li><li><code>keybindingFlavor</code> 可自定义快捷键风格。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>安装 VS Code 扩展（或 JetBrains 插件），选中一段代码向 Claude 提问。</li><li>设置 <code>EDITOR</code> 环境变量为 <code>code --wait</code>，体验在 VS Code 中编辑提交消息。</li><li>尝试 <code>Shift+Tab</code> 切换三种权限模式，观察行为差异。</li></ol><blockquote><p>掌握 IDE 集成后，进入<a href="./ch15.html">第 15 章</a>学习 SDK 编程式调用。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch14.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
