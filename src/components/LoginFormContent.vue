<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { autoFocusFirstInput } from '@/utils/auto-focus'
import type { InputInstance } from 'element-plus/es/components/index.mjs'

const loginFormRef = ref()
const firstInputRef = ref<InputInstance>()

interface LoginFormModel {
  email: string
  password: string
}
const loginFormModel = ref<LoginFormModel>({
  email: '',
  password: '',
})

const formRules = {
  email: [
    { required: true, message: '請輸入 Email', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的 Email 格式', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 20, message: '密碼長度應在 6 到 20 個字符之間', trigger: ['blur', 'change'] },
  ],
}

const handleSubmit = async () => {
  try {
    const valid = await loginFormRef.value.validate()
    if (!valid) {
      throw new Error('表單驗證失敗')
    }
  } catch (error) {
    console.error('表單驗證錯誤:', error)
    throw error
  }
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
    <el-form ref="loginFormRef" :model="loginFormModel" :rules="formRules" label-position="left">
      <el-form-item prop="email">
        <el-input
          ref="firstInputRef"
          v-model="loginFormModel.email"
          placeholder="請輸入 Email"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginFormModel.password"
          placeholder="請輸入密碼"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
