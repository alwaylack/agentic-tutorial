import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 8 章 · Git 集成与代码审查","description":"","frontmatter":{},"headers":[],"relativePath":"claude-code/ch08.md","filePath":"claude-code/ch08.md","lastUpdated":1787480284000}');
const __default__ = { name: "claude-code/ch08.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: "让 Claude 生成 commit message 前，最关键的前置步骤是什么？",
        options: [
          "先运行 npm install",
          "确保改动已经 git add 到暂存区",
          "关闭所有 IDE",
          "删除 node_modules"
        ],
        answer: 1,
        explain: "Claude 通过 git diff --cached 查看暂存内容来理解改动语义。如果改动没有 add，Claude 看到的就是空的或旧的 diff。"
      },
      {
        question: "为什么建议在 settings.json 中 deny git push --force？",
        options: [
          "因为 force push 太慢",
          "因为它会不可逆地覆盖远程历史，可能导致他人工作丢失",
          "因为 GitHub 不允许 force push",
          "因为会消耗更多 API 额度"
        ],
        answer: 1,
        explain: "git push --force 会覆盖远程分支历史，如果其他人基于旧历史工作，他们的 commit 将变成孤儿节点。deny 规则提供了额外的安全层。"
      },
      {
        question: "让 Claude 创建 PR 需要什么前置条件？",
        options: [
          "只需要安装 Claude Code",
          "需要安装并认证 GitHub CLI (gh)，且有远程仓库的推送权限",
          "需要购买 GitHub Enterprise",
          "需要配置 SSH 密钥"
        ],
        answer: 1,
        explain: "Claude 通过 gh pr create 命令创建 PR，因此需要 gh 已安装且已完成 gh auth login 认证，并且你对目标仓库有推送权限。"
      },
      {
        question: "面对一个改动了 50 个文件的大型 diff，最高效的审查策略是什么？",
        options: [
          "一次性读取所有文件的完整 diff",
          "先让 Claude 总结变更分类，再选择重点区域深入分析",
          "只看第一个文件就够了",
          "跳过审查直接合并"
        ],
        answer: 1,
        explain: "先概览后深入的策略能避免在无关细节上浪费注意力。Claude 可以快速分类改动，然后你指定优先级让它逐块深入。"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-8-章-·-git-集成与代码审查" tabindex="-1">第 8 章 · Git 集成与代码审查 <a class="header-anchor" href="#第-8-章-·-git-集成与代码审查" aria-label="Permalink to &quot;第 8 章 · Git 集成与代码审查&quot;">​</a></h1><blockquote><p>本章目标：掌握 Claude Code 与 Git 的深度集成——自动生成 commit message、分支操作、通过 GitHub CLI 创建 PR，以及利用 Claude 辅助代码审查。</p></blockquote><h2 id="_8-1-自动-commit-message" tabindex="-1">8.1 自动 Commit Message <a class="header-anchor" href="#_8-1-自动-commit-message" aria-label="Permalink to &quot;8.1 自动 Commit Message&quot;">​</a></h2><p>Claude Code 最常用的 Git 功能之一是根据暂存的改动自动生成有意义的 commit message：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 在交互模式中</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 帮我 commit 这些更改</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude 会：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. 运行 git diff --cached 查看暂存内容</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 分析改动语义（新增功能/修复 bug/重构）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 生成符合 Conventional Commits 的 message</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 4. 执行 git commit</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>典型输出：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Claude 检测到 3 个文件的修改：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  src/auth/login.ts    | 42 +++++---</span></span>
<span class="line"><span>  src/auth/types.ts    | 12 ++++</span></span>
<span class="line"><span>  tests/auth.test.ts   | 28 +++++++</span></span>
<span class="line"><span></span></span>
<span class="line"><span>建议的 commit message:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  feat(auth): add OAuth2 login flow with refresh token</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - Implement OAuth2 authorization code flow</span></span>
<span class="line"><span>  - Add token refresh mechanism with auto-retry</span></span>
<span class="line"><span>  - Update TypeScript interfaces for auth types</span></span>
<span class="line"><span>  - Include unit tests for login and refresh paths</span></span>
<span class="line"><span></span></span>
<span class="line"><span>确认提交？(y/n)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">Conventional Commits 规范</p><p>在 CLAUDE.md 中约定 commit 格式，Claude 会自动遵循：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## Git 约定</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 使用 Conventional Commits：feat/fix/docs/refactor/test/chore</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> scope 用模块名：auth, api, ui</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 描述用中文，首行不超过 72 字符</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></div><h2 id="_8-2-分支操作" tabindex="-1">8.2 分支操作 <a class="header-anchor" href="#_8-2-分支操作" aria-label="Permalink to &quot;8.2 分支操作&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 创建功能分支并切换</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 创建一个 feature/user-profile 分支</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 合并与冲突处理</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 把 main 的最新代码合并到当前分支，如果有冲突帮我解决</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude 处理冲突的方式：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. git merge main → 发现冲突</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 逐个读取冲突文件</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 分析两边的修改意图</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 4. 给出合并建议或直接解决</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 5. 标记已解决并完成 merge commit</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="变基操作" tabindex="-1">变基操作 <a class="header-anchor" href="#变基操作" aria-label="Permalink to &quot;变基操作&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 把我的分支 rebase 到 main 上</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude 会检查是否有未推送的 commit，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 执行 git pull --rebase origin main，</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 并处理可能的冲突。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">危险操作需谨慎</p><p><code>git reset --hard</code>、<code>git push --force</code>、<code>git rebase</code> 等操作会不可逆地修改历史。Claude Code 默认会要求你确认这些操作。建议在 settings.json 中添加额外保护：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;permissions&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;deny&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(git push --force:*)&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">      &quot;Bash(git reset --hard:*)&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">    ]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div><h2 id="_8-3-github-cli-集成创建-pr" tabindex="-1">8.3 GitHub CLI 集成创建 PR <a class="header-anchor" href="#_8-3-github-cli-集成创建-pr" aria-label="Permalink to &quot;8.3 GitHub CLI 集成创建 PR&quot;">​</a></h2><p>安装 <code>gh</code> CLI 后，Claude 可以完成完整的 PR 工作流：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 前提：安装并认证 gh CLI</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">brew</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> install</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> gh</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> auth</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> login</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 让 Claude 创建 PR</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 推送当前分支并创建 PR 到 main</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Claude 的执行流程：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. git push -u origin feature/user-profile</span></span>
<span class="line"><span>2. gh pr create --title &quot;...&quot; --body &quot;...&quot;</span></span>
<span class="line"><span>   ├── 标题从 commit messages 提取</span></span>
<span class="line"><span>   └── 正文自动包含：</span></span>
<span class="line"><span>       - 变更摘要</span></span>
<span class="line"><span>       - 测试情况</span></span>
<span class="line"><span>       - 关联 issue（如果提到）</span></span>
<span class="line"><span>3. 返回 PR 链接</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="自定义-pr-模板" tabindex="-1">自定义 PR 模板 <a class="header-anchor" href="#自定义-pr-模板" aria-label="Permalink to &quot;自定义 PR 模板&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">&lt;!-- CLAUDE.md 中约定 --&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## PR 约定</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">创建 PR 时使用以下模板结构：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">### 变更说明 / ### 测试情况 / ### 截图（如有 UI 变更） / ### Checklist</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_8-4-代码审查辅助" tabindex="-1">8.4 代码审查辅助 <a class="header-anchor" href="#_8-4-代码审查辅助" aria-label="Permalink to &quot;8.4 代码审查辅助&quot;">​</a></h2><p>Claude Code 是强大的审查助手——它能读懂上下文而不仅仅是 diff。</p><h3 id="审查未提交的代码" tabindex="-1">审查未提交的代码 <a class="header-anchor" href="#审查未提交的代码" aria-label="Permalink to &quot;审查未提交的代码&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 审查我当前的改动，关注安全问题和性能隐患</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude 会：</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 1. git diff 查看变更</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 2. 读取相关文件获取完整上下文</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 3. 从安全性、性能、可维护性三个维度分析</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 4. 按严重程度排序输出发现</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>输出示例：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>📋 代码审查结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔴 高风险</span></span>
<span class="line"><span>├── src/auth/login.ts:45 — 密码明文存储在 session 中</span></span>
<span class="line"><span>│   建议：使用 bcrypt 哈希后再存入</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🟡 中等</span></span>
<span class="line"><span>├── src/api/users.ts:78 — N+1 查询问题</span></span>
<span class="line"><span>│   建议：使用 join 或 eager loading</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🟢 建议</span></span>
<span class="line"><span>├── src/utils/format.ts:12 — 可提取为公共函数复用</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="审查他人的-pr" tabindex="-1">审查他人的 PR <a class="header-anchor" href="#审查他人的-pr" aria-label="Permalink to &quot;审查他人的 PR&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 审查 PR </span><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">#42 的代码质量</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># Claude 通过 gh 命令获取 PR 信息</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> pr</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> view</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 42</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}">gh</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> pr</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> diff</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> 42</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 然后逐文件分析并给出审查意见</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_8-5-diff-解读技巧" tabindex="-1">8.5 Diff 解读技巧 <a class="header-anchor" href="#_8-5-diff-解读技巧" aria-label="Permalink to &quot;8.5 Diff 解读技巧&quot;">​</a></h2><p>当 Claude 展示大量改动时，学会快速定位关键信息：</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 只看统计信息</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 这个分支改了多少文件？</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 聚焦特定类型的改动</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 列出所有新增的 API endpoint</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"># 对比两个版本</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 比较 v1.0 和 v2.0 tag 之间的差异，总结主要变化</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>对于大型 diff，让 Claude 先给概览再深入细节比一次全读更高效：</p><div class="language-text vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你: 这个 PR 改了什么？</span></span>
<span class="line"><span>Claude: 这个 PR 包含 3 个主要变更：</span></span>
<span class="line"><span>        1. 新增了用户偏好设置 API（4 个文件）</span></span>
<span class="line"><span>        2. 重构了数据库连接池（2 个文件）</span></span>
<span class="line"><span>        3. 修复了一个时区 bug（1 个文件）</span></span>
<span class="line"><span>        要我详细看哪一部分？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>你: 重点看数据库连接池的重构</span></span>
<span class="line"><span>Claude: [深入分析...]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><ul><li>Claude 能根据 diff 自动生成符合规范的 commit message；</li><li>分支操作（创建/合并/rebase）和冲突解决都可以委托给 Claude；</li><li>配合 <code>gh</code> CLI 可以一键推送 + 创建 PR；</li><li>代码审查按 🔴🟡🟢 三级输出，覆盖安全/性能/可维护性；</li><li>大型 diff 先要概览再深入特定区域更高效。</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>在你的项目中做一个小改动，让 Claude 自动生成 commit message，评估其质量。</li><li>安装并认证 <code>gh</code> CLI，然后让 Claude 为你的项目创建一个测试 PR。</li><li>找一个开源项目的 open PR，让 Claude 帮你审查代码并输出结构化的审查意见。</li></ol><blockquote><p>完成练习后，进入<a href="./ch09.html">下一章：自定义指令与配置</a>。</p></blockquote></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("claude-code/ch08.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
