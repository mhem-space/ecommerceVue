import { defineStore } from 'pinia'
import { listaBaseDeProductos } from '../components/constantes.js'

export const useListaProductosStore = defineStore('listaProductos', {
  state: () => ({
    listaDeProductos: listaBaseDeProductos
  }),
  actions: {
    cargarProductos() {
      const listaDeProductos = localStorage.getItem("listaDeProductos")
      if (listaDeProductos) {
        this.listaDeProductos = JSON.parse(listaDeProductos)
      }
      else {
        this.listaDeProductos = listaBaseDeProductos
        localStorage.setItem("listaDeProductos", JSON.stringify(this.listaDeProductos))
      }
    },
    añadirProducto(categoriaNombre, nuevoProducto) {
      const categoria = this.listaDeProductos.find((cat) => cat.nombre === categoriaNombre)
      if (categoria) {
        categoria.productos.push(nuevoProducto)
        localStorage.setItem("listaDeProductos", JSON.stringify(this.listaDeProductos))
      }
    },
    eliminarProducto(categoriaNombre, productoId) {
      const categoria = this.listaDeProductos.find((cat) => cat.nombre === categoriaNombre)
      if (categoria) {
        categoria.productos = categoria.productos.filter((prod) => prod.codigo !== productoId)
        localStorage.setItem("listaDeProductos", JSON.stringify(this.listaDeProductos))
      }
    },
    añadirCategoria(nombreCategoria) {
      const categoriaExistente = this.listaDeProductos.some((cat) => cat.nombre === nombreCategoria)
      if (categoriaExistente) {
        alert('La categoría ya existe.')
        return;
      }
      this.listaDeProductos.push({ nombre: nombreCategoria, productos: [] })
      localStorage.setItem("listaDeProductos", JSON.stringify(this.listaDeProductos));
    },
    eliminarCategoria(categoriaNombre) {
      this.listaDeProductos = this.listaDeProductos.filter((cat) => cat.nombre !== categoriaNombre)
      localStorage.setItem("listaDeProductos", JSON.stringify(this.listaDeProductos));
      alert(`La categoría ${categoriaNombre} se ha eliminado correctamente.`);
    },
    incrementarStock(producto) {
      const categoria = this.listaDeProductos.find((cat) => cat.productos.some((prod) => prod.codigo === producto.codigo))
      if (categoria) {
        const productoEnCategoria = categoria.productos.find((prod) => prod.codigo === producto.codigo)
        productoEnCategoria.stock++
        localStorage.setItem("listaDeProductos", JSON.stringify(this.listaDeProductos))
      }
    },
    decrementarStock(producto) {
      const categoria = this.listaDeProductos.find((cat) => cat.productos.some((prod) => prod.codigo === producto.codigo))
      if (categoria) {
        const productoEnCategoria = categoria.productos.find((prod) => prod.codigo === producto.codigo)
        productoEnCategoria.stock--
        localStorage.setItem("listaDeProductos", JSON.stringify(this.listaDeProductos))
      }
    }
  },
  getters: {
    getProductosPorCategoria: (state) => (categoriaNombre) => {
      const categoria = state.listaDeProductos.find((cat) => cat.nombre === categoriaNombre)
      return categoria ? categoria.productos : []
    }
  },
  setters: {}
})
