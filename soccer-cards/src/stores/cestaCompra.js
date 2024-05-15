import { defineStore } from 'pinia'
import { carritoBase } from '../components/constantes.js'

export const useEstadoCarritoStore = defineStore('cestaCompra', {
  state: () => ({
    estadoCarrito: {
      items: [],
      total: 0,
      cantidad: 0
    }
  }),
  actions: {
    cargarCarrito() {
        const estadoCesta = localStorage.getItem("estadoCarrito")
        if (estadoCesta) {
          this.estadoCarrito = JSON.parse(estadoCesta)
        }
        else {
          this.estadoCarrito = carritoBase
          localStorage.setItem("estadoCarrito", JSON.stringify(this.estadoCarrito))
        }
      },
    añadirAlCarrrito(producto) {
      const productoEnCarrito = this.estadoCarrito.items.find((prod) => prod.codigo === producto.codigo)
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++
      } else {
        this.estadoCarrito.items.push({ ...producto, cantidad: 1 })
      }
      this.estadoCarrito.cantidad++
      this.estadoCarrito.total += producto.precio
      localStorage.setItem("estadoCarrito", JSON.stringify(this.estadoCarrito))
    },
    eliminarDelCarrito(producto) {
      const productoEnCarrito = this.estadoCarrito.items.find((prod) => prod.codigo === producto.codigo)
      if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
          productoEnCarrito.cantidad--
        } else {
          this.estadoCarrito.items = this.estadoCarrito.items.filter((prod) => prod.codigo !== producto.codigo)
        }
        this.estadoCarrito.cantidad--
        this.estadoCarrito.total -= producto.precio
        localStorage.setItem("estadoCarrito", JSON.stringify(this.estadoCarrito))
      }
    },
    vaciarCarrito() {
      this.estadoCarrito = carritoBase
      localStorage.setItem("estadoCarrito", JSON.stringify(this.estadoCarrito))
    }
  },
  getters: {
    cantidadCarrito() {
      return this.estadoCarrito.cantidad
    },
    totalCarrito() {
      return this.estadoCarrito.total
    },
    itemsCarrito() {
      return this.estadoCarrito.items
    }
  },
  setters: {}
})
