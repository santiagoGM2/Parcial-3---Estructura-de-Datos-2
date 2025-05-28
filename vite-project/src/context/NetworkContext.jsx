"use client"

import { createContext, useState } from "react"

export const NetworkContext = createContext()

export const NetworkProvider = ({ children }) => {
  const [ciudades, setCiudades] = useState([])
  const [conexiones, setConexiones] = useState([])
  const [zonasVerdes, setZonasVerdes] = useState({})

  // Funciones para manejar ciudades
  const agregarCiudad = (nombre) => {
    if (!ciudades.includes(nombre)) {
      setCiudades([...ciudades, nombre])
      setZonasVerdes({
        ...zonasVerdes,
        [nombre]: {},
      })
    }
  }

  const eliminarCiudad = (nombre) => {
    setCiudades(ciudades.filter((ciudad) => ciudad !== nombre))
    setConexiones(conexiones.filter((conexion) => conexion.origen !== nombre && conexion.destino !== nombre))

    const nuevasZonasVerdes = { ...zonasVerdes }
    delete nuevasZonasVerdes[nombre]
    setZonasVerdes(nuevasZonasVerdes)
  }

  const conectarCiudades = (origen, destino) => {
    // Verificar si la conexión ya existe
    const conexionExiste = conexiones.some(
      (conexion) =>
        (conexion.origen === origen && conexion.destino === destino) ||
        (conexion.origen === destino && conexion.destino === origen),
    )

    if (!conexionExiste) {
      setConexiones([...conexiones, { origen, destino }])
    }
  }

  // Funciones para manejar zonas verdes
  const agregarZonaVerde = (ciudad, rutaPadre, nombreZona) => {
    const nuevasZonasVerdes = { ...zonasVerdes }

    if (!rutaPadre) {
      // Agregar como zona principal
      nuevasZonasVerdes[ciudad][nombreZona] = {}
    } else {
      // Agregar como subzona
      const partes = rutaPadre.split("/")
      let actual = nuevasZonasVerdes[ciudad]

      for (const parte of partes) {
        if (!actual[parte]) {
          actual[parte] = {}
        }
        actual = actual[parte]
      }

      actual[nombreZona] = {}
    }

    setZonasVerdes(nuevasZonasVerdes)
  }

  const editarZonaVerde = (ciudad, rutaZona, nuevoNombre) => {
    const nuevasZonasVerdes = { ...zonasVerdes }
    const partes = rutaZona.split("/")
    const nombreActual = partes.pop()

    let padre = nuevasZonasVerdes[ciudad]
    const ruta = []

    // Navegar hasta el padre de la zona a editar
    for (const parte of partes) {
      ruta.push(parte)
      if (!padre[parte]) return // La ruta no existe
      padre = padre[parte]
    }

    // Verificar que la zona existe
    if (!padre[nombreActual]) return

    // Guardar los hijos
    const hijos = padre[nombreActual]

    // Eliminar la zona con el nombre antiguo
    delete padre[nombreActual]

    // Crear la zona con el nuevo nombre y los mismos hijos
    padre[nuevoNombre] = hijos

    setZonasVerdes(nuevasZonasVerdes)
  }

  const obtenerZonasVerdes = (ciudad) => {
    return zonasVerdes[ciudad] || {}
  }

  // Función para calcular estadísticas
  const calcularEstadisticas = (ciudad) => {
    const zonas = zonasVerdes[ciudad] || {}

    // Calcular altura máxima
    const calcularAltura = (nodo, nivelActual = 0) => {
      if (!nodo || Object.keys(nodo).length === 0) {
        return nivelActual
      }

      let maxAltura = nivelActual
      Object.values(nodo).forEach((hijo) => {
        const alturaHijo = calcularAltura(hijo, nivelActual + 1)
        maxAltura = Math.max(maxAltura, alturaHijo)
      })

      return maxAltura
    }

    // Calcular número total de zonas
    const contarZonas = (nodo) => {
      if (!nodo || Object.keys(nodo).length === 0) {
        return 0
      }

      let contador = Object.keys(nodo).length
      Object.values(nodo).forEach((hijo) => {
        contador += contarZonas(hijo)
      })

      return contador
    }

    const altura = calcularAltura(zonas)
    const totalZonas = contarZonas(zonas)

    return { altura, totalZonas }
  }

  return (
    <NetworkContext.Provider
      value={{
        ciudades,
        conexiones,
        agregarCiudad,
        eliminarCiudad,
        conectarCiudades,
        agregarZonaVerde,
        editarZonaVerde,
        obtenerZonasVerdes,
        calcularEstadisticas,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}
