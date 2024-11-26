<template>
  <div class="container mt-4">
    <h2>購物車</h2>
    <div v-if="cartItems.length === 0" class="text-center mt-5">
      <p>購物車是空的</p>
      <button @click="goToProducts" class="btn btn-primary">
        去購物
      </button>
    </div>
    <div v-else>
      <div class="d-flex justify-content-end mb-3">
        <button @click="goToProducts" class="btn btn-secondary">
          繼續購物
        </button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>商品圖片</th>
              <th>商品名稱</th>
              <th>尺寸</th>
              <th>價格</th>
              <th>數量</th>
              <th>小計</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.productId + item.size">
              <td>
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  style="width: 50px; height: 50px; object-fit: contain;"
                  @error="handleImageError"
                >
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.size }}</td>
              <td>HKD {{ item.price }}</td>
              <td>
                <div class="input-group w-auto">
                  <button class="btn btn-outline-secondary" @click="updateQuantity(item, -1)" :disabled="item.quantity <= 1">-</button>
                  <input type="number" class="form-control text-center" v-model="item.quantity" style="width: 60px" readonly>
                  <button class="btn btn-outline-secondary" @click="updateQuantity(item, 1)">+</button>
                </div>
              </td>
              <td>HKD {{ (item.price * item.quantity).toFixed(2) }}</td>
              <td>
                <button class="btn btn-danger" @click="removeItem(item)">移除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-end mt-3">
        <h4>總計: HKD {{ total.toFixed(2) }}</h4>
        <button class="btn btn-success" @click="checkout">結帳</button>
      </div>
    </div>

    <!-- 添加結帳模態框 -->
    <div class="modal fade" id="checkoutModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">選擇配送地址</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <!-- 已有地址列表 -->
            <div v-if="userAddresses.length > 0">
              <h6>選擇已有地址：</h6>
              <div class="list-group mb-3">
                <button
                  v-for="(address, index) in userAddresses"
                  :key="index"
                  class="list-group-item list-group-item-action"
                  :class="{ active: selectedAddress === address }"
                  @click="selectAddress(address)"
                >
                  {{ address.street }}, {{ address.city }}, {{ address.state }} {{ address.zipCode }}
                </button>
              </div>
            </div>

            <!-- 新增地址表單 -->
            <div>
              <h6>或新增地址：</h6>
              <div class="mb-3">
                <label class="form-label">街道地址</label>
                <input 
                  type="text" 
                  class="form-control"
                  v-model="newAddress.street"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">城市</label>
                <input 
                  type="text" 
                  class="form-control"
                  v-model="newAddress.city"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">州/省</label>
                <input 
                  type="text" 
                  class="form-control"
                  v-model="newAddress.state"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">郵遞區號</label>
                <input 
                  type="text" 
                  class="form-control"
                  v-model="newAddress.zipCode"
                  required
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="confirmOrder">確認下單</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

export default {
  name: 'CartPage',
  setup() {
    const router = useRouter()
    const cartItems = ref([])
    const userAddresses = ref([])
    const selectedAddress = ref(null)
    const newAddress = ref({ 
      street: '', 
      city: '', 
      state: '', 
      zipCode: '' 
    })
    let checkoutModal = null
    
    const loadCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      cartItems.value = cart
    }
    
    const total = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    })
    
    const updateQuantity = (item, amount) => {
      const newQuantity = item.quantity + amount
      if (newQuantity < 1) return
      
      item.quantity = newQuantity
      saveCart()
    }
    
    const removeItem = (item) => {
      cartItems.value = cartItems.value.filter(
        i => !(i.productId === item.productId && i.size === item.size)
      )
      saveCart()
    }
    
    const saveCart = () => {
      localStorage.setItem('cart', JSON.stringify(cartItems.value))
    }
    
    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/50x50?text=無圖片'
    }
    
    const loadUserAddresses = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error('載入地址失敗')
        }
        
        const data = await response.json()
        userAddresses.value = data.addresses || []
      } catch (error) {
        console.error('載入地址失敗:', error)
      }
    }

    const selectAddress = (address) => {
      selectedAddress.value = address
    }

    const checkout = () => {
      // 顯示地址選擇模態框
      checkoutModal.show()
    }

    const confirmOrder = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const shippingAddress = selectedAddress.value || newAddress.value
        if (!shippingAddress.street || !shippingAddress.city || 
            !shippingAddress.state || !shippingAddress.zipCode) {
          alert('請填寫完整的配送地址')
          return
        }

        const orderData = {
          items: cartItems.value.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            size: item.size,
            quantity: item.quantity,
            image: item.image
          })),
          totalAmount: total.value,
          shippingAddress
        }

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(orderData)
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error('創建訂單失敗')
        }

        cartItems.value = []
        localStorage.removeItem('cart')
        checkoutModal.hide()
        router.push('/orders')
      } catch (error) {
        console.error('結帳失敗:', error)
        alert('結帳失敗，請稍後再試')
      }
    }

    const goToProducts = () => {
      router.push('/products')
    }
    
    onMounted(() => {
      loadCartItems()
      loadUserAddresses()
      // 初始化模態框
      checkoutModal = new Modal(document.getElementById('checkoutModal'))
    })
    
    return {
      cartItems,
      total,
      userAddresses,
      selectedAddress,
      newAddress,
      updateQuantity,
      removeItem,
      checkout,
      selectAddress,
      confirmOrder,
      handleImageError,
      goToProducts
    }
  }
}
</script>

<style scoped>
.table img {
  max-width: 50px;
  height: auto;
}

.input-group {
  max-width: 120px;
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>