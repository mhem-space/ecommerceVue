<template>
  <div class="container mt-5 principal p-5" style="max-width: 30%">
    <h2 class="mt-5">Inicio de Sesión</h2>
    <form id="loginForm" @submit="handleSubmit">
      <div class="mb-3">
        <label for="username" class="form-label">Usuario</label>
        <input type="text" class="form-control" id="username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script setup>
import { useSesionStore } from '../stores/sesionAdmin.js'
import { useRouter } from 'vue-router';

const { login } = useSesionStore();
const router = useRouter();

const handleSubmit = (e) => {
  e.preventDefault()

  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  if (username === 'admin' && password === 'admin') {
    login();
    router.push('/admin');
    alert('Inicio de sesión correcto.')
  } else {
    alert('Usuario o contraseña incorrectos.')
  }
}
</script>

<style lang="scss" scoped></style>
