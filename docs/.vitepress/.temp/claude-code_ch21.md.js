import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 21 章 · 近期更新与新特性","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch21.md","filePath":"claude-code/ch21.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch21.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "/claude-api upgrade 命令的主要用途是什么？",
        options: ["升级 Claude Code 到最新版", "将 Python 项目从 Anthropic SDK 0.x 迁移到 1.x", "生成新的 API Key", "优化提示词模板"],
        answer: 1,
        explain: "该命令扫描项目中 anthropic 0.x 的用法并自动改写为 1.x 兼容代码，包括超时类型从 httpx.Timeout 到 anthropic.Timeout 的变更。"
      },
      {
        question: 'keybindingFlavor 设置为 "readline" 后，Ctrl+W 的行为变成什么？',
        options: ["关闭当前会话", "删除到上一个空白字符（与 Bash 一致）", "撤销上一次操作", "打开文件搜索"],
        answer: 1,
        explain: "readline 模式的 Ctrl+W 删除光标前的一个单词（到最近空白处），这是 Bash 终端用户的肌肉记忆习惯。"
      },
      {
        question: "Plugin marketplace 的 headersHelper 用于解决什么问题？",
        options: ["加速插件下载", "动态生成认证 HTTP headers（如临时 token）", "格式化 JSON 配置", "翻译文档"],
        answer: 1,
        explain: "当企业内部 marketplace 需要短期认证令牌时，headersHelper 命令在安装/更新时动态生成 HTTP 头，避免硬编码永久密钥。"
      },
      {
        question: "Concise 输出样式的效果是什么？",
        options: [
          "压缩代码体积",
          "Claude 跳过前言和叙述直接给出结果",
          "减少模型消耗的 token 数",
          "关闭所有日志输出"
        ],
        answer: 1,
        explain: 'Concise 样式让回复直奔主题——省略"好的，我来帮你..."之类的开场白，但代码质量不受影响。适合熟练开发者日常使用。'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-21-章-·-近期更新与新特性" tabindex="-1">第 21 章 · 近期更新与新特性 <a class="header-anchor" href="#第-21-章-·-近期更新与新特性" aria-label="Permalink to &quot;第 21 章 · 近期更新与新特性&quot;">​</a></h1><blockquote><p>本章目标：了解 Claude Code 近一个月的重要版本更新，掌握新特性的使用方法，保持工具链与时俱进。</p></blockquote><h2 id="_21-1-版本概览" tabindex="-1">21.1 版本概览 <a class="header-anchor" href="#_21-1-版本概览" aria-label="Permalink to &quot;21.1 版本概览&quot;">​</a></h2><p>Claude Code 迭代速度极快（几乎每日发版）。以下是近期值得关注的版本：</p><table tabindex="0"><thead><tr><th>版本</th><th>发布日期</th><th>核心变化</th></tr></thead><tbody><tr><td>v2.1.241</td><td>近期</td><td>Bug fixes and reliability improvements</td></tr><tr><td>v2.1.240</td><td>近期</td><td>Bug fixes and reliability improvements</td></tr><tr><td>v2.1.239</td><td>近期</td><td><code>/claude-api upgrade</code> 命令、Bedrock/Vertex 全屏渲染器</td></tr><tr><td>v2.1.238</td><td>近期</td><td><code>keybindingFlavor</code> 设置、Plugin marketplace <code>headersHelper</code></td></tr><tr><td>v2.1.237</td><td>近期</td><td>内置 &quot;Concise&quot; 输出样式、LLM gateway prompt caching 修复</td></tr></tbody></table><h2 id="_21-2-claude-api-upgrade-sdk-迁移助手" tabindex="-1">21.2 <code>/claude-api upgrade</code>：SDK 迁移助手 <a class="header-anchor" href="#_21-2-claude-api-upgrade-sdk-迁移助手" aria-label="Permalink to &quot;21.2 \`/claude-api upgrade\`：SDK 迁移助手&quot;">​</a></h2><p>v2.1.239 新增了 <code>/claude-api upgrade</code> 斜杠命令，可将 Python 项目从 Anthropic SDK 0.x 自动迁移到 1.x：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; /claude-api upgrade</span></span>
<span class="line"><span>Analyzing your project...</span></span>
<span class="line"><span>Found 12 files using anthropic 0.x API patterns.</span></span>
<span class="line"><span>Key changes:</span></span>
<span class="line"><span>- anthropic.Anthropic() → anthropic.Client()</span></span>
<span class="line"><span>- httpx.Timeout → anthropic.Timeout</span></span>
<span class="line"><span>- completion.model → response.model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Apply changes? [y/N]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>迁移注意事项：</p><ul><li>超时类从 <code>httpx.Timeout</code> 变更为 <code>anthropic.Timeout</code></li><li>流式回调签名有变化</li><li>建议先跑测试套件再提交</li></ul><h2 id="_21-3-keybindingflavor-快捷键风格" tabindex="-1">21.3 keybindingFlavor：快捷键风格 <a class="header-anchor" href="#_21-3-keybindingflavor-快捷键风格" aria-label="Permalink to &quot;21.3 keybindingFlavor：快捷键风格&quot;">​</a></h2><p>v2.1.238 新增 <code>keybindingFlavor</code> 设置，支持 Bash readline 风格的快捷键：</p><div class="language-jsonc vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsonc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// ~/.claude/settings.json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;keybindingFlavor&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;readline&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>设置后 <code>Ctrl+W</code> 在提示符中删除到上一个空白字符（与 Bash 行为一致）。默认值 <code>&quot;classic&quot;</code> 保持不变。</p><h2 id="_21-4-plugin-marketplace-headershelper" tabindex="-1">21.4 Plugin Marketplace headersHelper <a class="header-anchor" href="#_21-4-plugin-marketplace-headershelper" aria-label="Permalink to &quot;21.4 Plugin Marketplace headersHelper&quot;">​</a></h2><p>v2.1.238 为插件市场新增了 <code>headersHelper</code> 机制——当 marketplace URL 需要动态认证头时，可以指定一个命令来生成临时 token：</p><div class="language-jsonc vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsonc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// marketplace.json</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;url&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;https://internal.company.com/plugins/catalog.json&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;headersHelper&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;/usr/local/bin/get-plugin-token&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>该命令仅在安装或更新插件时执行，适合短期令牌场景，避免硬编码长期密钥。</p><h2 id="_21-5-concise-输出样式" tabindex="-1">21.5 Concise 输出样式 <a class="header-anchor" href="#_21-5-concise-输出样式" aria-label="Permalink to &quot;21.5 Concise 输出样式&quot;">​</a></h2><p>v2.1.237 内置了 <strong>Concise</strong> 输出样式。启用后 Claude 会跳过前言和叙述，直接输出结果：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/config → Output style → Concise</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>适合有经验的开发者——减少阅读时间，同时不牺牲代码质量。</p><h2 id="_21-6-bedrock-vertex-支持" tabindex="-1">21.6 Bedrock/Vertex 支持 <a class="header-anchor" href="#_21-6-bedrock-vertex-支持" aria-label="Permalink to &quot;21.6 Bedrock/Vertex 支持&quot;">​</a></h2><p>同一版本为 Bedrock、Vertex AI 和 Foundry 用户添加了全屏渲染器支持，新安装在这些平台上现在默认进入全屏 TUI。</p><h2 id="_21-7-llm-gateway-prompt-caching-修复" tabindex="-1">21.7 LLM Gateway Prompt Caching 修复 <a class="header-anchor" href="#_21-7-llm-gateway-prompt-caching-修复" aria-label="Permalink to &quot;21.7 LLM Gateway Prompt Caching 修复&quot;">​</a></h2><p>v2.1.237 修复了使用自定义 base_url 或 LLM 网关时 prompt caching 失效的问题。如果你的组织通过代理路由 API 请求，升级后将自动享受缓存折扣。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Claude Code 几乎每日发版，关注 changelog 及时获取新功能；</li><li><code>/claude-api upgrade</code> 自动化 SDK 迁移，减少手工修改；</li><li><code>keybindingFlavor: readline</code> 让终端老手更顺手；</li><li>Concise 输出样式提升效率，减少无效阅读；</li><li>Plugin headersHelper 支持动态认证，适配企业安全策略。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>升级到最新版本 <code>npm update -g @anthropic-ai/claude-code</code>，查看 changelog 确认新特性。</li><li>尝试切换 Concise 输出样式，对比前后对话体验差异。</li><li>在 settings.json 中设置 <code>&quot;keybindingFlavor&quot;: &quot;readline&quot;</code>，验证 Ctrl+W 行为变化。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch21.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
