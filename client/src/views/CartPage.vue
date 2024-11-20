<template>
    <div class="container mt-4">
      <h2>購物車</h2>
      <div v-if="cartItems.length === 0" class="text-center mt-5">
        <p>購物車是空的</p>
        <router-link to="/products" class="btn btn-primary">
          去購物
        </router-link>
      </div>
      <div v-else>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>商品</th>
                <th>價格</th>
                <th>數量</th>
                <th>小計</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item._id">
                <td>{{ item.name }}</td>
                <td>HKD{{ item.price }}</td>
                <td>
                  <div class="input-group w-auto">
                    <button class="btn btn-outline-secondary" @click="updateQuantity(item, -1)">-</button>
                    <input type="number" class="form-control text-center" v-model="item.quantity" readonly>
                  </div>
                </td>
                <td>HKD{{ item.price * item.quantity }}</td>
                <td>
                  <button class="btn btn-danger" @click="removeItem(item)">移除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-end">
          <h4>總計: HKD{{ total }}</h4>
          <button class="btn btn-success" @click="checkout">結帳</button>
        </div>
      </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'CartPage',
  setup() {
    const store = useStore()
    const cartItems = computed(() => store.state.cart.items)
    const total = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

    const updateQuantity = (item, amount) => {
      store.dispatch('cart/updateItemQuantity', { item, amount })
    }

    const removeItem = (item) => {
      store.dispatch('cart/removeItem', item)
    }

    const checkout = () => {
      store.dispatch('cart/checkout')
    }

    return {
      cartItems,
      total,
      updateQuantity,
      removeItem,
      checkout
    }
  }
}
</script>

<style scoped>
/* 添加你的樣式 */
</style>