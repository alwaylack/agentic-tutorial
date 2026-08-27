import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 18 章 · 安全模型与环境变量","description":"","frontmatter":{},"headers":[],"relativePath":"pi/ch18.md","filePath":"pi/ch18.md","lastUpdated":1787480284000}');
const __default__ = { name: "pi/ch18.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "下列哪一项不会触发项目信任确认？",
        options: [
          ".pi/settings.json",
          ".pi/extensions 目录",
          "一个空的 .pi 目录",
          ".pi/SYSTEM.md"
        ],
        answer: 2,
        explain: "官方 security 文档明确：仅有一个空的 .pi 目录并不算需要信任的项目资源——必须包含列出的具体资源才需要信任。"
      },
      {
        question: '非交互模式下 defaultProjectTrust 取默认值 "ask" 时，项目资源会被？',
        options: [
          "弹出确认框",
          "自动信任",
          "忽略（不加载）",
          "只加载一半"
        ],
        answer: 2,
        explain: "ask 与 never 在非交互模式下都会忽略需信任的项目资源；只有 always 才会加载。交互模式下 ask 才表现为弹窗询问。"
      },
      {
        question: "为什么官方不建议用进程内沙箱替代容器隔离？",
        options: [
          "实现成本太高",
          "进程内沙箱仍依赖宿主 shell/文件系统/凭据/扩展，易被误解为安全边界",
          "与 bash 工具冲突",
          "会拖慢模型响应"
        ],
        answer: 1,
        explain: "官方原文指出，部分 in-process（进程内）沙箱容易被误解为安全边界，真正的隔离必须来自操作系统或虚拟化/容器边界。"
      },
      {
        question: "关于 bash 工具的会话环境变量，下列说法正确的是？",
        options: [
          "用户手动输入的 ! 命令也能拿到 PI_SESSION_ID",
          "PI_SESSION_FILE 在临时会话（--no-session）下不会设置",
          "PI_MODEL 记录的是路由器内部实际调用的模型",
          "这些变量在 pi 启动时固定，切换模型后不更新"
        ],
        answer: 1,
        explain: "官方说明 PI_SESSION_FILE 对 ephemeral 会话 unset；! 与 !! 是用户命令不注入这些变量；PI_MODEL 标识 pi 选中的模型而非路由内部模型；且变量在每条命令启动时解析，切换模型即生效。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-18-章-·-安全模型与环境变量" tabindex="-1">第 18 章 · 安全模型与环境变量 <a class="header-anchor" href="#第-18-章-·-安全模型与环境变量" aria-label="Permalink to &quot;第 18 章 · 安全模型与环境变量&quot;">​</a></h1><blockquote><p>本章目标：建立对 pi 威胁模型的正确认知——它&quot;信任本地用户、不信任仓库内容&quot;，学会用项目信任机制、容器隔离与环境变量管理把风险压到可接受范围。</p></blockquote><h2 id="_18-1-威胁模型-本地信任边界" tabindex="-1">18.1 威胁模型：本地信任边界 <a class="header-anchor" href="#_18-1-威胁模型-本地信任边界" aria-label="Permalink to &quot;18.1 威胁模型：本地信任边界&quot;">​</a></h2><p>官方 security 文档开宗明义：<strong>pi 以启动它的用户账号的全部权限运行</strong>，该用户可写的文件都在同一本地信任边界内。这意味着三类典型风险：</p><ol><li><strong>提示注入（Prompt Injection）</strong>——仓库里的 README、代码注释、构建输出都可能包含&quot;指令&quot;，被模型读进上下文后诱导它执行危险操作。官方原话：这是本地 agent 的<strong>预期风险</strong>，pi 无法可靠阻止；</li><li><strong>恶意仓库</strong>——clone 下来的项目可能带 <code>.pi/settings.json</code>、恶意扩展或技能，在你不知情时改变 pi 行为；</li><li><strong>命令执行</strong>——<code>bash</code> 工具以你的身份跑任意命令，没有内置确认弹窗（Philosophy 明确 &quot;No permission popups&quot;）。</li></ol><p>对应的防线是三层的：<strong>项目信任（输入加载闸门）→ 工具开关（行为约束）→ 容器隔离（真正的边界）</strong>。上一章讲的工具开关只是第二层，本章讲一三两层。</p><h2 id="_18-2-项目信任机制-project-trust" tabindex="-1">18.2 项目信任机制（Project Trust） <a class="header-anchor" href="#_18-2-项目信任机制-project-trust" aria-label="Permalink to &quot;18.2 项目信任机制（Project Trust）&quot;">​</a></h2><p>项目信任决定&quot;pi 是否加载这个项目自带的配置与扩展&quot;。当 pi 在项目里发现以下任一内容时，就认为该项目&quot;含有需要信任的资源&quot;：</p><ul><li><code>.pi/settings.json</code></li><li><code>.pi/extensions</code>、<code>.pi/skills</code>、<code>.pi/prompts</code>、<code>.pi/themes</code></li><li><code>.pi/SYSTEM.md</code> 或 <code>.pi/APPEND_SYSTEM.md</code></li><li>当前目录或祖先目录的项目级 <code>.agents/skills</code></li></ul><div class="warning custom-block"><p class="custom-block-title">裸 .pi 目录不算</p><p>只有一个空的 <code>.pi</code> 目录不触发信任确认——判断依据是上面列出的具体资源。</p></div><p>信任决定保存在 <code>~/.pi/agent/trust.json</code>（按目录记录），<strong>最近的祖先目录决定优先于全局默认值</strong>。交互模式下会弹出询问；非交互模式（<code>-p</code>/json/rpc）不询问，回退到全局设置 <code>defaultProjectTrust</code>：</p><table tabindex="0"><thead><tr><th>取值</th><th>非交互行为</th></tr></thead><tbody><tr><td><code>&quot;ask&quot;</code>（默认）</td><td>忽略需信任的项目资源</td></tr><tr><td><code>&quot;never&quot;</code></td><td>忽略需信任的项目资源</td></tr><tr><td><code>&quot;always&quot;</code></td><td>信任并加载</td></tr></tbody></table><p>单次运行可用 <code>-a</code>/<code>--approve</code> 强制信任、<code>-na</code>/<code>--no-approve</code> 强制忽略：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># CI 中信任自家仓库的项目配置（确认仓库可信时）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -a</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;运行项目自带的检查&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 审计陌生仓库：忽略其全部项目资源 + 只读工具</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -na</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -t</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> read,grep,find,ls</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -p</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;这个项目是干什么的？&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>关键认知：<strong>信任只是输入加载闸门</strong>。它防止仓库在你批准前悄悄改掉 pi 的设置和扩展，但不会让不可信代码、提示注入或模型输出变得安全。</p><h2 id="_18-3-没有内置沙箱-隔离要靠操作系统" tabindex="-1">18.3 没有内置沙箱：隔离要靠操作系统 <a class="header-anchor" href="#_18-3-没有内置沙箱-隔离要靠操作系统" aria-label="Permalink to &quot;18.3 没有内置沙箱：隔离要靠操作系统&quot;">​</a></h2><p>pi <strong>故意不提供内置沙箱</strong>（Philosophy 与 security 文档双重确认）。理由是：进程内沙箱仍依赖宿主 shell、文件系统、包管理器、凭据和扩展代码，容易被误解为安全边界。真正的隔离必须来自操作系统或虚拟化边界。</p><p>对不可信仓库、无人值守任务，官方给出的容器化清单（详见第 19 章）：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 只挂载工作区，不挂载宿主 ~/.pi/agent（避免暴露会话与凭据）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">docker</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> run</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --rm</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -it</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> \\</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  -e</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ANTHROPIC_API_KEY</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> \\</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  -v</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">$PWD</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">:/workspace&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> \\</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  -v</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> pi-agent-home:/root/.pi/agent</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> \\</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">  pi-sandbox</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>要点：只挂载任务需要的路径；传<strong>最少</strong>的 API key 或用短生命周期凭据；任务不需要网络时限制网络；结果拷回可信环境前先审查 diff。若以读写方式 bind-mount 宿主目录，容器内的写操作仍会落到宿主文件——需要更强保护时用只读挂载或拷入拷出。</p><h2 id="_18-4-api-key-与敏感凭据的存放" tabindex="-1">18.4 API Key 与敏感凭据的存放 <a class="header-anchor" href="#_18-4-api-key-与敏感凭据的存放" aria-label="Permalink to &quot;18.4 API Key 与敏感凭据的存放&quot;">​</a></h2><ul><li>provider 凭据放<strong>环境变量或 pi 的 auth 文件</strong>（<code>/login</code> 管理），不要写进 shell 历史或仓库；</li><li><code>--api-key</code> 参数会出现在进程列表（<code>ps</code>）中，只适合临时调试；</li><li>容器场景：用 <code>-e KEY</code> 从宿主注入，或像 OpenShell 那样把原始 key 留在网关上游、容器内只访问 <code>https://inference.local</code> 推理路由。</li></ul><h2 id="_18-5-环境变量完整参考" tabindex="-1">18.5 环境变量完整参考 <a class="header-anchor" href="#_18-5-环境变量完整参考" aria-label="Permalink to &quot;18.5 环境变量完整参考&quot;">​</a></h2><p>pi 的环境变量分三类（官方 environment-variables.md）：</p><p><strong>① pi 自身配置</strong></p><table tabindex="0"><thead><tr><th>变量</th><th>作用</th></tr></thead><tbody><tr><td><code>PI_CODING_AGENT_DIR</code></td><td>覆盖配置目录（默认 <code>~/.pi/agent</code>）</td></tr><tr><td><code>PI_CODING_AGENT_SESSION_DIR</code></td><td>覆盖会话存储目录（<code>--session-dir</code> 优先）</td></tr><tr><td><code>PI_PACKAGE_DIR</code></td><td>覆盖包目录（Nix/Guix 场景）</td></tr><tr><td><code>PI_OFFLINE</code></td><td>关闭启动期网络操作（更新检查、遥测）</td></tr><tr><td><code>PI_SKIP_VERSION_CHECK</code></td><td>跳过 pi.dev 版本检查</td></tr><tr><td><code>PI_TELEMETRY</code></td><td><code>0</code>/<code>false</code>/<code>no</code> 关闭安装/更新遥测</td></tr><tr><td><code>PI_CACHE_RETENTION</code></td><td>设为 <code>long</code> 启用扩展提示缓存（Anthropic 1h / OpenAI 24h）</td></tr><tr><td><code>HTTP_PROXY</code> / <code>HTTPS_PROXY</code></td><td>出站代理</td></tr></tbody></table><p><strong>② 进程标记</strong>（CLI 与 RPC 入口自动设置，供子进程识别）</p><table tabindex="0"><thead><tr><th>变量</th><th>作用</th></tr></thead><tbody><tr><td><code>AI_AGENT=pi</code></td><td>通用标记</td></tr><tr><td><code>PI_CODING_AGENT=true</code></td><td>pi 专属标记</td></tr></tbody></table><p><strong>③ bash 工具会话环境</strong>（注入给模型调用的 bash 命令；注意 <code>!</code>/<code>!!</code> 用户命令<strong>不会</strong>注入）</p><table tabindex="0"><thead><tr><th>变量</th><th>作用</th></tr></thead><tbody><tr><td><code>PI_SESSION_ID</code></td><td>当前会话 ID</td></tr><tr><td><code>PI_SESSION_FILE</code></td><td>当前会话 JSONL 绝对路径（临时会话未设置）</td></tr><tr><td><code>PI_PROVIDER</code> / <code>PI_MODEL</code></td><td>当前模型提供方/ID</td></tr><tr><td><code>PI_REASONING_LEVEL</code></td><td>当前思考级别</td></tr></tbody></table><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 模型自己就能这样自检，而不是靠猜系统提示词</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">printf</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &#39;%s/%s\\n&#39;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">$PI_PROVIDER</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">$PI_MODEL</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>自定义 bash 工具可通过 <code>createBashTool()</code> 的 <code>exposeSessionEnvironment: false</code> 关闭注入，避免嵌套 pi 进程拿到过期的父会话信息。</p><h2 id="_18-6-本章小结" tabindex="-1">18.6 本章小结 <a class="header-anchor" href="#_18-6-本章小结" aria-label="Permalink to &quot;18.6 本章小结&quot;">​</a></h2><ul><li>威胁模型：信任本地用户、不信任仓库内容，提示注入是预期的本地风险；</li><li>项目信任只管&quot;要不要加载项目资源&quot;，判定物是 <code>.pi/</code> 下具体资源与项目级 <code>.agents/skills</code>；</li><li>非交互模式靠 <code>defaultProjectTrust</code> 或 <code>-a</code>/<code>-na</code> 单次覆盖；</li><li>无内置沙箱是设计决定：真隔离用容器/微 VM，只挂工作区、最小凭据、按需限网；</li><li>环境变量三类：pi 配置（<code>PI_OFFLINE</code> 等）、进程标记（<code>AI_AGENT</code>）、bash 会话环境（<code>PI_SESSION_ID</code> 等）。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在一个测试仓库里创建 <code>.pi/SYSTEM.md</code>，分别在交互模式、<code>-p</code> 模式、<code>-na -p</code> 模式下启动 pi，观察三种模式下该文件是否被加载。</li><li>用 Docker 把 pi 跑进容器：只挂载工作区、使用命名卷存 <code>~/.pi/agent</code>，验证容器内无法读到宿主会话。</li><li>写一个脚本打印 bash 工具会话环境：让 pi 执行 <code>env | grep ^PI_</code>，对照文档核对每个变量的值与含义。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/ch18.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
