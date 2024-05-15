<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container">
            <RouterLink class="navbar-brand" to="/">
              <b>SoccerCards</b>
            </RouterLink>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/">
                    Home
                  </RouterLink>
                </li>
              </ul>
              <ul class="navbar-nav ms-auto">
                <li class="nav-item" @click.prevent="comprobarPermisos">
                    <RouterLink class="nav-link" id="adminPageLink" to="/admin" v-if="store.isAdmin">
                      Admin
                    </RouterLink>
                    <RouterLink class="nav-link" id="adminPageLink" to="" v-else>
                      Admin
                    </RouterLink>
                </li>
                <li class="nav-item" v-if="store.isAdmin">
                    <button class="nav-link btn btn-link" @click="store.logout">
                      Logout
                    </button>
                </li>
                <li class="nav-item" v-else>
                    <RouterLink class="nav-link" to="/login">
                        Login
                    </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
</template>

<script setup>
    import {useSesionStore} from '../stores/sesionAdmin.js'
    import { RouterLink } from 'vue-router'
    import {onMounted} from 'vue'

    const store = useSesionStore();

    onMounted(() => {
        store.checkSession();
    });

    function comprobarPermisos() {
        if (!store.isAdmin) {
            alert("No tienes permisos para acceder a esta página. Inicia sesión como administrador.");
        }
    }
</script>

<style lang="scss" scoped>

</style>