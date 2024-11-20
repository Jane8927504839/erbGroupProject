// export default {
//   namespaced: true,
//   state: {
//     token: null,
//     user: null
//   },
//   mutations: {
//     SET_TOKEN(state, token) {
//       state.token = token
//     },
//     SET_USER(state, user) {
//       state.user = user
//     }
//   },
//   actions: {
//     async login({ commit }, credentials) {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message)
//       }

//       const data = await response.json()
//       commit('SET_TOKEN', data.token)
//       commit('SET_USER', data.user)
//       return data
//     },

//     async register({ commit }, userData) {
//       const response = await fetch('/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message)
//       }

//       const data = await response.json()
//       return data
//     }
//   }
// } 