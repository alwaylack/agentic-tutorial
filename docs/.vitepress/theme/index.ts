// GitHub Light 主题
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Quiz from '../../components/Quiz.vue'
import CourseCards from '../../components/CourseCards.vue'
import NavGitHubStars from '../../components/NavGitHubStars.vue'
import './github-light.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 右上角 GitHub 图标后追加 Star 数量徽章
      'nav-bar-content-after': () => h(NavGitHubStars)
    })
  },
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('CourseCards', CourseCards)
  }
}
