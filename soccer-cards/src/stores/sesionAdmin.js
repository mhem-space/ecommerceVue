
import { defineStore } from 'pinia'

export const useSesionStore = defineStore('sesionAdmin', {
  state: () => ({
    adminSession: false
  }),
  actions: {
    checkSession() {
      this.adminSession = localStorage.getItem('adminSession') === 'active';
    },
    login() {
      localStorage.setItem('adminSession', 'active');
      this.adminSession = true;
    },
    logout() {
      localStorage.removeItem('adminSession');
      this.adminSession = false;
      alert('Sesión cerrada correctamente.');
    }
  },
  getters: {
    isAdmin: (state) => state.adminSession
  },
  setters: {
    setAdmin: (state, value) => state.adminSession = value
  }
})
