// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

// export function useAuth() {
//   const store = useStore()
//   const router = useRouter()

//   const requireAuth = async (to, from, next) => {
//     const token = localStorage.getItem('token')
//     if (!token && to.path !== '/login' && to.path !== '/register') {
//       next('/login')
//       return
//     }
//     next()
//   }

//   return { requireAuth }
// } 