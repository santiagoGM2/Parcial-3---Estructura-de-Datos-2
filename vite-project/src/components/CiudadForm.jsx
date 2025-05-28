import { useState, useContext } from "react"
import { NetworkContext } from "../context/NetworkContext"

function CiudadForm() {
  const { agregarCiudad, conectarCiudades, eliminarCiudad, ciudades } = useContext(NetworkContext)
  const [nuevaCiudad, setNuevaCiudad] = useState("")
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")
  const [ciudadEliminar, setCiudadEliminar] = useState("")

  const handleAgregarCiudad = (e) => {
    e.preventDefault()
    if (nuevaCiudad.trim()) {
      agregarCiudad(nuevaCiudad)
      setNuevaCiudad("")
    }
  }

  const handleConectarCiudades = (e) => {
    e.preventDefault()
    if (origen && destino && origen !== destino) {
      conectarCiudades(origen, destino)
      setOrigen("")
      setDestino("")
    }
  }

  const handleEliminarCiudad = (e) => {
    e.preventDefault()
    if (ciudadEliminar) {
      eliminarCiudad(ciudadEliminar)
      setCiudadEliminar("")
    }
  }

  return (
    <div className="formularios">
      <form onSubmit={handleAgregarCiudad} className="formulario">
        <h3>Agregar Ciudad</h3>
        <input
          type="text"
          value={nuevaCiudad}
          onChange={(e) => setNuevaCiudad(e.target.value)}
          placeholder="Nombre de la ciudad"
        />
        <button type="submit">Agregar</button>
      </form>

      <form onSubmit={handleConectarCiudades} className="formulario">
        <h3>Conectar Ciudades</h3>
        <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
          <option value="">Selecciona origen</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>
        <select value={destino} onChange={(e) => setDestino(e.target.value)}>
          <option value="">Selecciona destino</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>
        <button type="submit">Conectar</button>
      </form>

      <form onSubmit={handleEliminarCiudad} className="formulario">
        <h3>Eliminar Ciudad</h3>
        <select value={ciudadEliminar} onChange={(e) => setCiudadEliminar(e.target.value)}>
          <option value="">Selecciona ciudad</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>
        <button type="submit">Eliminar</button>
      </form>
    </div>
  )
}

export default CiudadForm
