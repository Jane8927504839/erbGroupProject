<template>
  <div class="home-page">
    <header>
      <div class="logo"><a href="#">廚具商城</a></div>
      <div class="menu">
        <a href="#" @click.prevent="closeMenu">
          <ion-icon name="close" class="close"></ion-icon>
        </a>
        <ul>
          <li><a href="#" class="under">首頁</a></li>
          <li><a href="#" class="under">商店</a></li>
          <li><a href="#" class="under">我們的產品</a></li>
          <li><a href="#" class="under">聯繫我們</a></li>
          <li><a href="#" class="under">關於我們</a></li>
        </ul>
      </div>
      <div class="search">
        <a href="">
          <input type="text" placeholder="搜索產品" id="input">
          <ion-icon class="s" name="search"></ion-icon>
        </a>
      </div>
      <div class="heading">
        <ul>
          <li><a href="#" class="under">首頁</a></li>
          <li><a href="#" class="under">商店</a></li>
          <li><a href="#" class="under">我們的產品</a></li>
          <li><a href="#" class="under">聯繫我們</a></li>
          <li><a href="#" class="under">關於我們</a></li>
        </ul>
      </div>
      <div class="heading1" @click="openMenu">
        <ion-icon name="menu" class="ham d-block d-lg-none"></ion-icon>
      </div>
    </header>

    <section>
      <div class="section">
        <div class="section1">
          <div class="img-slider">
            <img src="@/assets/slider1.jpg" alt="" class="img">
            <img src="@/assets/slider2.jpg" alt="" class="img">
            <img src="@/assets/slider3.jpg" alt="" class="img">
            <img src="@/assets/slider4.jpg" alt="" class="img">
            <img src="@/assets/slider5.jpg" alt="" class="img">
          </div>
        </div>

        <div class="filter-button-container">
          <router-link to="/products" class="btn btn-primary filter-button">
            篩選商品
          </router-link>
          <router-link to="/cart" class="btn btn-primary cart-button">
            查看購物車
          </router-link>
        </div>

        <div class="section2">
          <div class="container">
            <div class="items" v-for="product in products" :key="product._id">
              <router-link class="item" :to="`/product/${product._id}`">
                <div class="img img1">
                  <img 
                    :src="product.images[0]" 
                    :alt="product.name"
                    @error="handleImageError"
                  >
                </div>
                <div class="name">{{ product.name }}</div>
                <div class="price">HKD ${{ product.price.toFixed(2) }}</div>
                <div class="info">
                  {{ product.description.length > 25
                     ? product.description.substring(0, 25) + ' ...' 
                     : product.description }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer0">
        <h1>廚具商城</h1>
      </div>
      <div class="footer1">
        關注我們
        <div class="social-media">
          <a href="#">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-youtube"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </div>
      </div>
      <div class="footer2">
        <div class="product">
          <div class="heading">產品</div>
          <div class="div">銷售產品</div>
          <div class="div">廣告</div>
          <div class="div">定價</div>
          <div class="div">產品業務</div>
        </div>
        <div class="services">
          <div class="heading">服務</div>
          <div class="div">退貨</div>
          <div class="div">現金返還</div>
          <div class="div">推廣</div>
          <div class="div">其他</div>
        </div>
        <div class="Company">
          <div class="heading">公司</div>
          <div class="div">投訴</div>
          <div class="div">招聘</div>
          <div class="div">推廣</div>
          <div class="div">支持</div>
        </div>
        <div class="Get Help">
          <div class="heading">幫助</div>
          <div class="div">幫助中心</div>
          <div class="div">隱私政策</div>
          <div class="div">條款</div>
          <div class="div">登錄</div>
        </div>
      </div>
      <div class="footer3">版權所有 © <h4>廚具商城</h4> 2021-2028</div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'HomePage',
  setup() {
    const products = ref([])

    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        products.value = data.products
      } catch (error) {
        console.error('載入產品失敗:', error)
      }
    }

    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/200x200?text=無圖片'
    }

    const openMenu = () => {
      const menu = document.querySelector('.menu')
      if (menu) {
        menu.style.visibility = 'visible'
      }
    }

    const closeMenu = () => {
      const menu = document.querySelector('.menu')
      if (menu) {
        menu.style.visibility = 'hidden'
      }
    }

    onMounted(() => {
      loadProducts()
    })

    return {
      products,
      openMenu,
      closeMenu,
      handleImageError
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Microsoft JhengHei', 'Poppins', sans-serif;
}

