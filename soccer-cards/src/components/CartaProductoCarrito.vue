<template>
    <div id="productoCarrito" class="d-flex">
      <div class="col card">
        <div class="row g-0" style="height: 100%">
          <div class="col-4 imagenCarta p-1">
            <img
              class="img-fluid rounded-start"
              :src="producto.imagen"
              :id="`imagen-${producto.codigo}`"
              :alt="producto.nombre"
              :style="{ height: imagenAltura + 'px', width: 'auto' }"
              @load="ajustarTamaño"
            />
          </div>
          <div class="col-8 d-flex">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="card-title">{{ producto.nombre }}</h5>
                <small class="text-body-secondary">Item: {{ producto.codigo }}</small>
              </div>
              <p class="card-text">{{ producto.descripcion }}</p>
              <p class="card-text"><strong>Precio total: </strong>{{ producto.cantidad*producto.precio }}€</p>
              <div class="d-flex align-items-center justify-content-between">
                <p class="card-text mb-0">
                  <small class="text-body-secondary">
                    <strong>Unidades: </strong>{{ producto.cantidad }} <strong>Precio/ud: </strong>{{ producto.precio }}€
                  </small>
                </p>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="eliminarDelCarrito(producto)"
                > 
                Eliminar
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
      import { ref } from 'vue'
  
      const storeCarrito = useEstadoCarritoStore();
      const storeProductos = useListaProductosStore();
  
      const props = defineProps({
      producto: {
          type: Object,
          required: true
      }
      })
      let imagenAltura = ref('100%');

      function ajustarTamaño(event) {
        const imgElement = event.target;
        imagenAltura.value = imgElement.offsetHeight*0.8;
      }
      function eliminarDelCarrito(producto) {
        storeCarrito.eliminarDelCarrito(producto)
        storeProductos.incrementarStock(producto)
      }
  </script>
  
  <style lang="scss" scoped></style>
  