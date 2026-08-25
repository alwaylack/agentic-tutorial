// GitHub Light 主题
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Quiz from '../../components/Quiz.vue'
import CourseCards from '../../components/CourseCards.vue'
import NavGitHubStars from '../../components/NavGitHubStars.vue'
import AskAi from '../../components/AskAi.vue'
import AboutDialog from '../../components/AboutDialog.vue'
import NavAbout from '../../components/NavAbout.vue'
import './github-light.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 右上角：GitHub Stars 徽章 + 关于 按钮
      'nav-bar-content-after': () => h('div', { style: 'display:flex;align-items:center;gap:8px;' }, [
        h(NavGitHubStars),
        h(NavAbout)
      ]),
      // 全局 Ask AI 悬浮球（fixed 定位，不影响布局）
      'layout-bottom': () => h(AskAi),
      // About 弹窗（Teleport to body）
      'layout-after': () => h(AboutDialog)
    })
  },
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('CourseCards', CourseCards)
  }
}
