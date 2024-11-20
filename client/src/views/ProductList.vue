<template>
  <div class="container mt-4">
    <div class="home-link-container mb-4">
      <div class="d-flex justify-content-between align-items-center w-100">
        <router-link to="/" class="btn btn-primary home-button">
          返回首頁
        </router-link>
        <router-link to="/cart" class="btn btn-primary cart-button">
          查看購物車
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <!-- 篩選器 -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">篩選</h5>
            <div class="mb-3">
              <label class="form-label">分類</label>
              <select v-model="selectedCategory" class="form-select">
                <option value="">全部</option>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">排序</label>
              <select v-model="sortBy" class="form-select">
                <option value="newest">最新</option>
                <option value="price-asc">價格從低到高</option>
                <option value="price-desc">價格從高到低</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div v-for="product in products" :key="product._id" class="col-md-4 mb-4">
            <div class="card product-card">
              <img :src="product.images[0]" class="card-img-top product-image" :alt="product.name">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text text-danger">HKD {{ product.price }}</p>
                <router-link :to="`/product/${product._id}`" class="btn btn-primary">
                  產品詳情
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- 分頁 -->
        <nav v-if="totalPages > 1" class="mt-4">
          <ul class="pagination justify-content-center">
            <li v-for="page in totalPages" :key="page" class="page-item" 
                :class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">
                {{ page }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProductList',
  setup() {
    const store = useStore()
    const products = ref([])
    const selectedCategory = ref('')
    const sortBy = ref('newest')
    const categories = ['炊具', '刀具', '餐具', '收納', '小電器']

    const loadProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${selectedCategory.value}&sort=${sortBy.value}`)
        const data = await response.json()
        products.value = data.products
      } catch (error) {
        console.error('加載產品失敗:', error)
      }
    }

    const addToCart = (product) => {
      store.dispatch('cart/addItem', product)
    }

    onMounted(() => {
      loadProducts()
    })

    watch([selectedCategory, sortBy], loadProducts)

    return {
      products,
      selectedCategory,
      sortBy,
      categories,
      addToCart
    }
  }
}
</script>

<style scoped>
.home-button,
.cart-button {
  background-color: black;
  border: none;
  padding: 8px 24px;
  transition: all 0.3s ease;
}

.home-button:hover,
.cart-button:hover {
  background-color: #333;
  transform: translateY(-2px);
}

/* 添加你的樣式 */
</style>