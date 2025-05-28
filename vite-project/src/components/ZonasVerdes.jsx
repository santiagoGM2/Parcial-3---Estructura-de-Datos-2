import { useState, useContext } from "react"
import { NetworkContext } from "../context/NetworkContext"
import ArbolZonasVerdes from "./ArbolZonasVerdes"

function ZonasVerdes({ ciudadSeleccionada }) {
  const { agregarZonaVerde, editarZonaVerde, obtenerZonasVerdes } = useContext(NetworkContext)
  const [nombreZona, setNombreZona] = useState("")
  const [zonaSeleccionada, setZonaSeleccionada] = useState("")
  const [nuevoNombre, setNuevoNombre] = useState("")

  const zonasVerdes = obtenerZonasVerdes(ciudadSeleccionada)
  const zonasPlanas = aplanarZonas(zonasVerdes)

  function aplanarZonas(zonas, prefijo = "", resultado = []) {
    if (!zonas) return resultado

    Object.keys(zonas).forEach((zona) => {
      const rutaCompleta = prefijo ? `${prefijo}/${zona}` : zona
      resultado.push(rutaCompleta)
      if (zonas[zona] && Object.keys(zonas[zona]).length > 0) {
        aplanarZonas(zonas[zona], rutaCompleta, resultado)
      }
    })

    return resultado
  }

  const handleAgregarZona = (e) => {
    e.preventDefault()
    if (nombreZona.trim()) {
      agregarZonaVerde(ciudadSeleccionada, zonaSeleccionada, nombreZona)
      setNombreZona("")
      setZonaSeleccionada("")
    }
  }

  const handleEditarZona = (e) => {
    e.preventDefault()
    if (zonaSeleccionada && nuevoNombre.trim()) {
      editarZonaVerde(ciudadSeleccionada, zonaSeleccionada, nuevoNombre)
      setZonaSeleccionada("")
      setNuevoNombre("")
    }
  }

  return (
    <div className="zonas-verdes">
      <div className="formularios">
        <form onSubmit={handleAgregarZona} className="formulario">
          <h3>Agregar Zona Verde</h3>
          <input
            type="text"
            value={nombreZona}
            onChange={(e) => setNombreZona(e.target.value)}
            placeholder="Nombre de la zona"
          />
          <select value={zonaSeleccionada} onChange={(e) => setZonaSeleccionada(e.target.value)}>
            <option value="">Zona principal</option>
            {zonasPlanas.map((zona) => (
              <option key={zona} value={zona}>
                {zona}
              </option>
            ))}
          </select>
          <button type="submit">Agregar</button>
        </form>

        <form onSubmit={handleEditarZona} className="formulario">
          <h3>Editar Zona Verde</h3>
          <select value={zonaSeleccionada} onChange={(e) => setZonaSeleccionada(e.target.value)}>
            <option value="">Selecciona zona</option>
            {zonasPlanas.map((zona) => (
              <option key={zona} value={zona}>
                {zona}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Nuevo nombre"
          />
          <button type="submit">Editar</button>
        </form>
      </div>

      <div className="visualizacion-arbol">
        <h3>Jerarquía de Zonas Verdes</h3>
        <ArbolZonasVerdes zonas={zonasVerdes} />
      </div>
    </div>
  )
}

export default ZonasVerdes
