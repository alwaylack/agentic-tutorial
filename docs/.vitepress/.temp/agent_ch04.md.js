import { useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const __pageData = JSON.parse('{"title":"第 4 章 · 长任务连续性管理","description":"","frontmatter":{},"headers":[],"relativePath":"agent/ch04.md","filePath":"agent/ch04.md","lastUpdated":1787480284000}');
const __default__ = { name: "agent/ch04.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const quiz = [
      {
        question: '"context anxiety" (上下文焦虑) 是指什么现象？',
        options: [
          "智能体害怕消耗过多 token",
          "智能体感知上下文接近限制时仓促收尾、跳过验证",
          "用户对智能体响应速度焦虑",
          "智能体拒绝处理长上下文"
        ],
        answer: 1,
        explain: "Anthropic 观察到：当智能体感知上下文即将耗尽时，会表现出仓促收尾行为——匆忙结束工作、跳过验证步骤、选择简单方案而非最优方案。这是一种非理性的资源焦虑。"
      },
      {
        question: "以下哪种方法不能有效减少跨会话 drift（漂移）？",
        options: [
          "使用 PROGRESS.md 记录进度",
          "用 DECISIONS.md 记录设计决策",
          "每次会话重新开始不记录状态",
          "git commit 作为检查点"
        ],
        answer: 2,
        explain: "每次会话重新开始不记录状态会导致每次都要重新探索，drift 逐会话累积。有效的 drift 控制需要状态持久化。"
      },
      {
        question: "rebuild cost（重建成本）衡量的是什么？",
        options: [
          "模型重新训练的成本",
          "新会话达到可执行状态所需时间",
          "代码重新编译的时间",
          "网络请求延迟"
        ],
        answer: 1,
        explain: "重建成本是新会话从状态持久化文件恢复到可执行状态所需时间。好的 harness 可将此从 15 分钟压缩到 3 分钟。"
      },
      {
        question: "压缩 (compaction) 和重置 (reset) 的主要区别是？",
        options: [
          '压缩保留"为什么"，重置保留"是什么"',
          "压缩在同会话内总结，重置开启新会话从持久化状态重建",
          "压缩用于短任务，重置只用于长任务",
          "没有区别，只是名字不同"
        ],
        answer: 1,
        explain: '压缩在同一会话内总结上下文，保留"是什么"但可能丢失"为什么"；重置开启新会话从持久化状态（PROGRESS.md 等）重建，干净但依赖工件完整性。'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Quiz = resolveComponent("Quiz");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第-4-章-·-长任务连续性管理" tabindex="-1">第 4 章 · 长任务连续性管理 <a class="header-anchor" href="#第-4-章-·-长任务连续性管理" aria-label="Permalink to &quot;第 4 章 · 长任务连续性管理&quot;">​</a></h1><blockquote><p>本章目标：理解为什么智能体会在长任务中&quot;丢失线索&quot;，掌握状态持久化技术和 context anxiety 的应对策略。</p></blockquote><h2 id="_4-1-跨会话困境" tabindex="-1">4.1 跨会话困境 <a class="header-anchor" href="#_4-1-跨会话困境" aria-label="Permalink to &quot;4.1 跨会话困境&quot;">​</a></h2><p>你让 Claude Code 实现一个完整功能。它运行 30 分钟，完成大部分工作，但上下文快满了。你开启新会话继续——却发现它不记得上次做了什么决定、为什么选 A 不选 B、哪些文件已修改、测试状态如何。它花 15 分钟重新探索项目，可能采用与上次不一致的方法。</p><p>这就是 AI 编码智能体在跨会话任务中面临的真实困境。</p><h2 id="_4-2-上下文窗口不是无限的" tabindex="-1">4.2 上下文窗口不是无限的 <a class="header-anchor" href="#_4-2-上下文窗口不是无限的" aria-label="Permalink to &quot;4.2 上下文窗口不是无限的&quot;">​</a></h2><p>上下文窗口是有限的。这不是模型升级能解决的问题——即使窗口扩大到 1M token，复杂任务仍会耗尽它们。智能体不只是生成代码；它们理解代码库、跟踪自己的决策历史、处理工具输出、维持对话上下文。所有这些信息的增长速度快于窗口扩展速度。</p><p>更深层的问题：智能体产生的信息重要性不均匀。中间推理步骤包含决策的&quot;为什么&quot;——为什么选 A 不选 B、为什么用这个库而不是那个、为什么跳过某个优化。最终输出只包含&quot;是什么&quot;——代码本身。压缩策略通常保留后者但丢失前者。下次会话看到代码，但不知道为何这样写，可能会&quot;优化&quot;掉一个刻意的设计决策。</p><p>Anthropic 在长运行智能体研究中观察到有趣现象：当智能体感知上下文快满时，会表现出&quot;仓促收尾&quot;行为——匆忙结束当前工作、跳过验证步骤、选择简单方案而非最优方案。他们称之为 <strong>context anxiety（上下文焦虑）</strong>。</p><h2 id="_4-3-没有状态持久化-vs-有状态持久化" tabindex="-1">4.3 没有状态持久化 vs 有状态持久化 <a class="header-anchor" href="#_4-3-没有状态持久化-vs-有状态持久化" aria-label="Permalink to &quot;4.3 没有状态持久化 vs 有状态持久化&quot;">​</a></h2><p><strong>没有状态持久化</strong>，每次新会话从零开始：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>会话 1（功能完成一半）→ 上下文快满 → 会话结束</span></span>
<span class="line"><span>                          ↓</span></span>
<span class="line"><span>会话 2 重新开始 → 重读文件夹、重跑测试、猜代码为何这样写 → 工作重复、恢复缓慢</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>有状态持久化</strong>，新会话快速接续：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>会话 1 工作 → PROGRESS.md（完成/进行中/下一步）</span></span>
<span class="line"><span>            → DECISIONS.md（为何选此方案）</span></span>
<span class="line"><span>            → 验证记录（哪些测试通过/失败）</span></span>
<span class="line"><span>            → Git checkpoint（精确仓库状态）</span></span>
<span class="line"><span>                          ↓</span></span>
<span class="line"><span>会话 2 重建 → 快速接续</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_4-4-核心概念" tabindex="-1">4.4 核心概念 <a class="header-anchor" href="#_4-4-核心概念" aria-label="Permalink to &quot;4.4 核心概念&quot;">​</a></h2><table tabindex="0"><thead><tr><th>术语</th><th>含义</th></tr></thead><tbody><tr><td><strong>状态持久化文件</strong></td><td>让新会话能明确接续上次工作的持久化文件。最基本形式包括进度日志、验证记录、下一步行动</td></tr><tr><td><strong>重建成本 (Rebuild Cost)</strong></td><td>新会话达到可执行状态所需时间。好的 harness 可将重建成本从 15 分钟压缩到 3 分钟</td></tr><tr><td><strong>漂移 (Drift)</strong></td><td>智能体理解与实际仓库状态之间的差距。每次会话边界都引入漂移；不受控制时逐会话累积</td></tr><tr><td><strong>上下文焦虑</strong></td><td>Anthropic 观察到的现象——智能体在接近上下文限制时表现出仓促收尾行为</td></tr><tr><td><strong>压缩 vs 重置</strong></td><td>压缩在同会话内总结上下文（保留&quot;是什么&quot;，可能丢失&quot;为什么&quot;）；重置开启新会话从持久化状态重建（干净但依赖工件完整性）</td></tr></tbody></table><h2 id="_4-5-连续性断裂的后果" tabindex="-1">4.5 连续性断裂的后果 <a class="header-anchor" href="#_4-5-连续性断裂的后果" aria-label="Permalink to &quot;4.5 连续性断裂的后果&quot;">​</a></h2><p>上次会话花费大量上下文预算分析了三种方案并选择了 B。本次会话的智能体不知道那次分析，可能基于不完整信息重新决策——甚至可能选 A。相同信息，不同结论，因为决策上下文消失了。</p><p>更糟的是重复工作。智能体不确定某些工作是否已完成，于是再做一遍。或者更糟——做了一半，发现与现有实现冲突，必须重做。没有进度记录，新会话不知道什么已完成。</p><p>多次会话后，实现方向可能已悄然偏离原始需求。每个新会话对项目目标的理解略有不同。每次偏差逐次累积，最终结果可能远离原始意图。</p><p>还有验证差距。上次会话的验证结果（哪些测试通过、哪些失败、为何失败）未记录。新会话必须重跑所有验证才能了解当前状态。每次会话从头诊断，每次浪费宝贵上下文。</p><h2 id="_4-6-状态持久化实践" tabindex="-1">4.6 状态持久化实践 <a class="header-anchor" href="#_4-6-状态持久化实践" aria-label="Permalink to &quot;4.6 状态持久化实践&quot;">​</a></h2><p>核心思路：<strong>把智能体当作每次会话短期记忆被擦除的工程师。</strong> 在它&quot;下班&quot;前，必须写下关键信息，让下一个&quot;值班&quot;智能体能快速接手。</p><h3 id="工具-1-进度文件-progress-md" tabindex="-1">工具 1：进度文件 (PROGRESS.md) <a class="header-anchor" href="#工具-1-进度文件-progress-md" aria-label="Permalink to &quot;工具 1：进度文件 (PROGRESS.md)&quot;">​</a></h3><p>最基本的状态持久化文件：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># 项目进度</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 当前状态</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 最新提交：abc1234 (feat: 添加用户偏好端点)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 测试状态：42/43 通过 (test_pagination_edge_case 失败)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> Lint：通过</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 已完成</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-light-text-decoration": "underline", "--shiki-dark": "#DBEDFF", "--shiki-dark-text-decoration": "underline" })}">x</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">] 用户模型和数据库迁移</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-light-text-decoration": "underline", "--shiki-dark": "#DBEDFF", "--shiki-dark-text-decoration": "underline" })}">x</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">] 基础 CRUD 端点</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-light-text-decoration": "underline", "--shiki-dark": "#DBEDFF", "--shiki-dark-text-decoration": "underline" })}">x</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">] Auth 中间件集成</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 进行中</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> [ ] 分页功能（90% - edge case 测试失败）</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 已知问题</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> test_pagination_edge_case 在空结果集时返回 500</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 需确认被删除用户是否应出现在列表</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 下一步</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 修复分页 edge case bug</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">2.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 添加 &quot;include deleted users&quot; 查询参数</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">3.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 更新 API 文档</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="工具-2-决策日志-decisions-md" tabindex="-1">工具 2：决策日志 (DECISIONS.md) <a class="header-anchor" href="#工具-2-决策日志-decisions-md" aria-label="Permalink to &quot;工具 2：决策日志 (DECISIONS.md)&quot;">​</a></h3><p>记录重要设计决策和原因。不需要详细设计文档——只要&quot;什么决策、为何、何时&quot;：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}"># 设计决策</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 2024-01-15: 使用 Redis 缓存用户偏好</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 原因：高频读取（每次 API 调用）、数据量小</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 被否决方案：PostgreSQL 物化视图（高频变更使维护成本不划算）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">-</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 约束：缓存 TTL 5 分钟，写时主动失效</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="工具-3-git-提交作为检查点" tabindex="-1">工具 3：Git 提交作为检查点 <a class="header-anchor" href="#工具-3-git-提交作为检查点" aria-label="Permalink to &quot;工具 3：Git 提交作为检查点&quot;">​</a></h3><p>完成每个原子工作单元后提交。提交信息应说明做了什么和为何这样做。这是免费的、自动版本化的状态快照。</p><h3 id="工具-4-init-sh-或-harness-初始化流程" tabindex="-1">工具 4：init.sh 或 harness 初始化流程 <a class="header-anchor" href="#工具-4-init-sh-或-harness-初始化流程" aria-label="Permalink to &quot;工具 4：init.sh 或 harness 初始化流程&quot;">​</a></h3><p>在 <code>AGENTS.md</code> 中指定&quot;打卡&quot;和&quot;下班&quot;流程：</p><div class="language-markdown vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 会话开始（打卡）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 读取 PROGRESS.md 了解当前状态</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">2.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 读取 DECISIONS.md 了解重要决策</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">3.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 运行 make check 确认仓库状态一致</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">4.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 从 PROGRESS.md &quot;下一步&quot;部分接续</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-light-font-weight": "bold", "--shiki-dark": "#79B8FF", "--shiki-dark-font-weight": "bold" })}">## 会话结束（下班）</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">1.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 更新 PROGRESS.md</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">2.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 运行 make check 确认状态一致</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">3.</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> 提交所有完成的工作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="混合策略" tabindex="-1">混合策略 <a class="header-anchor" href="#混合策略" aria-label="Permalink to &quot;混合策略&quot;">​</a></h3><p>不是每个任务都需要上下文重置。短任务（30 分钟内）可在一个会话内完成。长任务（跨会话）必须用进度文件和决策日志保持连续。判断标准：如果任务需要超过 60% 的窗口，开始准备交接。</p><h2 id="_4-7-深入理解上下文焦虑" tabindex="-1">4.7 深入理解上下文焦虑 <a class="header-anchor" href="#_4-7-深入理解上下文焦虑" aria-label="Permalink to &quot;4.7 深入理解上下文焦虑&quot;">​</a></h2><p>Anthropic 2026 年 3 月研究进一步揭示了上下文焦虑的具体表现：在 Sonnet 4.5 上，当上下文接近窗口限制时，智能体表现出强烈的&quot;仓促收尾&quot;行为。</p><p>两种应对策略：</p><p><strong>压缩</strong>：在同一会话内总结上下文。保留&quot;是什么&quot;，可能丢失&quot;为什么&quot;。适合短暂停。 <strong>重置</strong>：开启新会话从持久化状态重建。干净但依赖工件完整性。适合长暂停或上下文极度紧张时。</p><p>选择标准：如果任务明显跨越会话边界，用重置；如果只是短暂中断，用压缩。</p><h2 id="_4-8-本章小结" tabindex="-1">4.8 本章小结 <a class="header-anchor" href="#_4-8-本章小结" aria-label="Permalink to &quot;4.8 本章小结&quot;">​</a></h2><ul><li>上下文窗口有限，复杂任务终将耗尽</li><li>状态持久化文件让新会话能明确接续</li><li>重建成本是衡量 harness 质量的关键指标</li><li>漂移逐会话累积，必须主动控制</li><li>上下文焦虑导致仓促收尾，需用持久化缓解</li><li>PROGRESS.md + DECISIONS.md + git 提交 + init.sh 是四大工具</li></ul>`);
      _push(ssrRenderComponent(_component_Quiz, { items: quiz }, null, _parent));
      _push(`<h2 id="🛠️-动手实践" tabindex="-1">🛠️ 动手实践 <a class="header-anchor" href="#🛠️-动手实践" aria-label="Permalink to &quot;🛠️ 动手实践&quot;">​</a></h2><ol><li>为一个长任务（&gt;30 分钟）创建 PROGRESS.md 模板，包含当前状态、已完成、进行中、已知问题、下一步。</li><li>运行一次跨会话实验：会话 1 做一半停掉，会话 2 仅读 PROGRESS.md 接续，记录重建成本。</li><li>实现 init.sh 的打卡/下班流程，让智能体每次会话自动读写状态文件。</li></ol><p><a href="./ch05.html">下一章：控制机制：防止越界与过早胜利</a></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("agent/ch04.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
