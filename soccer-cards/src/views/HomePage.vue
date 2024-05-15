<template>
    <div class="container mt-5 principal" style="max-width:90%">
      <div class="row justify-content-between p-2">
        <div class="col-xxl-7 col-xl-8 col-auto mt-1">
          <h2>Productos</h2>
          <div class="accordion" id="productos">
            <CategoriaComp
              v-for="(categoria, index) in storeProductos.listaDeProductos"
              :key="index"
              :nombreCategoria="categoria.nombre"
              :productos="categoria.productos"
              :isExpanded="index === 0"
            />
          </div>
        </div>
        <div class="col-xl-4 col-12 mt-1">
          <h2>
            <div class="d-flex gap-3 justify-content-center">
              <span>Cesta</span>
              <i class="fas fa-shopping-cart fa-xs"></i>
            </div>
          </h2>
          <div class="row justify-content-between w-100 mb-3">
            <span class="badge text-bg-info col-5" id="contadorItems">
              Items: {{ storeCarrito.cantidadCarrito }}
            </span>
            <span class="badge text-bg-success col-5" id="contadorPrecio">
              Total de la cesta: {{ storeCarrito.totalCarrito }}€
            </span>
          </div>
          <div
            class="row row-cols-xl-1 row-cols-md-2 row-cols-sm-1 justify-content-around"
            id="carrito"
          >
          <CartaProductoCarrito
              v-for="(producto, index) in storeCarrito.itemsCarrito"
              :key="index"
              :producto="producto"
            />
            <button
                v-if="storeCarrito.cantidadCarrito > 0"
                type="button"
                className="btn btn-danger mt-2 w-100"
                id="comprarProductos"
                @click="comprarProductos"
              > 
                Comprar
              </button>
          </div>
          <div
            aria-live="polite"
            aria-atomic="true"
            class="position-relative"
          >
            <div
              id="toastContainer"
              class="toast-container position-absolute end-0 p-3"
            >
              <div
                :class="['toast align-items-center text-white bg-success border-0', { show: showToast }]"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div class="d-flex">
                  <div class="toast-body">¡Gracias por tu compra!</div>
                  <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { onMounted,ref } from 'vue'
    import {useListaProductosStore} from '../stores/listaProductos.js'
    import {useEstadoCarritoStore} from '../stores/cestaCompra.js'
    import CategoriaComp from '@/components/CategoriaComp.vue';
    import CartaProductoCarrito from '@/components/CartaProductoCarrito.vue';

    const storeProductos = useListaProductosStore();
    const storeCarrito = useEstadoCarritoStore();
    const showToast = ref(false)

    onMounted(() => {
        storeProductos.cargarProductos();
        storeCarrito.cargarCarrito();
    });
    function comprarProductos() {
        storeCarrito.vaciarCarrito();
        showToast.value = true;
        setTimeout(() => {
            showToast.value = false;
        }, 3000);
    }

</script>

<style lang="scss" scoped>

</style>