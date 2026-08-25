// 全局 About 状态（module 级别单例）
// 使用 function 工厂确保每次导入都拿到同一实例
let _open = false
const _listeners = new Set<() => void>()

export const aboutState = {
  get open() { return _open },
  set open(val: boolean) {
    if (_open !== val) {
      _open = val
      _listeners.forEach(fn => fn())
    }
  },
  subscribe(fn: () => void) {
    _listeners.add(fn)
    return () => _listeners.delete(fn)
  }
}

export function openAbout() {
  aboutState.open = true
}
