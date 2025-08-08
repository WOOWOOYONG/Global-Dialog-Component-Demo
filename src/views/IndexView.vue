<script setup lang="ts">
import LoginFormContent from '@/components/LoginFormContent.vue'
import { CommonEvent } from '@/enums'
import { eventEmitter } from '@/utils/event-emitter'
import { ElButton } from 'element-plus'
import { h } from 'vue'

const openDialog = (options: { title?: string; onConfirm: () => void; onCancel?: () => void }) => {
  eventEmitter.emit(CommonEvent.OPEN_DIALOG, {
    title: options.title || 'Login',
    content: () =>
      h(LoginFormContent, {
        onConfirm: () => {
          options.onConfirm()
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
              onClick: () => {
                eventEmitter.emit(CommonEvent.CLOSE_DIALOG)
                options.onConfirm()
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
    onConfirm: () => {
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
