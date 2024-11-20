import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    cart: {
      items: []
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    addToCart(state, item) {
      const existingItem = state.cart.items.find(i => i._id === item._id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.items.push({ ...item, quantity: 1 })
      }
    },
    removeFromCart(state, itemId) {
      state.cart.items = state.cart.items.filter(item => item._id !== itemId)
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post('/api/users/login', credentials)
        commit('setUser', data.user)
        localStorage.setItem('token', data.token)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async register({ commit }, userData) {
      try {
        const { data } = await axios.post('/api/users/register', userData)
        commit('setUser', data.user)
        localStorage.setItem('token', data.token)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    logout({ commit }) {
      commit('setUser', null)
      localStorage.removeItem('token')
    }
  }
}) 