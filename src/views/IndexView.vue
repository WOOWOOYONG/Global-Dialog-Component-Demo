<script setup lang="ts">
import LoginFormContent from '@/components/LoginFormContent.vue'
import { CommonEvent } from '@/enums'
import { eventEmitter } from '@/utils/event-emitter'
import type { LoginFormExposed } from '@/types'
import { ElButton } from 'element-plus'
import { h, type ComponentPublicInstance } from 'vue'

const openDialog = (options: {
  title?: string
  onConfirm: () => Promise<void>
  onCancel?: () => void
}) => {
  let loginFormRef: (ComponentPublicInstance & LoginFormExposed) | null = null

  eventEmitter.emit(CommonEvent.OPEN_DIALOG, {
    title: options.title || 'Login',
    content: () =>
      h(LoginFormContent, {
        ref: (el: Element | ComponentPublicInstance | null) => {
          loginFormRef = el as (ComponentPublicInstance & LoginFormExposed) | null
        },
        onConfirm: async () => {
          await options.onConfirm()
          eventEmitter.emit(CommonEvent.CLOSE_DIALOG)
        },
        onCancel: () => {
          options.onCancel?.()
          eventEmitter.emit(CommonEvent.CLOSE_DIALOG)
        },
      }),
    dialogSlots: {
      footer: () =>
        h('div', { class: 'flex items-center gap-4 justify-end mb-4' }, [
          h(
            ElButton,
            {
              onClick: () => {
                eventEmitter.emit(CommonEvent.CLOSE_DIALOG)
                options.onCancel?.()
              },
            },
            { default: () => '取消' },
          ),
          h(
            ElButton,
            {
              type: 'primary',
              onClick: async () => {
                await loginFormRef?.handleSubmit()
                await options.onConfirm()
                eventEmitter.emit(CommonEvent.CLOSE_DIALOG)
              },
            },
            { default: () => '確定' },
          ),
        ]),
    },
    dialogProps: {
      width: '400px',
    },
  })
}

const openLoginDialog = () => {
  console.log('Opening login dialog...')
  openDialog({
    title: '登入',
    onConfirm: async () => {
      console.log('Login confirmed')
    },
    onCancel: () => {
      console.log('Login cancelled')
    },
  })
}
</script>

<template>
  <main class="flex flex-col items-center h-screen bg-slate-50">
    <h1 class="text-2xl mb-10 font-bold mt-50">Global Dialog Demo</h1>
    <div>
      <el-button @click="openLoginDialog">Login</el-button>
    </div>
  </main>
</template>

<style scoped></style>
