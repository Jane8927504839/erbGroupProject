<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">註冊</h3>
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label class="form-label" for="username">用戶名</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="username"
                    v-model="username"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label" for="email">電子郵件</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email"
                    v-model="email"
                    required
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label" for="password">密碼</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password"
                    v-model="password"
                    required
                  >
                </div>
                <button type="submit" class="btn btn-primary w-100">註冊</button>
                <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter()
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleSubmit = async () => {
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
          })
        });

        if (!response.ok) {
          const error = await response.json();
          // 顯示第一個錯誤訊息
          if (error.errors && error.errors.length > 0) {
            errorMessage.value = error.errors[0].msg;
          } else {
            errorMessage.value = error.message;
          }
          return;
        }

        router.push('/login');
      } catch (error) {
        errorMessage.value = error.message || '註冊失敗';
      }
    }

    return {
      username,
      email,
      password,
      errorMessage,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* 添加你的樣式 */
</style>