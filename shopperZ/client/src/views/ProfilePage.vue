<template>
  <div class="container mt-4 position-relative">
    <button 
      type="button" 
      class="btn btn-dark position-absolute top-0 end-0 mt-2 me-2"
      @click="goHome"
    >
      返回首頁
    </button>
    <h2>個人資料</h2>
    <div class="card mb-4">
      <div class="card-body">
        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label class="form-label">用戶名</label>
            <input 
              type="text" 
              class="form-control" 
              v-model="profile.username" 
              readonly
            >
          </div>
          <div class="mb-3">
            <label class="form-label">電子郵件</label>
            <input 
              type="email" 
              class="form-control" 
              v-model="profile.email" 
              readonly
            >
          </div>
          <div class="mb-3">
            <label class="form-label">電話</label>
            <input 
              type="tel" 
              class="form-control" 
              v-model="profile.phone"
            >
          </div>
          
          <div class="mb-3">
            <label class="form-label">地址</label>
            <div v-for="(address, index) in profile.addresses" :key="index" class="mb-2">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="address.street" 
                  placeholder="街道地址"
                  required
                >
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="address.city" 
                  placeholder="城市"
                  required
                >
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="address.state" 
                  placeholder="州/省"
                  required
                >
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="address.zipCode" 
                  placeholder="郵遞區號"
                  required
                >
                <button 
                  type="button" 
                  class="btn btn-danger"
                  @click="removeAddress(index)"
                >
                  刪除
                </button>
              </div>
            </div>
            <div class="text-center"><button 
              type="button" 
              class="btn btn-secondary mt-2"
              @click="addAddress"
            >
              添加地址
            </button>
             </div>
          </div>

          <div class="text-end">
            <button type="submit" class="btn btn-primary">
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 添加修改密碼表單 -->
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">修改密碼</h3>
        <form @submit.prevent="updatePassword">
          <div class="mb-3">
            <label class="form-label">當前密碼</label>
            <input 
              type="password" 
              class="form-control" 
              v-model="passwordForm.currentPassword"
              required
            >
          </div>
          <div class="mb-3">
            <label class="form-label">新密碼</label>
            <input 
              type="password" 
              class="form-control" 
              v-model="passwordForm.newPassword"
              required
            >
            <small class="text-muted">
              密碼至少10個字符，必須包含數字和字母
            </small>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-warning">
              更新密碼
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'ProfilePage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const profile = ref({
      username: '',
      email: '',
      phone: '',
      addresses: []
    })

    const passwordForm = ref({
      currentPassword: '',
      newPassword: ''
    })

    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = route.query.userId // 從 query 參數獲取 userId

        let url = '/api/users/profile'
        if (userId) {
          // 如果有 userId，說明是管理員查看其他用戶資料
          url = `/api/users/profile?userId=${userId}`
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!response.ok) throw new Error('載入個人資料失敗')
        const data = await response.json()
        profile.value = data
      } catch (error) {
        console.error('載入個人資料失敗:', error)
      }
    }

    const updateProfile = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            phone: profile.value.phone,
            addresses: profile.value.addresses
          })
        })
        if (!response.ok) throw new Error('更新個人資料失敗')
        alert('更新成功')
      } catch (error) {
        console.error('更新個人資料失敗:', error)
        alert('更新失敗')
      }
    }

    const updatePassword = async () => {
      try {
        const response = await fetch('/api/users/password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(passwordForm.value)
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message)
        }
        
        alert('密碼更新成功')
        passwordForm.value = { currentPassword: '', newPassword: '' }
      } catch (error) {
        alert(error.message || '密碼更新失敗')
      }
    }

    const addAddress = () => {
      profile.value.addresses.push({
        street: '',
        city: '',
        state: '',
        zipCode: ''
      })
    }

    const removeAddress = (index) => {
      profile.value.addresses.splice(index, 1)
    }

    const goHome = () => {
      router.push('/')
    }

    onMounted(loadProfile)

    return {
      profile,
      passwordForm,
      updateProfile,
      updatePassword,
      addAddress,
      removeAddress,
      goHome
    }
  }
}
</script> 