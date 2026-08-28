// GitHub Light 主题
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Quiz from '../../components/Quiz.vue'
import CourseCards from '../../components/CourseCards.vue'
import NavGitHubStars from '../../components/NavGitHubStars.vue'
import AskAi from '../../components/AskAi.vue'
import LangToggle from './LangToggle.vue'
import LangToggleClient from './LangToggleClient'
import './github-light.css'

export default {
  extends: DefaultTheme,
  // Register client plugin (runs in browser, has access to import.meta.env)
  enhanceApp({ app }) {
    app.use(LangToggleClient)
    app.component('Quiz', Quiz)
    app.component('CourseCards', CourseCards)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 右上角 GitHub 图标徽章；语言切换由 VitePress 内置 locale 切换器提供
      'nav-bar-content-after': () => h(NavGitHubStars),
      // 浮动语言切换开关（仅开发模式可见）
      'nav-screen-content-after': () => h(LangToggle),
      // 全局 Ask AI 悬浮球（fixed 定位，不影响布局）
      'layout-bottom': () => h(AskAi)
    })
  },
}
