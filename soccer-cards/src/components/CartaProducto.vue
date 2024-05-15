<template>
  <div id="producto" class="d-flex">
    <div class="col card">
      <div class="row g-0" style="height: 100%">
        <div class="col-4 imagenCarta p-1">
          <img
            :class="['img-fluid rounded-start', { imagenProductoAgotado: producto.stock === 0 }]"
            :src="producto.imagen"
            :id="`imagen-${producto.codigo}`"
            :alt="producto.nombre"
          />
        </div>
        <div class="col-8 d-flex">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="card-title">{{ producto.nombre }}</h5>
              <small class="text-body-secondary">Item: {{ producto.codigo }}</small>
            </div>
            <p class="card-text">{{ producto.descripcion }}</p>
            <p class="card-text"><strong>Precio: </strong>{{ producto.precio }}€</p>
            <div class="d-flex align-items-center justify-content-between">
              <p class="card-text mb-0">
                <small class="text-body-secondary">
                  <strong>Stock: </strong>{{ producto.stock }}
                </small>
              </p>
              <button
                type="button"
                class="btn btn-outline-success btn-sm p-1"
                :id="`agregar-${producto.codigo}`"
                @click="añadirAlCarrito(producto)"
                :disabled="producto.stock === 0"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {useEstadoCarritoStore} from '../stores/cestaCompra.js'
    import {useListaProductosStore} from '../stores/listaProductos.js'

    const storeCarrito = useEstadoCarritoStore();
    const storeProductos = useListaProductosStore();

    const props = defineProps({
    producto: {
        type: Object,
        required: true
    }
    })
    function añadirAlCarrito(producto) {
      storeCarrito.añadirAlCarrrito(producto)
      storeProductos.decrementarStock(producto)
    }
</script>

<style lang="scss" scoped></style>
