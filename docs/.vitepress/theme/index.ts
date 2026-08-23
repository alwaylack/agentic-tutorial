// GitHub Light 主题
import DefaultTheme from 'vitepress/theme'
import Quiz from '../../components/Quiz.vue'
import CourseCards from '../../components/CourseCards.vue'
import GitHubStars from '../../components/GitHubStars.vue'
import './github-light.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('CourseCards', CourseCards)
    app.component('GitHubStars', GitHubStars)
  }
}
