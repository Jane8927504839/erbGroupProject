<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>我的訂單</h2>
      <router-link to="/" class="btn btn-primary">
        返回首頁
      </router-link>
    </div>
    <div v-if="orders.length === 0" class="text-center mt-5">
      <p>暫無訂單</p>
      <router-link to="/products" class="btn btn-primary">
        去購物
      </router-link>
    </div>
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order._id" class="card mb-3">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <span>訂單編號: {{ order._id }}</span>
            <span>下單時間: {{ new Date(order.createdAt).toLocaleString() }}</span>
          </div>
        </div>
        
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-8">
              <div v-for="item in order.items" :key="item.productId" class="mb-2">
                <div class="d-flex align-items-center">
                  <img 
                    :src="item.image" 
                    :alt="item.name" 
                    class="order-item-image me-3"
                    @error="handleImageError"
                  >
                  <div>
                    <h6>{{ item.name }}</h6>
                    <p class="mb-0">
                      尺寸: {{ item.size }} | 
                      數量: {{ item.quantity }} | 
                      單價: HKD {{ item.price }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-4">
              <div class="text-end">
                <div class="mb-2">
                  <strong>總計: HKD {{ order.totalAmount.toFixed(2) }}</strong>
                </div>
                <button 
                  class="btn btn-danger"
                  @click="deleteOrder(order._id)"
                  :disabled="order.status !== 'pending'"
                >
                  刪除訂單
                </button>
              </div>
            </div>
          </div>

          <div class="row border-top pt-3">
            <div class="col-12">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 me-2">配送地址:</h6>
                <span>
                  {{ order.shippingAddress.street }}, 
                  {{ order.shippingAddress.city }}, 
                  {{ order.shippingAddress.state }} 
                  {{ order.shippingAddress.zipCode }}
                </span>
              </div>
            </div>
          </div>

          <div class="row border-top pt-3 mt-3">
            <div class="col-12">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 me-2">訂單狀態:</h6>
                <span :class="getStatusClass(order.status)">
                  {{ getStatusText(order.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'OrdersPage',
  setup() {
    const orders = ref([])

    const loadOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) throw new Error('載入訂單失敗')
        const data = await response.json()
        orders.value = data
      } catch (error) {
        console.error('載入訂單失敗:', error)
      }
    }

    const deleteOrder = async (orderId) => {
      if (!confirm('確定要刪除此訂單嗎？')) return
      
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) throw new Error('刪除訂單失敗')
        orders.value = orders.value.filter(order => order._id !== orderId)
      } catch (error) {
        console.error('刪除訂單失敗:', error)
        alert('刪除訂單失敗，請稍後再試')
      }
    }

    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/50x50?text=無圖片'
    }

    const getStatusText = (status) => {
      const statusMap = {
        'pending': '待處理',
        'processing': '處理中',
        'shipped': '已發貨',
        'delivered': '已送達',
        'cancelled': '已取消'
      }
      return statusMap[status] || status
    }

    const getStatusClass = (status) => {
      const classMap = {
        'pending': 'badge bg-warning',
        'processing': 'badge bg-info',
        'shipped': 'badge bg-primary',
        'delivered': 'badge bg-success',
        'cancelled': 'badge bg-danger'
      }
      return classMap[status] || 'badge bg-secondary'
    }

    onMounted(loadOrders)

    return {
      orders,
      deleteOrder,
      handleImageError,
      getStatusText,
      getStatusClass
    }
  }
}
</script>

<style scoped>
.order-item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  background-color: #f8f9fa;
}

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

.badge {
  padding: 8px 12px;
  font-size: 0.9em;
}

.border-top {
  border-top: 1px solid #dee2e6;
}

.pt-3 {
  padding-top: 1rem;
}

.mt-3 {
  margin-top: 1rem;
}

.badge {
  font-weight: 500;
  padding: 0.5em 1em;
  border-radius: 4px;
}
</style> 