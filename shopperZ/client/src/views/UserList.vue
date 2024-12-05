<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>用戶列表</h2>
      <router-link to="/" class="btn btn-primary">
        返回首頁
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>用戶名</th>
            <th>權限</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.username }}</td>
            <td>{{ user.role === 'admin' ? '管理員' : '普通用戶' }}</td>
            <td>
              <button 
                class="btn btn-purple"
                @click="viewProfile(user._id)"
                :disabled="!canViewProfile(user._id)"
              >
                查看資料
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UserList',
  setup() {
    const router = useRouter()
    const users = ref([])
    const currentUser = ref(null)

    const loadUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('/api/users/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) throw new Error('載入用戶列表失敗')
        const data = await response.json()
        users.value = data
      } catch (error) {
        console.error('載入用戶列表失敗:', error)
      }
    }

    const loadCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) throw new Error('載入用戶資料失敗')
        const data = await response.json()
        currentUser.value = data
      } catch (error) {
        console.error('載入用戶資料失敗:', error)
      }
    }

    const canViewProfile = (userId) => {
      return currentUser.value?.role === 'admin' || 
             currentUser.value?._id === userId
    }

    const viewProfile = (userId) => {
      if (canViewProfile(userId)) {
        if (currentUser.value.role === 'admin') {
          // 管理員查看用戶資料
          router.push({
            name: 'Profile',
            query: { userId: userId }
          })
        } else {
          // 普通用戶只能查看自己的資料
          router.push('/profile')
        }
      }
    }

    onMounted(() => {
      loadCurrentUser()
      loadUsers()
    })

    return {
      users,
      currentUser,
      canViewProfile,
      viewProfile
    }
  }
}
</script>

<style scoped>
.btn-primary {
  background-color: black;
  border: none;
  padding: 8px 24px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #333;
  transform: translateY(-2px);
}

.btn-purple {
  background-color: #6f42c1;
  color: white;
  border: none;
  padding: 8px 24px;
  transition: all 0.3s ease;
}

.btn-purple:hover {
  background-color: #563d7c;
  transform: translateY(-2px);
}

.btn-purple:disabled {
  background-color: #b8a2e3;
  cursor: not-allowed;
}
</style> 