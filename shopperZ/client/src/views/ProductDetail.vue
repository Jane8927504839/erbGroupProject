<template>
  <div class="container">
    <div class="single-product">
      <div class="cart-link-container">
        <router-link to="/cart" class="btn btn-primary cart-button">
          查看購物車
        </router-link>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="product-image">
            <div class="product-image-main">
              <img :src="currentImage" :alt="product.name" id="product-main-image">
            </div>
            <div class="product-image-slider">
              <img 
                v-for="(image, index) in product.images" 
                :key="index"
                :src="image" 
                :alt="product.name"
                class="image-list"
                @click="setMainImage(image)"
                @error="handleImageError"
              >
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="breadcrumb">
            <span>
              <router-link to="/" class="nav-link">
                <strong>返回首頁</strong>
              </router-link>
            </span>
            <span>
              <router-link to="/products" class="nav-link">
                <strong>篩選商品</strong>
              </router-link>
            </span>
            <span class="active">{{ product.name }}</span>
          </div>

          <div class="product">
            <div class="product-title">
              <h2>{{ product.name }}</h2>
            </div>
            <div class="product-price">
              <span class="offer-price">HKD {{ product.price?.toFixed(2) }}</span>
            </div>

            <div class="product-details">
              <div class="upload-time mb-2">
                <small class="text-muted">
                  上架時間: {{ formatDate(product.createdAt) }}
                </small>
              </div>
              <h3>商品描述</h3>
              <p>{{ product.description }}</p>
            </div>
            <div class="product-size">
              <h4>選擇商品類型</h4>
              <div class="size-layout">
                <div v-for="variant in product.variants" :key="variant.size">
                  <input 
                    type="radio" 
                    name="size" 
                    :value="variant.size" 
                    :id="variant.size" 
                    class="size-input"
                    v-model="selectedSize"
                    :disabled="variant.stock === 0"
                  >
                  <label :for="variant.size" class="size">
                    {{ variant.size }}
                    <span class="stock-info" :class="{ 'out-of-stock': variant.stock === 0 }">
                      ({{ variant.stock > 0 ? `庫存: ${variant.stock}` : '無貨' }})
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <span class="divider"></span>

            <div class="product-btn-group">
              <div 
                class="button buy-now" 
                :class="{ 'disabled': !canPurchase }"
                @click="handleBuyNow"
              >
                <i class='bx bxs-zap'></i>
                <span>立即購買</span>
              </div>
              <div 
                class="button add-cart"
                :class="{ 'disabled': !canPurchase }"
                @click="handleAddToCart"
              >
                <i class='bx bxs-cart'></i>
                <span>加入購物車</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetails',
  setup() {
    return {}
  },
  data() {
    return {
      product: {
        name: '',
        price: 0,
        description: '',
        images: [],
        variants: [],
        createdAt: null
      },
      selectedSize: null,
      currentImage: null,
      loading: true,
      error: null
    }
  },
  computed: {
    currentVariant() {
      return this.product.variants?.find(v => v.size === this.selectedSize);
    },
    canPurchase() {
      return this.selectedSize && this.currentVariant?.stock > 0;
    }
  },
  methods: {
    async loadProduct() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          this.$router.push('/login')
          return
        }

        const response = await fetch(
          `/api/products/${this.$route.params.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login')
            return
          }
          throw new Error('商品載入失敗')
        }
        
        const data = await response.json()
        this.product = data
        this.currentImage = this.product.images[0]
      } catch (error) {
        console.error('載入商品失敗:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    setMainImage(image) {
      this.currentImage = image;
    },
    
    handleImageError(e) {
      e.target.src = 'https://via.placeholder.com/200x200?text=無圖片';
    },
    
    handleBuyNow() {
      if (!this.canPurchase) return;
      // 實現購買邏輯
    },
    
    async handleAddToCart() {
      if (!this.canPurchase) return;
      
      try {
        const cartItem = {
          productId: this.product._id,
          name: this.product.name,
          price: this.product.price,
          image: this.product.images[0],
          size: this.selectedSize,
          quantity: 1
        };
        
        // 獲取現有購物車數據
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // 檢查是否已存在相同商品和尺寸
        const existingItemIndex = cart.findIndex(
          item => item.productId === cartItem.productId && item.size === cartItem.size
        );
        
        if (existingItemIndex > -1) {
          // 更新數量
          cart[existingItemIndex].quantity += 1;
        } else {
          // 添加新商品
          cart.push(cartItem);
        }
        
        // 保存到 localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // 跳轉到購物車頁面
        this.$router.push('/cart');
        
      } catch (error) {
        console.error('添加到購物車失敗:', error);
        alert('添加到購物車失敗，請稍後再試');
      }
    },
    formatDate(dateString) {
      if (!dateString) return '暫無資料';
      const date = new Date(dateString);
      return date.toLocaleString('zh-HK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  created() {
    this.loadProduct();
  }
}
</script>

<style scoped>
@import '../assets/styles/boxicons.css';

/** Global Layout & Variables **/
:root {
    --primary-color: #5344db;
    --accent-color: #5344db;
    --grey: #484848;
    --bg-grey: #efefef;
    --shadow: #949494;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

/** Common Styles **/
.container {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding: 20px;
}

.row {
    display: flex;
    width: 1080px;
    margin: 0 auto;
    gap: 20px;
}

.col-6 {
    flex: 0 0 48%;
    padding: 0 15px;
}

.single-product {
    width: 100%;
    position: relative;
}

/** Breadcrumb **/
.single-product .breadcrumb {
  background: #bf905340;
  padding: 8px 4px;
  border-radius: 8px;
  font-size: 15px;
}

.breadcrumb span {
  display: inline-flex;
  flex-direction: row;
  gap: 8px;
  margin-left: 8px;
}

.breadcrumb span:not(:last-child)::after {
  content: '/';
  color: #c89619;
  margin-left: 8px;
}

.breadcrumb .nav-link {
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 500;
  transition: all 0.3s ease;
}

.breadcrumb .nav-link:hover {
  color: #e76f06;
  transform: translateY(-1px);
}

.breadcrumb .nav-link strong {
  font-weight: 700;
}

.breadcrumb .active {
  color: #00000080;
}

/** Product Image **/
.single-product .product-image{
    width: 100%;
}

.product-image .product-image-main{
    position: relative;
    display: block;
    height: 480px;
    background: var(--bg-grey);
    padding: 10px;
}

.product-image-main img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.product-image-slider{
    display: flex;
    gap: 10px;
    margin: 10px 0;
}

.product-image-slider img{
    width: 90px;
    height: 90px;
    background: var(--bg-grey);
    padding: 6px;
    cursor: pointer;
}

/** Product Title **/
.product-title{
    margin-top: 20px;

}
.product-title h2{
    font-size: 32px;
    line-height: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.02rem;
}

/** Product Rating **/
.product-rating{
    display: flex;
    margin-top: 4px;
    margin-bottom: 10px;
    align-items: center;
}

.product-rating span:not(:last-child){
    color: #ffc600;
}
.product-rating .review{
    color: var(--grey);
    font-size: 12px;
    font-weight: 500;
}

/** Product Price **/
.product-price{
    display: flex;
    position: relative;
    margin: 10px 0;
    align-items: center;
}

.product-price .offer-price{
    font-size: 48px;
    font-weight: 700;
}
.product-price .sale-price{
    font-size: 22px;
    font-weight: 500;
    text-decoration: line-through;
    color: var(--grey);
    margin-left: 12px;
}

/** Product Details **/
.product-details{
    margin: 10px 0;
}
.product-details h3{
    font-size: 18px;
    font-weight: 500;
}
.product-details p{
    margin: 5px 0;
    font-size: 14px;
    line-height: 1.2rem;
}

/** Product Size **/
.product-size{
    margin: 10px 0;
}
.product-size h4{
    font-size: 16px;
    font-weight: 500;
}

.product-size .size-layout{
    margin: 5px 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.product-size .size-layout .size-input{
    display: none;
}

/* 修改標籤樣式 */
.product-size .size-layout .size{
    background: #fbe6c4;  /* 淺橘色背景 */
    padding: 10px 18px;
    border: 2px solid transparent;  /* 透明邊框，為選中狀態做準備 */
    border-radius: 4px;
    margin-left: 0px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;  /* 添加過渡效果 */
}

/* 懸停效果 */
.product-size .size-layout .size:hover{
  background: #FFB74D;  /* 深一點的橘色背景*/
}

/* 選中狀態 */
.product-size .size-layout input[type="radio"]:checked + .size {
    background-color: #fbe6c4;  /* 保持淺橘色背景 */
    border: 2px solid #000;    /* 黑色粗邊框 */
    color: #000;               /* 黑色文字 */
    box-shadow: 0 4px 8px rgba(43, 43, 43, 0.482);  /* 輕微陰影 */
}

/* 禁用狀態 */
.size-layout .size-input:disabled + .size {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;  /* 灰色背景 */
    border-color: transparent;
}

/* 庫存信息樣式 */
.stock-info {
    font-size: 12px;
    color: #666;
    margin-left: 4px;
}

.out-of-stock {
    color: #ff4444;
}

.button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

/** Divider **/
.divider{
    display: block;
    height: 1px;
    width: 100%;
    background: #48484830;
    margin: 20px 0;
}

/** Product Button Group **/
.product-btn-group{
    display: flex;
    gap: 15px;
}
.product-btn-group .button{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 24px;
    font-size: 16px;
    font-weight: 500;
}
.product-btn-group .button i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.product-btn-group .button span {
    display: inline-block;
}

.product-btn-group .buy-now{
    background-color: var(--accent-color);
    color: #fafafa00;
    border: 1px solid var(--accent-color);
    border-radius: 4px;
    cursor: pointer;
}

.product-btn-group .buy-now:hover{
    box-shadow:0 4px 8px rgba(43, 43, 43, 0);
}

.product-btn-group .add-cart{
    
    background-color: var(--bg-grey);
    color: var(--grey);
    border-radius: 4px;
    cursor: pointer;
}
.product-btn-group .add-cart:hover {
    box-shadow: 0 4px 8px rgba(43, 43, 43, 0.482);
    background: #333333;
    color: #fff;
}

/** Responsive Layouts **/
/* Tablet Layout (520px - 1080px) */
@media (min-width: 520px) and (max-width: 1080px) {
    .container {
        width: 100vw;        /* 容器占满视窗宽度 */
        margin-left: calc(-50vw + 50%);  /* 使容器居中且可以超出父元素 */
        margin-right: calc(-50vw + 50%); /* 使容器居中且可以超出父元素 */
        padding: 20px;
        height: auto;
        align-items: flex-start;
    }
    
    .row {
        width: 800px;        /* 平板端固定宽度 */
        margin: 0 auto;      /* 内容居中 */
    }
    
    .product-image .product-image-main {
        height: 400px;
    }
    
    .product-image-slider img {
        width: 70px;
        height: 70px;
    }
    
    .product-title h2 {
        font-size: 28px;
    }
    
    .product-price .offer-price {
        font-size: 36px;
    }
}

/* Mobile Layout (< 520px) */
@media screen and (max-width: 520px) {
    .container {
        margin-left: 0;
        margin-right: 0;
    }
    
    .row {
        width: 100%;
    }
    
    .col-6 {
      width: 100%;
        flex: 0 0 100%;  /* 在手机端占满宽度 */
        padding: 0;      /* 移除padding */
    }
    
    .single-product {
        width: 100%;
    }
    
    .product-image .product-image-main {
        height: 280px;
    }
    
    .product-image-slider {
        gap: 5px;
    }
    
    .product-image-slider img {
        width: 60px;
        height: 60px;
    }
    
    .breadcrumb {
        display: none;
    }
    
    .product-title h2 {
        font-size: 24px;
        line-height: 1.6rem;
    }
    
    .product-price .offer-price {
        font-size: 32px;
    }
    
    .product-price .sale-price {
        font-size: 18px;
    }
    
    .product-size {
        display: block;
    }
    
    .product-size .size-layout {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 10px 0;
    }
    
    .product-size .size-layout .size {
        padding: 6px 10px;
        font-size: 14px;
    }
    
    .product-btn-group {
        flex-direction: column;
        gap: 10px;
    }
    
    .product-btn-group .button {
        width: 100%;
        padding: 12px;
    }
}

/** Cart Link Container **/
.cart-link-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.cart-button {
  background-color: black;
  border: none;
  padding: 8px 24px;
  transition: all 0.3s ease;
}

.cart-button:hover {
  background-color: #333;
  transform: translateY(-2px);
}

.upload-time {
  color: #666;
  font-size: 0.9em;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-muted {
  color: #6c757d;
}
</style>