<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { autoFocusFirstInput } from '@/utils/auto-focus'
import type { InputInstance } from 'element-plus/es/components/index.mjs'

const loginFormRef = ref()
const firstInputRef = ref<InputInstance>()

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('Form is valid')
    } else {
      console.error('Form validation failed')
      return false
    }
  })
  console.log('Username:', email.value)
  console.log('Password:', password.value)
}

defineExpose({
  handleSubmit,
  loginFormRef,
})

onMounted(() => {
  autoFocusFirstInput(firstInputRef.value)
})
</script>

<template>
  <div>
    <el-form ref="loginFormRef" label-position="left" @submit.prevent="handleSubmit">
      <el-form-item>
        <el-input ref="firstInputRef" v-model="email" placeholder="請輸入 Email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="請輸入密碼"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
