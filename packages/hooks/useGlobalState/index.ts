import { effectScope } from 'vue'

export type AnyFn = (...args: any[]) => any

export const useGlobalState = <Fn extends AnyFn>(stateFactory: Fn): Fn => {
  let initialized = false
  let state: any
  /**
   * effectScope 接收一个 boolean 值，
   * 如果传 true 代表游离模式，此时创建的 scope 不会被父 scope 收集
   * 即每一个 scope 都是独立的
   * 推荐文章：https://juejin.cn/post/7115016887594909732?searchId=2023121311465264A1AA2922F7D88F6752
   */
  const scope = effectScope(true)

  return ((...args: any[]) => {
    if (!initialized) {
      state = scope.run(() => stateFactory(...args))!
      initialized = true
    }
    return state
  }) as Fn
}
