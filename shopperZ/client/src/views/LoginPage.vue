<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">登入</h3>
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label class="form-label">電子郵件</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    v-model="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="請輸入有效的電子郵件地址"
                  >
                </div>
                <div class="mb-3">
                  <label class="form-label">密碼</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    v-model="password"
                    required
                  >
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">登入</button>
                </div>
                <div class="text-center mt-3">
                  <router-link to="/register">還沒有帳號？立即註冊</router-link>
                </div>
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
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        router.push('/');
      } catch (error) {
        alert(error.message || '登入失敗');
      }
    }

    return {
      email,
      password,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* 添加你的樣式 */
</style>