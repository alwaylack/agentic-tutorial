// About 弹窗共享状态模块
// 被 AboutDialog.vue 和 NavAbout.vue 共同导入
import { reactive } from 'vue'

export const aboutState = reactive({ open: false })

export function openAbout() {
  aboutState.open = true
}
