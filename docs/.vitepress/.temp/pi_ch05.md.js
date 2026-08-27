import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 5 章 · 会话管理：恢复与分支","description":"","frontmatter":{},"headers":[],"relativePath":"pi/ch05.md","filePath":"pi/ch05.md","lastUpdated":1787480284000}');
const __default__ = { name: "pi/ch05.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "pi 会话文件的底层结构是？",
        options: [
          "单链表线性日志",
          "通过 id/parentId 链接的消息树",
          "SQLite 数据库",
          "纯文本 Markdown"
        ],
        answer: 1,
        explain: "会话是 JSONL 文件，每条记录含 id 与 parentId 构成树结构，因此可以在同一文件内原地分支而无需新建文件。"
      },
      {
        question: '想"原地探索同一问题的多个解法并把它们留在同一个会话里"，应优先使用？',
        options: ["/tree", "/fork", "/clone", "/new"],
        answer: 0,
        explain: "官方对比表：/tree 输出仍是同一会话文件、可浏览完整树，适合原地保留多个备选方案；/fork 与 /clone 都会产生新的会话文件。"
      },
      {
        question: "/resume 选择器中按下 Ctrl+D 会发生什么？",
        options: [
          "导出会话为 HTML",
          "删除所选会话（可用 trash CLI 移入回收站）",
          "复制会话链接",
          "进入压缩流程"
        ],
        answer: 1,
        explain: "选择器支持 Ctrl+R 重命名、Ctrl+D 删除并确认；当系统装有 trash CLI 时 pi 会用它避免永久删除文件。"
      },
      {
        question: "关于 /tree 切换分支时的上下文，正确的说法是？",
        options: [
          "全部历史自动带入新分支",
          "旧分支细节不在新位置上下文中，可选择生成分支摘要来弥补",
          "必须手动复制粘贴关键信息，pi 无任何机制",
          "切换会被禁止"
        ],
        answer: 1,
        explain: "被离开分支的内容不会自动成为新位置的上下文；pi 提供 branch summary（无摘要/默认摘要/自定义侧重），把旧分支要点浓缩附加到新位置。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-5-章-·-会话管理-恢复与分支" tabindex="-1">第 5 章 · 会话管理：恢复与分支 <a class="header-anchor" href="#第-5-章-·-会话管理-恢复与分支" aria-label="Permalink to &quot;第 5 章 · 会话管理：恢复与分支&quot;">​</a></h1><blockquote><p>本章目标：理解 pi 会话的存储结构与树形本质，掌握恢复/命名/分叉/克隆全套操作，能在同一会话里安全地&quot;回到过去&quot;尝试不同方案。</p></blockquote><h2 id="_5-1-会话存在哪里" tabindex="-1">5.1 会话存在哪里 <a class="header-anchor" href="#_5-1-会话存在哪里" aria-label="Permalink to &quot;5.1 会话存在哪里&quot;">​</a></h2><p>会话以 JSONL 文件自动保存，按工作目录归档：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.pi/agent/sessions/--&lt;path&gt;--/&lt;timestamp&gt;_&lt;uuid&gt;.jsonl</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>&lt;path&gt;</code> 是工作目录路径（<code>/</code> 替换为 <code>-</code>）。每个 JSONL 文件不是线性日志，而是<strong>一棵消息树</strong>：每条记录带 <code>id</code> 与 <code>parentId</code>，当前活跃位置是树的叶子节点——这正是&quot;in-place 分支&quot;（不复制文件就能开岔）的数据结构基础。会话格式已迭代到 v3（v1 线性结构会在加载时自动迁移）。</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 快速查看某个会话文件的内容形态</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">head</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -3</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> ~/.pi/agent/sessions/--Users-you-demo--/</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">*</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">.jsonl</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> |</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> python3</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -m</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> json.tool</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> 2&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">/dev/null</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> |</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> head</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -20</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>每行是一个带 <code>type</code> 字段的 JSON 对象：用户/助手消息、模型切换、思考等级变更、标签、压缩摘要、分支摘要、扩展条目等都各是一种条目类型。</p><h2 id="_5-2-恢复会话的四种姿势" tabindex="-1">5.2 恢复会话的四种姿势 <a class="header-anchor" href="#_5-2-恢复会话的四种姿势" aria-label="Permalink to &quot;5.2 恢复会话的四种姿势&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -c</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                    # 继续当前目录最近一次会话</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> -r</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">                    # 启动时打开会话选择器</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --session</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> &lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">path</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">|</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">id</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;   </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 直接指定会话文件路径或部分 UUID</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --no-session</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">          # 临时模式，本次对话不落盘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>交互内对应 <code>/resume</code>（选择器）、<code>/new</code>（新会话）。用 <code>/session</code> 可随时查看当前会话的文件路径、会话 ID、消息数、token 与费用。</p><p>选择器里的管理操作：</p><table tabindex="0"><thead><tr><th>按键</th><th>功能</th></tr></thead><tbody><tr><td>直接输入</td><td>搜索会话</td></tr><tr><td>Ctrl+P / Ctrl+S</td><td>切换路径显示 / 排序方式</td></tr><tr><td>Ctrl+N</td><td>只看命名过的会话</td></tr><tr><td>Ctrl+R / Ctrl+D</td><td>重命名 / 删除（有 trash CLI 时移入回收站）</td></tr></tbody></table><h2 id="_5-3-命名-让历史可检索" tabindex="-1">5.3 命名：让历史可检索 <a class="header-anchor" href="#_5-3-命名-让历史可检索" aria-label="Permalink to &quot;5.3 命名：让历史可检索&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">pi</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> --name</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;重构认证模块&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">        # 启动时命名（-n 同义）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/name 重构认证模块      # 会话中改名</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>命名会话在 <code>/resume</code> 与 <code>pi -r</code> 中更容易被找到，配合 Ctrl+N 过滤可以快速定位长期任务。团队协作场景建议约定命名规范（如 <code>任务号-简述</code>）。</p><h2 id="_5-4-分支-在同一棵树上尝试不同方案" tabindex="-1">5.4 分支：在同一棵树上尝试不同方案 <a class="header-anchor" href="#_5-4-分支-在同一棵树上尝试不同方案" aria-label="Permalink to &quot;5.4 分支：在同一棵树上尝试不同方案&quot;">​</a></h2><p>这是 pi 会话系统最有价值的能力。典型场景：让智能体改一段复杂逻辑，结果不满意——不必撤销重来，直接分叉。</p><p><strong><code>/tree</code> —— 原地导航整棵会话树</strong></p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├─ user: &quot;帮我优化这个函数&quot;</span></span>
<span class="line"><span>│  └─ assistant: &quot;方案A：缓存计算结果...&quot;</span></span>
<span class="line"><span>│     ├─ user: &quot;试试方案B吧...&quot;        ← 切到这条即可从这继续</span></span>
<span class="line"><span>│     └─ user: &quot;还是回滚到A再优化...&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li>双击 Escape 或 <code>/tree</code> 打开；↑/↓ 导航，Ctrl+←/→ 折叠展开或跨分支跳转；</li><li><strong>Shift+L</strong> 给条目打书签标签，Shift+T 显示标签时间戳；</li><li><strong>Ctrl+O</strong> 循环过滤模式：default → no-tools → user-only → labeled-only → all（默认值可用设置项 <code>treeFilterMode</code> 配置）；</li><li>选中一条 user 消息：光标移到它的父节点、把该消息放回编辑器供修改重发 → 形成新分支；选中 assistant 等非 user 条目则直接从那里继续。</li></ul><p><strong><code>/fork</code> 与 <code>/clone</code> —— 开出新会话文件</strong></p><table tabindex="0"><thead><tr><th>特性</th><th><code>/tree</code></th><th><code>/fork</code></th><th><code>/clone</code></th></tr></thead><tbody><tr><td>产出</td><td>同一会话文件</td><td>新会话文件</td><td>新会话文件</td></tr><tr><td>视角</td><td>完整树</td><td>用户消息选择器</td><td>当前活跃分支</td></tr><tr><td>典型用途</td><td>原地探索多个方案</td><td>从早期提示另起炉灶</td><td>继续前先备份当前进度</td></tr></tbody></table><p>CLI 侧也有对应入口：<code>pi --fork &lt;path|id&gt;</code> 把已有会话分叉成新文件。</p><div class="warning custom-block"><p class="custom-block-title">切分支时的上下文丢失与补救</p><p><code>/tree</code> 切走一条分支时，被离开分支的细节不再位于活跃上下文中。pi 提供分支摘要（branch summary）：提示时可选&quot;不摘要 / 默认摘要 / 自定义侧重点&quot;，把旧分支的关键信息浓缩后附在新位置。</p></div><h2 id="_5-5-会话整理习惯建议" tabindex="-1">5.5 会话整理习惯建议 <a class="header-anchor" href="#_5-5-会话整理习惯建议" aria-label="Permalink to &quot;5.5 会话整理习惯建议&quot;">​</a></h2><ol><li><strong>一个任务一个会话</strong>，启动即 <code>--name</code>，避免巨型混合会话撑爆上下文（压缩机制见第 6 章）；</li><li>大改动前先 <code>/clone</code> 一份，相当于给对话现场做快照；</li><li>用 Shift+L 在关键决策点打标签，事后用 labeled-only 过滤模式快速复盘；</li><li>定期清理 <code>~/.pi/agent/sessions/</code> 下废弃实验会话（或在 <code>/resume</code> 里 Ctrl+D 走回收站）；</li><li>需要分享/存档时用 <code>/export</code>（HTML/JSONL 文件）或 <code>/share</code>（私有 GitHub gist 链接）。</li></ol><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>会话是 <code>~/.pi/agent/sessions/--&lt;path&gt;--/</code> 下的 JSONL 树文件，id/parentId 构成分支能力的基础；</li><li>恢复四件套：<code>-c</code> 最近会话、<code>-r</code> 选择器、<code>--session &lt;path|id&gt;</code> 定点恢复、<code>--no-session</code> 不留痕；</li><li><code>/tree</code> 原地分支 + 标签 + 过滤是方案探索利器；<code>/fork</code>、<code>/clone</code> 用于拆出新文件；</li><li>切分支会丢上下文，用 branch summary 弥补；</li><li>命名 + 克隆快照 + 标签复盘是三条实用整理纪律。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>找一个历史会话执行 <code>/tree</code>，切到三步之前重问一个问题，观察新分支的生成与原分支的保留。</li><li>用 <code>/name</code> 给当前项目最近三个会话按&quot;日期-主题&quot;规范重命名，再用 Ctrl+N 过滤验证效果。</li><li>对一次失败的修改尝试使用 <code>/tree</code> 的分支摘要功能（自定义侧重点），对比有无摘要时后续对话的质量差异。</li></ol><blockquote><p>进入<a href="./ch06.html">下一章：上下文压缩 Compaction 与 Context Files</a>，学会驯服无限增长的上下文。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pi/ch05.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
