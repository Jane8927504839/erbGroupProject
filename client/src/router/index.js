import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import CartPage from '../views/CartPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局路由守衛
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
  
  // 登錄和註冊頁面不需要驗證
  // if (to.path === '/login' || to.path === '/register') {
  //   if (token) {
  //     // 已登錄用戶訪問登錄/註冊頁面，重定向到首頁
  //     next('/');
  //   } else {
  //     next();
  //   }
  // } else {
  //   // 其他頁面需要驗證
  //   if (!token) {
  //     next('/login');
  //   } else {
  //     next();
  //   }
  // }
// })

export default router