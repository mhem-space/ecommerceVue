<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        :class="['accordion-button', collapsed]"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#${categoriaId}`"
        :aria-controls="categoriaId"
      >
        <strong>{{ formattedNombreCategoria }}</strong>
      </button>
    </h2>
    <div :id="categoriaId" :class="['accordion-collapse collapse', show]">
      <div class="row row-cols-md-2 row-cols-sm-1 justify-content-around accordion-body">
        <CartaProducto
          v-for="(producto, index) in productos"
          :key="index"
          :producto="producto"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import CartaProducto from './CartaProducto.vue'

  const props = defineProps({
    nombreCategoria: String,
    productos: Array,
    isExpanded: Boolean
  })

  const formattedNombreCategoria = computed(() => {
    return (
      props.nombreCategoria.charAt(0).toUpperCase() + props.nombreCategoria.slice(1).toLowerCase()
    )
  })

  const categoriaId = computed(() => {
    return "categoria"+props.nombreCategoria
  })

  const collapsed = computed(() => (props.isExpanded ? '' : 'collapsed'))
  const show = computed(() => (props.isExpanded ? 'show' : ''))
</script>

<style lang="scss" scoped></style>
