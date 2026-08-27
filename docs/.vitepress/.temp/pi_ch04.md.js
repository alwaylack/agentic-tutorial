import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 4 章 · 交互模式：编辑器/命令/快捷键","description":"","frontmatter":{},"headers":[],"relativePath":"pi/ch04.md","filePath":"pi/ch04.md","lastUpdated":1787834555000}');
const __default__ = { name: "pi/ch04.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "模型正在执行任务时按 Enter 提交消息，效果是？",
        options: [
          "立即打断并丢弃当前工作",
          "作为 steering 消息，在当前轮工具调用结束后送达",
          "被静默忽略",
          "等全部工作完成后才送达"
        ],
        answer: 1,
        explain: "Enter 排队的是 steering 消息，会在当前助手回合的工具调用执行完后立刻送达以实现中途纠偏；等全部完成才送达的是 Alt+Enter 的 follow-up 消息。"
      },
      {
        question: "想粘贴一张截图给模型分析 UI，正确的操作是？",
        options: ["只能用文件路径引用", "Ctrl+V 粘贴或把图片拖进终端", "必须写扩展", "pi 不支持图片"],
        answer: 1,
        explain: "编辑器支持 Ctrl+V 粘贴图片/文本（Windows Terminal 上为 Alt+V），也支持把图片直接拖入受支持的终端。"
      },
      {
        question: "关于 !!command 与 !command 的区别，正确的是？",
        options: [
          "两者完全相同",
          "!command 的输出发给模型，!!command 只在本地执行不进入模型上下文",
          "!!command 用于管理员权限",
          "!command 不能执行任何命令"
        ],
        answer: 1,
        explain: "单叹号会把命令输出加入模型上下文；双叹号纯粹本地执行，适合查看大输出而不浪费 token。"
      },
      {
        question: "Escape 连按两次会触发什么？",
        options: ["退出 pi", "清空编辑器", "打开 /tree 会话树导航", "切换模型"],
        answer: 2,
        explain: "常用快捷键表中：单击 Escape 取消/中止，双击 Escape 打开 /tree；退出是 Ctrl+C 连按两次或 /quit。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-4-章-·-交互模式-编辑器-命令-快捷键" tabindex="-1">第 4 章 · 交互模式：编辑器/命令/快捷键 <a class="header-anchor" href="#第-4-章-·-交互模式-编辑器-命令-快捷键" aria-label="Permalink to &quot;第 4 章 · 交互模式：编辑器/命令/快捷键&quot;">​</a></h1><blockquote><p>本章目标：熟悉 TUI 界面分区与编辑器能力，掌握常用斜杠命令与快捷键，学会用消息队列在模型工作时&quot;排队插话&quot;，并完成终端兼容性配置。</p></blockquote><h2 id="_4-1-tui-布局一览" tabindex="-1">4.1 TUI 布局一览 <a class="header-anchor" href="#_4-1-tui-布局一览" aria-label="Permalink to &quot;4.1 TUI 布局一览&quot;">​</a></h2><p>交互模式界面自上而下分四个区域：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ Startup header  快捷键提示/已加载的 AGENTS.md │</span></span>
<span class="line"><span>│                 /模板/技能/扩展 清单           │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ Messages        用户消息/回复/工具调用与结果    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ Editor          输入区(边框颜色指示思考等级)    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────┤</span></span>
<span class="line"><span>│ Footer          目录/会话名/token与费用/当前模型│</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Footer 的统计值得专门认识：<code>↑</code> 输入 token、<code>↓</code> 输出 token、<code>R</code> 缓存读、<code>W</code> 缓存写、<code>CH</code> 最近缓存命中率——这是控制成本的第一仪表盘。编辑器可能被临时替换（如内置 <code>/settings</code> 面板，或扩展提供的结构化问答 UI）。</p><h2 id="_4-2-编辑器的六项核心能力" tabindex="-1">4.2 编辑器的六项核心能力 <a class="header-anchor" href="#_4-2-编辑器的六项核心能力" aria-label="Permalink to &quot;4.2 编辑器的六项核心能力&quot;">​</a></h2><table tabindex="0"><thead><tr><th>功能</th><th>操作</th></tr></thead><tbody><tr><td>文件引用</td><td>输入 <code>@</code> 模糊搜索项目文件</td></tr><tr><td>路径补全</td><td><code>Tab</code></td></tr><tr><td>多行输入</td><td>Shift+Enter（Windows Terminal 用 Ctrl+Enter）</td></tr><tr><td>外部编辑器</td><td>Ctrl+G 打开 <code>$VISUAL</code>/<code>$EDITOR</code>（Windows 为 Notepad，兜底 nano）</td></tr><tr><td>粘贴图片/文本</td><td>Ctrl+V（Windows 用 Alt+V），或直接拖图进终端</td></tr><tr><td>执行 shell 命令</td><td><code>!command</code> 输出发给模型；<code>!!command</code> 不发给模型</td></tr></tbody></table><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 典型流：外部编辑器写长提示词 → 引用文件 → 提交</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Ctrl+G 打开 vim 写一段复杂的重构需求，保存退出后自动回到编辑器</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">把长提示词交给趁手的编辑器</p><p>超过三四行的需求描述建议 Ctrl+G 进外部编辑器书写：有语法高亮、可反复修改，比在小编辑框里挤一行高效得多。</p></div><h2 id="_4-3-常用斜杠命令清单" tabindex="-1">4.3 常用斜杠命令清单 <a class="header-anchor" href="#_4-3-常用斜杠命令清单" aria-label="Permalink to &quot;4.3 常用斜杠命令清单&quot;">​</a></h2><p>输入 <code>/</code> 触发命令补全（扩展可注册新命令、技能以 <code>/skill:名称</code> 出现、模板以 <code>/模板名</code> 展开）。日常最常用：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/model            切换模型          /resume      选择历史会话</span></span>
<span class="line"><span>/new              新建会话          /name &lt;名&gt;   给会话命名</span></span>
<span class="line"><span>/session          查看当前会话信息   /tree        会话树导航</span></span>
<span class="line"><span>/fork             从历史消息分叉     /clone       克隆当前分支为新会话</span></span>
<span class="line"><span>/compact [指令]   手动压缩上下文     /copy        复制上一条回复</span></span>
<span class="line"><span>/export [文件]    导出 HTML/JSONL   /share       上传为私有 GitHub gist</span></span>
<span class="line"><span>/hotkeys          显示全部快捷键     /quit        退出</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>管理类还有 <code>/login</code>、<code>/logout</code>（凭据）、<code>/settings</code>（思考等级/主题/消息投递/传输方式）、<code>/trust</code>（保存项目信任）、<code>/reload</code>（重载快捷键/扩展/技能/模板/主题/上下文文件）。</p><blockquote><p>💡 <strong>思考等级选择器（0.84.3+）</strong>：输入 <code>/thinking</code> 可打开带搜索的思考等级选择器（off/minimal/low/medium/high/xhigh/max），回车仅会话内生效，<code>Ctrl+S</code> 保存为全局默认；快捷键 <code>shift+tab</code> 可直接循环切换思考等级，<code>ctrl+t</code> 折叠/展开思考块。</p></blockquote><h2 id="_4-4-高频快捷键" tabindex="-1">4.4 高频快捷键 <a class="header-anchor" href="#_4-4-高频快捷键" aria-label="Permalink to &quot;4.4 高频快捷键&quot;">​</a></h2><table tabindex="0"><thead><tr><th>按键</th><th>动作</th></tr></thead><tbody><tr><td>Ctrl+C</td><td>清空编辑器；连按两次退出</td></tr><tr><td>Escape</td><td>取消/中断当前生成</td></tr><tr><td>Escape×2</td><td>打开 <code>/tree</code> 会话树</td></tr><tr><td>Ctrl+L</td><td>模型选择器</td></tr><tr><td>Ctrl+P / Shift+Ctrl+P</td><td>scoped models 正反循环</td></tr><tr><td>Shift+Tab</td><td>循环思考等级</td></tr><tr><td>Ctrl+O</td><td>折叠/展开工具输出</td></tr><tr><td>Ctrl+T</td><td>折叠/展开思考块</td></tr><tr><td>Ctrl+X</td><td>复制最后一条助手消息</td></tr></tbody></table><p>所有快捷键可通过 <code>~/.pi/agent/keybindings.json</code> 重映射，格式为 <code>修饰键+键位</code>（如 <code>ctrl+shift+x</code>），完整动作表用 <code>/hotkeys</code> 查看：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;tui.editor.historyPrevious&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;ctrl+p&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;tui.input.submit&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;enter&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>注意官方提醒：把 <code>tui.editor.historyPrevious</code> 绑到 <code>ctrl+p</code> 后，在该编辑器上下文里 Ctrl+P 将不再用于模型循环。</p><h2 id="_4-5-消息队列-模型干活时怎么插话" tabindex="-1">4.5 消息队列：模型干活时怎么插话 <a class="header-anchor" href="#_4-5-消息队列-模型干活时怎么插话" aria-label="Permalink to &quot;4.5 消息队列：模型干活时怎么插话&quot;">​</a></h2><p>模型正在执行时你仍可提交消息，两种排队语义：</p><ul><li><strong>Enter</strong> = steering（转向）消息：当前轮工具调用结束后立即送达，适合中途纠偏；</li><li><strong>Alt+Enter</strong> = follow-up（跟进）消息：等智能体全部工作完成后才送达，适合追加下一步任务；</li><li><strong>Escape</strong> 中止并把队列里的消息退回编辑器；<strong>Alt+Up</strong> 取回排队消息。</li></ul><p>投递节奏可在 <code>/settings</code> 或 settings.json 配置：<code>steeringMode</code> 与 <code>followUpMode</code> 均默认 <code>&quot;one-at-a-time&quot;</code>（逐条等待响应），改为 <code>&quot;all&quot;</code> 则一次性全部送达。<code>transport</code> 可指定支持多传输方式的 provider 使用 <code>&quot;sse&quot;</code> / <code>&quot;websocket&quot;</code> / <code>&quot;auto&quot;</code>。</p><h2 id="_4-6-终端兼容性配置" tabindex="-1">4.6 终端兼容性配置 <a class="header-anchor" href="#_4-6-终端兼容性配置" aria-label="Permalink to &quot;4.6 终端兼容性配置&quot;">​</a></h2><p>pi 依赖 Kitty keyboard protocol 做可靠的修饰键识别：</p><ul><li><strong>Kitty / iTerm2 常规模式</strong>：开箱即用；</li><li><strong>iTerm2 全屏模式</strong>触控板滚动过慢：设置 → Advanced → 搜索 &quot;Trackpad scrolls fast?&quot; 设为 No；</li><li><strong>Apple Terminal</strong>：本地回退机制可把普通 Return 当 Shift+Enter 处理，但 SSH 远程场景无效；</li><li><strong>Windows Terminal</strong> 的 Alt+Enter 默认是全屏，需要按 terminal-setup 文档重映射后才能用作 follow-up 快捷键。</li></ul><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>TUI 四分区：header/messages/editor/footer，footer 是成本仪表盘；</li><li>编辑器六大能力：@ 引用、Tab 补全、Shift+Enter 多行、Ctrl+G 外部编辑器、Ctrl+V 贴图、! 执行命令；</li><li>消息队列区分 steering（Enter，即时纠偏）与 follow-up（Alt+Enter，完工后执行）；</li><li>快捷键皆可在 keybindings.json 重映射，<code>/hotkeys</code> 是权威清单；</li><li>终端需支持 Kitty keyboard protocol，Windows Terminal 要手动处理 Alt+Enter 冲突。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>用 Ctrl+G 在外部编辑器里写一个不少于 10 行的重构需求提交给 pi，对比小编辑框的体验差异。</li><li>让 pi 执行一个较长的任务，期间分别用 Enter 和 Alt+Enter 各排一条消息，观察两者的送达时机差异。</li><li>把 <code>/tree</code> 重映射到你喜欢的按键组合，并用 <code>/hotkeys</code> 验证生效。</li></ol><blockquote><p>进入<a href="./ch05.html">下一章：会话管理</a>，让每一次工作都可追溯、可回滚。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/ch04.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
