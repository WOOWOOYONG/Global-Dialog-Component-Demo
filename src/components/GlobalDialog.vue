<script setup lang="ts" generic="T">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { ElDialog } from 'element-plus'

import { eventEmitter } from '@/utils/event-emitter'

import { CommonEvent } from '@/enums/index'

import type { DialogConfig } from '@/types/index'

const dialogVisible = ref(false)
const configs = ref<DialogConfig | null>(null)

const closeDialog = () => {
  dialogVisible.value = false
  configs.value?.onClose?.()
  const timeout = setTimeout(() => {
    clearTimeout(timeout)
    configs.value = null
  }, 200)
}

onMounted(() => {
  eventEmitter.on(CommonEvent.OPEN_DIALOG, (options) => {
    let threshold = 0
    if (dialogVisible.value) {
      dialogVisible.value = false
      threshold = 200
    }
    const timeout = setTimeout(() => {
      configs.value = options
      dialogVisible.value = true
      clearTimeout(timeout)
    }, threshold)
  })

  eventEmitter.on(CommonEvent.CLOSE_DIALOG, closeDialog)
})

onBeforeUnmount(() => {
  eventEmitter.off(CommonEvent.OPEN_DIALOG)
  eventEmitter.off(CommonEvent.CLOSE_DIALOG)
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    destroy-on-close
    :show-close="false"
    v-bind="configs?.dialogProps"
    @close="closeDialog"
  >
    <template #header>
      <template v-if="configs?.dialogSlots?.header">
        <component :is="configs.dialogSlots.header" />
      </template>
      <h3
        v-else-if="configs?.title"
        class="whitespace-pre-line break-all text-lg font-bold tracking-[0.36px] text-gray-800"
        v-text="configs?.title"
      />
    </template>
    <template v-if="configs?.content">
      <div>
        <component :is="configs?.content" />
      </div>
    </template>
    <template #footer>
      <template v-if="configs?.dialogSlots?.footer">
        <component :is="configs.dialogSlots.footer" />
      </template>
    </template>
  </el-dialog>
</template>