header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  width: 100%;
  background: black;
}

.heading ul {
  display: flex;
}

.logo a {
  color: white;
  transition-duration: 1s;
  font-weight: 800;
  font-size: 35px;
  text-decoration: none;
}

.logo a:hover {
  color: rgb(240, 197, 6);
  transition-duration: 1s;
}

.heading ul li {
  list-style: none;
}

.heading ul li a {
  margin: 5px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  position: relative;
  margin: 2px 14px;
  font-size: 18px;
  transition-duration: 1s;
}

.heading ul li a:active {
  color: red;
}

.heading ul li a:hover {
  color: rgb(243, 168, 7);
  transition-duration: 1s;
}

.heading ul li a::before {
  content: "";
  height: 2px;
  width: 0px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: white;
  transition-duration: 1s;
}

.heading ul li a:hover::before {
  width: 100%;
  transition-duration: 1s;
  background-color: rgb(243, 168, 7);
}

#input {
  height: 30px;
  width: 300px;
  text-decoration: none;
  border: 0px;
  padding: 5px;
}

ion-icon {
  width: 30px;
  height: 30px;
  background-color: white;
  color: black;
}

ion-icon:hover {
  cursor: pointer;
}

.search a {
  display: flex;
  text-decoration: none;
}

header a ion-icon {
  position: relative;
  right: 3px;
}

.img-slider img {
  height: 720px;
  width: 1080px;
}

@keyframes slide {
  0% { left: 0px; }
  15% { left: 0px; }
  20% { left: -1080px; }
  32% { left: -1080px; }
  35% { left: -2160px; }
  47% { left: -2160px; }
  50% { left: -3240px; }
  63% { left: -3240px; }
  66% { left: -4320px; }
  79% { left: -4320px; }
  82% { left: -5400px; }
  100% { left: 0px; }
}

.img-slider {
  display: flex;
  float: left;
  position: relative;
  width: 1080px;
  height: 720px;
  animation-name: slide;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  transition-duration: 2s;
}

.section1 {
  width: 1080px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
}

.section2 .container {
  display: flex;
  width: 100%;
  height: max-content;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px auto;
}

.section2 .container .items {
  margin: 10px;
  width: 200px;
  height: 300px;
  background-color: white;
  border: 2.5px solid black;
  border-radius: 12px;
}

.section2 .container .items .name {
  text-align: center;
  background-color: rgb(240, 197, 6);
  height: 25px;
  padding-top: 4px;
  color: white;
  margin: 0;
}

.section2 .container .items .price {
  float: left;
  padding-left: 10px;
  display: block;
  width: 100%;
  color: rgb(255, 0, 0);
  font-weight: 650;
}

.section2 .container .items .info {
  padding-left: 10px;
  color: rgb(243, 168, 7);
  font-size: 15px; /* 調整字體大小 */
  margin: 10px 0; /* 添加 margin */
}

.section2 .container .items .img img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin: 0;
  padding: 10px;
  border-radius: 12px;
  transition-duration: 0.8s;
}

.section2 .container .items .img {
  overflow: hidden;
  margin: 0;
}

.section2 .container .items:hover .img img {
  transform: scale(1.2);
  transition-duration: 0.8s;
  border-radius: 12px;
}

footer {
  display: flex;
  flex-direction: column;
  background-color: black;
  align-items: center;
  color: white;
}

.footer1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin-top: 15px;
}

.social-media {
  display: flex;
  justify-content: center;
  color: white;
  flex-wrap: wrap;
}

.social-media a {
  color: white;
  margin: 20px;
  border-radius: 5px;
  margin-top: 10px;
  color: white;
}

.social-media a ion-icon {
  color: white;
  background-color: black;
}

.social-media a:hover ion-icon {
  color: red;
  transform: translateY(5px);
}

.footer2 {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  text-decoration: none;
  flex-wrap: wrap;
}

