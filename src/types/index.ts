import type { DialogProps } from 'element-plus'
import type { VNode } from 'vue'

export interface DialogConfig {
  title?: string
  content?: VNode | (() => VNode)
  dialogSlots?: {
    header?: () => VNode
    footer?: () => VNode
  }
  dialogProps?: Partial<
    DialogProps & {
      class?: string | string[] | { [key: string]: boolean }
    }
  >
  onClose?: () => void
}
