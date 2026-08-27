import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"第 30 章 · AGENTS.md 标准：给智能体的 README","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch30.md","filePath":"agent/ch30.md","lastUpdated":1787480284000}');
const _sfc_main = { name: "agent/ch30.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Quiz = resolveComponent("Quiz");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-30-章-·-agents-md-标准-给智能体的-readme" tabindex="-1">第 30 章 · AGENTS.md 标准：给智能体的 README <a class="header-anchor" href="#第-30-章-·-agents-md-标准-给智能体的-readme" aria-label="Permalink to &quot;第 30 章 · AGENTS.md 标准：给智能体的 README&quot;">​</a></h1><blockquote><p>本章目标：理解 AGENTS.md 开放标准的定位与设计哲学，掌握典型内容结构与 monorepo 嵌套规则，学会为项目编写一份高质量的智能体说明书。</p></blockquote><h2 id="_23-1-agents-md-是什么" tabindex="-1">23.1 AGENTS.md 是什么 <a class="header-anchor" href="#_23-1-agents-md-是什么" aria-label="Permalink to &quot;23.1 AGENTS.md 是什么&quot;">​</a></h2><p><a href="https://agents.md" target="_blank" rel="noreferrer">AGENTS.md</a> 是一个<strong>简单、开放的格式标准</strong>，用于指导编码智能体（coding agent）在你的项目中工作。官方的定义非常精辟：</p><blockquote><p>Think of AGENTS.md as a README for agents——把它当作<strong>给智能体看的 README</strong>。</p></blockquote><p>它由 OpenAI Codex、Amp、Google Jules、Cursor、Factory 等团队协作发起，目前由 Linux Foundation 旗下的 <strong>Agentic AI Foundation</strong> 托管，已被 <strong>60,000+ 开源项目</strong>采用。仓库地址：<a href="https://github.com/agentsmd/agents.md" target="_blank" rel="noreferrer">agentsmd/agents.md</a>。</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>README.md   → 写给人类：快速上手、项目介绍、贡献指南</span></span>
<span class="line"><span>AGENTS.md   → 写给智能体：构建步骤、测试命令、代码约定等机器执行所需的上下文</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>为什么要分成两个文件？因为两者受众不同：</p><ul><li>给人类的信息讲究<strong>简洁聚焦</strong>，细节多了没人读；</li><li>智能体需要的是<strong>精确、可执行的指令</strong>——构建命令、测试方式、代码风格，这些写进 README 会把它变得臃肿；</li><li>分离之后，智能体有了一个<strong>明确、可预测</strong>的指令入口，不必去猜该读哪个文档。</li></ul><div class="tip custom-block"><p class="custom-block-title">一个文件，全生态通用</p><p>AGENTS.md 的设计初衷就是避免又造一个私有格式：同一份文件可以被 Codex、Jules、goose、opencode、Zed、Devin、Cursor、Gemini CLI、GitHub Copilot 编码智能体、Windsurf 等几十种工具直接读取。</p></div><h2 id="_23-2-典型内容与格式约定" tabindex="-1">23.2 典型内容与格式约定 <a class="header-anchor" href="#_23-2-典型内容与格式约定" aria-label="Permalink to &quot;23.2 典型内容与格式约定&quot;">​</a></h2><p>AGENTS.md 就是<strong>纯 Markdown，没有强制 schema、没有必需字段</strong>——智能体只是解析你写的文本。官方建议覆盖这些高频主题：</p><table tabindex="0"><thead><tr><th>常用小节</th><th>内容示例</th></tr></thead><tbody><tr><td>Project overview</td><td>一句话说明项目是干什么的</td></tr><tr><td>Build and test commands</td><td>安装依赖、启动开发服务器、跑测试的确切命令</td></tr><tr><td>Code style guidelines</td><td>格式化规则、语言特性偏好</td></tr><tr><td>Testing instructions</td><td>CI 计划位置、如何只跑某个测试</td></tr><tr><td>Security considerations</td><td>密钥管理、敏感目录</td></tr><tr><td>PR instructions</td><td>提交信息格式、提交前检查清单</td></tr></tbody></table><p>下面是一份真实风格的示例（改写自官方样例）：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># Sample AGENTS.md</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Dev environment tips</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 用 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pnpm dlx turbo run where &lt;project_name&gt;\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 直接跳转到对应包，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  不要用 ls 一个个翻目录。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 新增包时用 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pnpm install --filter &lt;project_name&gt;\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  这样 Vite / ESLint / TypeScript 才能看到它。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Testing instructions</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> CI 计划在 .github/workflows 目录里。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 在包根目录直接运行 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pnpm test\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">；合并前必须全绿。</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 移动文件或修改 import 后，补跑 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pnpm lint --filter &lt;project_name&gt;\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">。</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## PR instructions</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 标题格式：[</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-light-text-decoration": "underline", "--shiki-dark": "#DBEDFF", "--shiki-dark-text-decoration": "underline" })}">&lt;project_name&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">] &lt;标题&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 提交前必须先跑 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pnpm lint\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 和 </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">\`pnpm test\`</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>注意这些指令的共性：<strong>可执行、可验证</strong>。官网 FAQ 明确说明——只要你在文件里列出了测试命令，智能体会真的去执行它们，并在结束前尝试修复失败。所以写&quot;跑 <code>pnpm test</code>&quot;远比写&quot;请确保质量&quot;有效。</p><h2 id="_23-3-嵌套与优先级规则" tabindex="-1">23.3 嵌套与优先级规则 <a class="header-anchor" href="#_23-3-嵌套与优先级规则" aria-label="Permalink to &quot;23.3 嵌套与优先级规则&quot;">​</a></h2><p>大型 monorepo 可以在子目录里放更多 AGENTS.md：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>my-monorepo/</span></span>
<span class="line"><span>├── AGENTS.md                  # 根级：全仓通用的约定</span></span>
<span class="line"><span>├── apps/</span></span>
<span class="line"><span>│   └── web/</span></span>
<span class="line"><span>│       └── AGENTS.md          # 前端子项目专属约定</span></span>
<span class="line"><span>└── services/</span></span>
<span class="line"><span>    └── api/</span></span>
<span class="line"><span>        └── AGENTS.md          # 后端子项目专属约定</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>两条核心规则（来自官方 FAQ）：</p><ol><li><strong>就近优先</strong>：智能体编辑某个文件时，会自动读取目录树上离它最近的 AGENTS.md，越近的优先级越高。所以每个子项目都能给出定制化指令——OpenAI 自己的主仓库在撰写本文时有 88 个 AGENTS.md 文件；</li><li><strong>对话优先</strong>：如果指令冲突，<strong>用户在聊天中的显式提示覆盖一切</strong>，其次才是最近的 AGENTS.md。</li></ol><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>优先级（高 → 低）：</span></span>
<span class="line"><span>用户当前对话的显式要求  &gt;  最近的 AGENTS.md  &gt;  更上层的 AGENTS.md</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_23-4-生态支持与同类约定" tabindex="-1">23.4 生态支持与同类约定 <a class="header-anchor" href="#_23-4-生态支持与同类约定" aria-label="Permalink to &quot;23.4 生态支持与同类约定&quot;">​</a></h2><p>主流编码智能体对 AGENTS.md 的支持已经非常广泛：OpenAI Codex、Google Jules、Factory、Aider、goose、opencode、Zed、Warp、VS Code、Devin（Cognition）、Cursor、RooCode、Gemini CLI、GitHub Copilot 编码智能体、Windsurf 等。</p><p>两个实用的兼容性细节：</p><ul><li><strong>Claude Code</strong> 使用同类约定的 <code>CLAUDE.md</code>（内容思路一致）；很多项目直接让其中一个软链到另一个，或内容保持同步；</li><li>部分工具需要一行配置开启支持，例如 Aider 和 Gemini CLI：</li></ul><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># .aider.conf.yml —— 让 Aider 读取 AGENTS.md</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">read</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">AGENTS.md</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">// .gemini/settings.json —— 让 Gemini CLI 使用 AGENTS.md 作为上下文文件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;context&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;fileName&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;AGENTS.md&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>已有旧文件要迁移？官方给的命令是一行重命名加软链回退：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">mv</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> AGENT.md</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> AGENTS.md</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> &amp;&amp; </span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">ln</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -s</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> AGENTS.md</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> AGENT.md</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_23-5-与-skills-的分工-常驻上下文-vs-按需能力" tabindex="-1">23.5 与 Skills 的分工：常驻上下文 vs 按需能力 <a class="header-anchor" href="#_23-5-与-skills-的分工-常驻上下文-vs-按需能力" aria-label="Permalink to &quot;23.5 与 Skills 的分工：常驻上下文 vs 按需能力&quot;">​</a></h2><p>学完<a href="./ch16.html">第 16 章</a>的 Agent Skills 后，一个自然的问题是：AGENTS.md 和 SKILL.md 有什么区别？什么时候用哪个？</p><table tabindex="0"><thead><tr><th>维度</th><th>AGENTS.md</th><th>Skill（SKILL.md）</th></tr></thead><tbody><tr><td>加载时机</td><td>会话开始时常驻上下文</td><td>任务匹配时才按需加载（渐进披露）</td></tr><tr><td>定位</td><td>项目级<strong>约定与事实</strong></td><td>可复用的<strong>能力包</strong>（工作流+脚本+资源）</td></tr><tr><td>规模</td><td>保持精简，几十行以内</td><td>可以很长，还能携带脚本和参考文档</td></tr><tr><td>作用域</td><td>一个仓库/目录</td><td>跟随技能目录分发，可跨项目复用</td></tr></tbody></table><p>一句话记忆：<strong>AGENTS.md 告诉智能体&quot;这个项目的规矩是什么&quot;，Skill 告诉它&quot;做这类事情的标准作业程序&quot;</strong>。两者是互补而非替代关系——第 19 章你会看到 Loop Engineering 把它们一起纳入循环的积木。</p><h2 id="_23-6-编写最佳实践" tabindex="-1">23.6 编写最佳实践 <a class="header-anchor" href="#_23-6-编写最佳实践" aria-label="Permalink to &quot;23.6 编写最佳实践&quot;">​</a></h2><p>结合官方示例仓库中 60k+ 项目的实战经验，总结五条原则：</p><ol><li><strong>可执行命令优先</strong>：写确切的命令行（<code>pnpm test</code>），而不是抽象要求（&quot;保证测试通过&quot;）；</li><li><strong>精简</strong>：它是常驻上下文，每一行都消耗 token。与 README 重复的内容删掉，只留智能体需要的增量信息；</li><li><strong>写&quot;新人须知&quot;</strong>：判断标准很简单——凡是你会交代给第一天入职新同事的事项，都属于这里；</li><li><strong>当作活文档</strong>：约定变了就更新它，过时的指令比没有指令更糟；</li><li><strong>monorepo 用嵌套</strong>：把包级别的特殊约定下沉到子目录，别在根文件里堆成百宝箱。</li></ol><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>AGENTS.md 是开放标准：&quot;给智能体看的 README&quot;，60k+ 项目采用，Linux Foundation 托管；</li><li>纯 Markdown、无强制 schema，常用小节：构建/测试命令、代码风格、PR 规范、安全注意事项；</li><li>monorepo 支持嵌套，<strong>就近优先</strong>；用户对话中的显式指令覆盖一切；</li><li>与 Skills 分工：AGENTS.md 是常驻的项目约定，Skills 是按需加载的能力包；</li><li>最佳实践：可执行命令优先、精简不重复、当作活文档。</li></ul>`);
  _push(ssrRenderComponent(_component_Quiz, { items: _ctx.quiz }, null, _parent));
  _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><blockquote><p>完成后进入<a href="./ch31.html">下一章：综合实战：五件套打通完整工作流</a>。<script setup>
const quiz = [
{
question: &#39;AGENTS.md 与 README.md 分离的核心原因是什么？&#39;,
options: [
&#39;两者的受众不同：README 面向人类贡献者，AGENTS.md 面向编码智能体&#39;,
&#39;智能体无法解析 Markdown，需要专用二进制格式&#39;,
&#39;AGENTS.md 是强制 schema，字段必须齐全才能被读取&#39;,
&#39;为了提高 SEO 排名&#39;
],
answer: 0,
explain: &#39;官方定位是&amp;quot;README for agents&amp;quot;：README 面向人类保持简洁，AGENTS.md 承载智能体需要的构建、测试与约定等精确上下文。它本身就是纯 Markdown，无强制 schema。&#39;
},
{
question: &#39;monorepo 中根目录与 apps/web/ 子目录都有 AGENTS.md，智能体编辑 apps/web/src/App.tsx 时以哪份为准？&#39;,
options: [
&#39;永远以根目录的 AGENTS.md 为准&#39;,
&#39;两份都会被忽略，只有 package.json 生效&#39;,
&#39;以 apps/web/AGENTS.md 为准：离被编辑文件最近者优先&#39;,
&#39;随机选择一份&#39;
],
answer: 2,
explain: &#39;官方规则是 nearest file wins——智能体自动读取目录树上离目标文件最近的 AGENTS.md，因此子项目可以给出定制化指令（如 OpenAI 主仓库有 88 个 AGENTS.md）。&#39;
},
{
question: &#39;关于 AGENTS.md 中列出的测试命令，官方 FAQ 怎么说？&#39;,
options: [
&#39;只是装饰性文字，智能体不会执行&#39;,
&#39;智能体会尝试真正执行相关检查，并在结束前修复失败&#39;,
&#39;必须放在 &lt;commands&gt; XML 标签内才会生效&#39;,
&#39;只有付费版本才支持自动执行&#39;
],
answer: 1,
explain: &#39;FAQ 明确：列出命令后智能体会主动执行相关程序化检查并尝试修复失败项。这也是&amp;quot;可执行命令优先&amp;quot;这条最佳实践的依据。&#39;
},
{
question: &#39;下列哪项工作最适合放进 AGENTS.md，而不是写成 Skill？&#39;,
options: [
&#39;PDF 批量提取表格的标准作业流程（含辅助脚本）&#39;,
&#39;网页搜索并汇总资料的多步工作流&#39;,
&#39;本仓库的构建命令、测试方式与提交规范等项目约定&#39;,
&#39;每天定时审查 PR 的循环配置&#39;
],
answer: 2,
explain: &#39;AGENTS.md 承载项目级常驻约定；前三类&amp;quot;可复用能力包&amp;quot;适合做成 Skill（渐进披露按需加载）；定时循环则属于 Loop Engineering 的范畴。&#39;
}
]
<\/script></p></blockquote></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch30.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ch30 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ch30 as default
};