.footer0 {
  font-weight: 1200;
  transition-duration: 1s;
}

.footer0:hover {
  color: rgb(243, 168, 7);
}

.footer2 .heading {
  font-weight: 900;
  font-size: 18px;
}

.footer3 {
  margin-top: 60px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.footer2 .heading:hover {
  color: rgb(243, 168, 7);
}

.footer2 .div:hover {
  transform: scale(1.05);
}

.footer3 h4 {
  margin: 0 10px;
}

.footer2 div {
  margin: 10px;
}

.menu {
  visibility: hidden;
}

.heading1 .ham:active {
  color: red;
}

.items {
  overflow: hidden;
}

.ham, .close {
  cursor: pointer;
}

@media screen and (max-width: 1250px) {
  .heading ul li {
    display: none;
  }

  .items {
    transform: scale(0.9);
  }

  .img-slider img {
    height: 60vw;
    width: 80vw;
  }

  .ham:active {
    color: red;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu a ion-icon {
    position: absolute;
  }

  @keyframes slide1 {
    0% { left: 0vw; }
    15% { left: 0vw; }
    20% { left: -80vw; }
    32% { left: -80vw; }
    35% { left: -160vw; }
    47% { left: -160vw; }
    50% { left: -240vw; }
    63% { left: -240vw; }
    66% { left: -320vw; }
    79% { left: -320vw; }
    82% { left: -400vw; }
    100% { left: 0vw; }
  }

  .menu ul {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: black;
    left: 0;
    top: 0;
    z-index: 11;
    align-items: center;
    justify-content: center;
    opacity: 1;
  }

  .close {
    z-index: 34;
    color: white;
    background-color: black;
  }

  .close:active {
    color: red;
  }

  .menu ul li {
    list-style: none;
    margin: 20px;
    border-top: 3px solid white;
    width: 80%;
    text-align: center;
    padding-top: 10px;
  }

  .menu ul li a {
    text-decoration: none;
    padding-top: 10px;
    color: white;
    font-weight: 900;
  }

  .menu ul li a:hover {
    color: rgb(240, 197, 6);
  }

  .img-slider {
    display: flex;
    float: left;
    position: relative;
    width: 80%;
    height: 60%;
    animation-name: slide1;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    transition-duration: 2s;
  }

  .section1 {
    width: 80%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
  }

  .heading1 {
    opacity: 1;
    position: relative;
    bottom: 8px;
  }

  .search a {
    display: flex;
    flex-wrap: nowrap;
  }

  .heading1 .ham {
    background-color: black;
    color: white;
  }

  #input {
    width: 200px;
    flex-shrink: 2;
  }

  header {
    height: 150px;
  }
}

@media screen and (max-width: 550px) {
  .heading ul li {
    display: none;
  }

  .heading1 {
    opacity: 1;
    bottom: 8px;
  }

  header {
    height: 250px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
  }

  #input {
    width: 150px;
  }

  .close {
    z-index: 34;
  }

  .search a {
    display: flex;
    flex-wrap: nowrap;
  }
}

/* 修改產品鏈接樣式 */
.section2 .container .items .item {
  text-decoration: none;  /* 去掉下劃線 */
  display: block;        /* 確保鏈接佔滿整個容器 */
  color: inherit;        /* 使用繼承的顏色 */
}

/* 確保子元素也不會有下劃線 */
.section2 .container .items .item .name,
.section2 .container .items .item .price,
.section2 .container .items .item .info {
  text-decoration: none;
}

/* 添加篩選按鈕樣式 */
.filter-button-container {
  display: flex;
  justify-content: center;
  gap: 20px;  /* 按鈕之間的間距 */
  margin: 20px 0;
}

.filter-button,
.cart-button {
  background-color: black;
  border: none;
  padding: 10px 30px;
  font-size: 18px;
  transition: all 0.3s ease;
}

.filter-button:hover,
.cart-button:hover {
  background-color: #333;
  transform: translateY(-2px);
}

/* 在大屏幕上隱藏漢堡菜單圖標 */
@media screen and (min-width: 1250px) {
  .heading1 {
    display: none;
  }
}
</style>