import { nextTick } from 'vue'
import type { InputInstance } from 'element-plus/es/components/index.mjs'

export const autoFocusFirstInput = async (
  inputInstance: InputInstance | undefined,
  delay = 300,
) => {
  if (!inputInstance) {
    return
  }
  await nextTick()

  setTimeout(() => {
    inputInstance?.focus()
  }, delay)
}
