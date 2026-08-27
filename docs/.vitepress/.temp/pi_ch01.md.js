import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 1 章 · Pi 是什么：极简终端编码智能体","description":"","frontmatter":{},"headers":[],"relativePath":"pi/ch01.md","filePath":"pi/ch01.md","lastUpdated":1787480284000}');
const __default__ = { name: "pi/ch01.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "pi 默认给模型的四个工具是？",
        options: [
          "read、write、edit、bash",
          "read、grep、find、ls",
          "bash、git、edit、search",
          "read、write、run、deploy"
        ],
        answer: 0,
        explain: "官方文档明确：默认提供 read/write/edit/bash 四个工具；grep/find/ls 属于额外的只读工具，需通过工具选项开启。"
      },
      {
        question: "想在 shell 脚本里一次性向 pi 提问并拿到输出后退出，应使用？",
        options: ["交互模式", "RPC 模式", "pi -p 一次性模式", "必须写扩展才能实现"],
        answer: 2,
        explain: '`pi -p "提示词"` 即 Print 模式，专为一次性任务设计，还支持管道输入如 cat README.md | pi -p。'
      },
      {
        question: "关于 pi 的设计理念，下列说法正确的是？",
        options: [
          "子代理与计划模式是内置必备功能",
          "pi 不内置子代理等重特性，可通过扩展或第三方包按需加装",
          "pi 只能在有图形界面的机器上运行",
          "pi 的工具集合不可增减"
        ],
        answer: 1,
        explain: "README 明确写道：pi 默认提供强大的开箱即用能力，但刻意不做 sub agents（子代理）和 plan mode（计划模式），用户可让 pi 自己生成扩展或安装第三方包来补足。"
      },
      {
        question: '想把"团队统一的代码评审提示词"做成可复用资产，成本最低的方式是？',
        options: [
          "直接 fork pi 源码修改",
          "写一个 Prompt Template 提示词模板",
          "开发完整的 TypeScript 扩展",
          "每次手动粘贴到对话框"
        ],
        answer: 1,
        explain: "提示词模板只需一个 Markdown 文件即可通过 /模板名 复用；fork 源码成本最高且难升级，扩展适用于需要编程逻辑的场景。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-1-章-·-pi-是什么-极简终端编码智能体" tabindex="-1">第 1 章 · Pi 是什么：极简终端编码智能体 <a class="header-anchor" href="#第-1-章-·-pi-是什么-极简终端编码智能体" aria-label="Permalink to &quot;第 1 章 · Pi 是什么：极简终端编码智能体&quot;">​</a></h1><blockquote><p>本章目标：理解 pi 的&quot;harness（挽具）&quot;设计理念与四种运行模式，能说清它与 IDE 内置智能体、重型 Agent 框架的本质区别，并对五大扩展点建立全景认知。</p></blockquote><h2 id="_1-1-什么是编码智能体的-harness" tabindex="-1">1.1 什么是编码智能体的&quot;harness&quot; <a class="header-anchor" href="#_1-1-什么是编码智能体的-harness" aria-label="Permalink to &quot;1.1 什么是编码智能体的&quot;harness&quot;&quot;">​</a></h2><p>在 AI 编码工具的语境里，<strong>harness</strong> 指&quot;套在模型外面的那层马具&quot;：它把模型接上工具（读写文件、执行命令）、管理对话上下文与会话持久化，然后把控制权交还给模型。harness 本身不规定工作流，只提供可靠的执行底座。</p><p>pi 的设计哲学是<strong>最小核心 + 按需扩展</strong>：</p><ul><li>核心默认只给模型 <strong>4 个工具</strong>：<code>read</code>（读文件）、<code>write</code>（写文件）、<code>edit</code>(补丁修改)、<code>bash</code>（执行命令）——模型用它们组合出几乎一切能力；</li><li>另有一组只读工具（<code>grep</code>、<code>find</code>、<code>ls</code>）可通过工具选项开启；</li><li>子代理、计划模式这类&quot;重特性&quot;<strong>故意不做进核心</strong>，需要时让 pi 自己帮你写一个扩展，或安装第三方 pi 包。</li></ul><p>这与很多&quot;全家桶&quot;式工具形成鲜明对比：全家桶替你决定工作流，功能越多菜单越乱；pi 则主张<strong>让 pi 适配你的工作流，而不是反过来</strong>。</p><h2 id="_1-2-四种运行模式" tabindex="-1">1.2 四种运行模式 <a class="header-anchor" href="#_1-2-四种运行模式" aria-label="Permalink to &quot;1.2 四种运行模式&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模式</th><th>启动方式</th><th>适用场景</th></tr></thead><tbody><tr><td>交互模式（TUI）</td><td><code>pi</code></td><td>日常人机结对编程</td></tr><tr><td>Print 模式</td><td><code>pi -p &quot;提示词&quot;</code></td><td>一次性任务、shell 管道</td></tr><tr><td>JSON 模式</td><td><code>pi --mode json</code></td><td>程序解析事件流</td></tr><tr><td>RPC 模式</td><td><code>pi --mode rpc</code></td><td>被其他进程集成驱动</td></tr><tr><td>SDK</td><td>在 Node 应用中引入</td><td>把 pi 嵌入你自己的产品</td></tr></tbody></table><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 交互模式：进入当前项目目录直接启动</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">cd</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> /path/to/project</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Print 模式：一次性提问，输出后退出</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;总结这个仓库的目录结构&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 管道输入也支持</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">cat</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> README.md</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> |</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;用三句话概括这份文档&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>同一套模型配置、会话存储和扩展体系贯穿四种模式——你在交互模式里调好的 provider 配置，脚本模式里同样生效。后续章节会逐一深入：第 4 章讲交互模式，第 5 章讲会话，第 14–16 章讲 SDK/RPC/JSON 与自动化。</p><h2 id="_1-3-与-ide-内置智能体、重型框架的对比" tabindex="-1">1.3 与 IDE 内置智能体、重型框架的对比 <a class="header-anchor" href="#_1-3-与-ide-内置智能体、重型框架的对比" aria-label="Permalink to &quot;1.3 与 IDE 内置智能体、重型框架的对比&quot;">​</a></h2><p><strong>vs IDE 内置智能体（如 VS Code Copilot Chat）</strong></p><ul><li>IDE 智能体深度绑定图形界面与厂商托管服务；pi 是纯终端程序，SSH 到远程服务器照样能用；</li><li>IDE 智能体的行为定制空间有限；pi 的编辑器、快捷键、系统提示、工具集全部可替换或扩展。</li></ul><p><strong>vs 重型 Agent 框架（LangGraph/CrewAI 等）</strong></p><ul><li>那类框架解决的是&quot;如何编排多个 LLM 调用&quot;，你要自己搭会话持久化、上下文压缩、UI；</li><li>pi 直接给你一个生产可用的终端智能体，同时暴露 SDK/RPC 让你编程接管——相当于&quot;编排框架 + 成品客户端&quot;二合一。</li></ul><div class="tip custom-block"><p class="custom-block-title">一句话定位</p><p>pi = 极简内核的终端编码智能体 + TypeScript 扩展系统 + 可嵌入 SDK。它既是日常工具，也是构建你自己智能体产品的地基。</p></div><h2 id="_1-4-五大扩展点全景" tabindex="-1">1.4 五大扩展点全景 <a class="header-anchor" href="#_1-4-五大扩展点全景" aria-label="Permalink to &quot;1.4 五大扩展点全景&quot;">​</a></h2><p>pi 的可定制性由五个层次组成，复杂度从低到高：</p><ol><li><strong>Prompt Templates（提示词模板）</strong>：Markdown 文件定义可复用的提示词，<code>/模板名</code> 展开注入；</li><li><strong>Skills（技能）</strong>：带元数据的技能包（SKILL.md），按需被模型发现并加载，以 <code>/skill:名称</code> 显式调用；</li><li><strong>Extensions（扩展）</strong>：TypeScript 程序，可注册自定义斜杠命令、自定义工具、替换编辑器 UI、拦截事件；</li><li><strong>Themes（主题）</strong>：终端配色方案；</li><li><strong>Pi Packages（包）</strong>：把以上资源打包成 npm/git 包分发安装。</li></ol><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>定制成本低 ◄──────────────────────────────► 定制能力强</span></span>
<span class="line"><span> [Prompt Templates] → [Skills] → [Themes] → [Extensions] → [Pi Packages]</span></span>
<span class="line"><span>   提示词复用        能力注入    外观换肤     行为编程        打包分享</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>本教程将按此顺序逐章展开（第 8–13 章）。核心心法：<strong>能用模板解决的不写技能，能用技能解决的不写扩展</strong>。</p><h2 id="_1-5-适用与不适用场景" tabindex="-1">1.5 适用与不适用场景 <a class="header-anchor" href="#_1-5-适用与不适用场景" aria-label="Permalink to &quot;1.5 适用与不适用场景&quot;">​</a></h2><p>适合用 pi：</p><ul><li>终端为主力工作环境的开发者，尤其在远程服务器/容器内作业；</li><li>希望精确控制智能体能做什么（工具白名单、项目信任机制）的团队；</li><li>想把编码智能体嵌入自家产品（SDK/RPC）的团队；</li><li>对订阅账号敏感、想自由切换几十家模型供应商的重度用户。</li></ul><p>不太适合：</p><ul><li>完全没有命令行经验、只想点按钮的用户（先去用 IDE 内置智能体）；</li><li>需要 GUI 代码评审界面的场景（pi 的输出是文本流，可配合 <code>/share</code> 导出 HTML 分享）。</li></ul><h2 id="_1-6-本章小结" tabindex="-1">1.6 本章小结 <a class="header-anchor" href="#_1-6-本章小结" aria-label="Permalink to &quot;1.6 本章小结&quot;">​</a></h2><ul><li>pi 是极简终端编码 harness：4 个默认工具 + 按需扩展，不预设工作流；</li><li>五种形态：交互 TUI、Print、JSON、RPC、SDK，配置与会话全线打通；</li><li>相比 IDE 智能体更开放可远程，相比编排框架更是开箱即用的成品；</li><li>扩展点五层：模板 → 技能 → 主题 → 扩展 → 包，成本递增按需选用。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>通读 pi 仓库 README 的 Philosophy（哲学）一节，用自己的话写下 3 条 pi 与你所熟悉工具的差异。</li><li>列出你最近一周的 3 个编码任务，判断各自适合哪种运行模式（交互/Print/JSON/RPC）。</li><li>浏览 <code>~/.pi/agent/</code> 目录（若已安装），确认 settings.json、sessions/ 等结构是否与本章描述一致。</li></ol><blockquote><p>准备好了就进入<a href="./ch02.html">下一章：安装与快速上手</a>，把 pi 跑起来。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/ch01.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
