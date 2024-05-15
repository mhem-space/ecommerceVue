<template>
  <div class="container my-5 principal" style="max-width: 90%">
    <!-- Modal para añadir categoría -->
    <div
      class="modal fade"
      id="modalAñadirCategoria"
      tabindex="-1"
      aria-labelledby="modalAñadirCategoriaLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header justify-content-between">
            <h5 class="modal-title" id="modalAñadirCategoriaLabel">Añadir nueva categoría</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              id="nombreNuevaCategoria"
              class="form-control"
              placeholder="Nombre de la categoría"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              id="guardarCategoria"
              @click="addCategoria"
            >
              Guardar categoría
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para añadir producto -->
    <div
      class="modal fade"
      id="modalAñadirProducto"
      tabindex="-1"
      aria-labelledby="modalAñadirProductoLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAñadirProductoLabel">Añadir Nuevo Producto</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <form id="formAñadirProducto">
              <div class="mb-3">
                <label for="nombreProducto" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombreProducto" required />
              </div>
              <div class="mb-3">
                <label for="descripcionProducto" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="descripcionProducto" required />
              </div>
              <div class="mb-3">
                <label for="categoriaProducto" class="form-label">Categoría</label>
                <select class="form-select" id="categoriaProducto" required>
                  <option
                    v-for="(categoria, index) in storeProductos.listaDeProductos"
                    :key="index"
                    :value="categoria.nombre"
                  >
                    {{ categoria.nombre }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="precioProducto" class="form-label">Precio</label>
                <input type="number" class="form-control" id="precioProducto" required />
              </div>
              <div class="mb-3">
                <label for="stockProducto" class="form-label">Stock</label>
                <input type="number" class="form-control" id="stockProducto" required />
              </div>
              <div class="mb-3">
                <label for="imagenProducto" class="form-label">Imagen</label>
                <input
                  type="file"
                  class="form-control"
                  id="imagenProducto"
                  accept="image/*"
                  required
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              id="guardarProducto"
              @click="agregarProducto"
            >
              Guardar Producto
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla para Categorías -->
    <div className="p-2 mb-5">
      <h2>Categorías</h2>
      <table className="table border border-2 border-black">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de la Categoría</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaCategorias">
          <tr v-for="(categoria, index) in storeProductos.listaDeProductos" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ categoria.nombre }}</td>
            <td>
              <button class="btn btn-danger eliminarCategoria" :data-categoria="categoria.nombre" @click="storeProductos.eliminarCategoria(categoria.nombre)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" id="añadirCategoria" @click="openAddCategoryModal">
        Añadir Categoría
      </button>
    </div>

    <!-- Tabla para Productos -->
    <div className="p-2">
      <h2>Productos</h2>
      <table className="table border border-2 border-black">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre del Producto</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaProductos">
          <template v-for="(categoria, index) in storeProductos.listaDeProductos" :key="index">
            <template v-for="(producto, indice) in categoria.productos" :key="indice">
              <tr>
                <th scope="row">{{ producto.codigo }}</th>
                <td>{{ producto.nombre }}</td>
                <td>{{ categoria.nombre }}</td>
                <td>{{ producto.precio }}€</td>
                <td>{{ producto.stock }}</td>
                <td>
                  <button class="btn btn-danger" @click="storeProductos.eliminarProducto(categoria.nombre,producto.codigo)">Eliminar</button>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
      <button className="btn btn-primary" id="añadirProducto" @click="openAddProductModal">
        Añadir Producto
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useListaProductosStore } from '../stores/listaProductos'
import { useEstadoCarritoStore } from '../stores/cestaCompra'

const storeProductos = useListaProductosStore()
const storeCarrito = useEstadoCarritoStore()

const modalAñadirCategoria = ref(null)
const modalAñadirProducto = ref(null)

onMounted(() => {
  storeProductos.cargarProductos()
  storeCarrito.cargarCarrito()
  
  modalAñadirCategoria.value = new bootstrap.Modal(
    document.getElementById('modalAñadirCategoria'),
    {
      keyboard: true,
      focus: true
    }
  )
  modalAñadirProducto.value = new bootstrap.Modal(document.getElementById('modalAñadirProducto'), {
    keyboard: true,
    focus: true
  })
})

function openAddCategoryModal() {
  modalAñadirCategoria.value.show() // Utiliza la API de Bootstrap para mostrar el modal
}
function openAddProductModal() {
  modalAñadirProducto.value.show() // Utiliza la API de Bootstrap para mostrar el modal
}

// Función para añadir una nueva categoría
function addCategoria() {
  const nombreNuevaCategoria = document.getElementById('nombreNuevaCategoria').value
  storeProductos.añadirCategoria(nombreNuevaCategoria)
  modalAñadirCategoria.value.hide()
}
// Función para añadir un nuevo producto
function agregarProducto() {
  let nombre = document.getElementById('nombreProducto').value
  let descripcion = document.getElementById('descripcionProducto').value
  let categoria = document.getElementById('categoriaProducto').value
  let precio = document.getElementById('precioProducto').value
  let stock = document.getElementById('stockProducto').value
  let imagenInput = document.getElementById('imagenProducto')

  // Lee la imagen como Data URL
  if (imagenInput.files[0]) {
    let reader = new FileReader()
    reader.onload = function (e) {
      let imagen = e.target.result 
      
      let codigo =
        categoria.substring(0, 3).toLowerCase() +
        (storeProductos.listaDeProductos.find((cat) => cat.nombre === categoria).productos.length +
          1)
      let nuevoProducto = {
        codigo: codigo.charAt(0).toUpperCase() + codigo.slice(1),
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen: imagen
      }
      storeProductos.añadirProducto(categoria, nuevoProducto)
    }
    reader.readAsDataURL(imagenInput.files[0])
  }

  modalAñadirProducto.value.hide()
}
</script>

<style lang="scss" scoped></style>
