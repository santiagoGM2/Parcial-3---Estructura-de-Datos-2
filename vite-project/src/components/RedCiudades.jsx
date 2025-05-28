import { useContext } from "react"
import { NetworkContext } from "../context/NetworkContext"

function RedCiudades({ onSeleccionarCiudad }) {
  const { ciudades, conexiones } = useContext(NetworkContext)

  const obtenerPosicionCiudad = (ciudad, indice) => {
    const angulo = (indice * 2 * Math.PI) / ciudades.length
    const radio = 120
    const centroX = 200
    const centroY = 150

    return {
      x: centroX + radio * Math.cos(angulo),
      y: centroY + radio * Math.sin(angulo),
    }
  }

  const renderizarLineas = () => {
    return conexiones.map((conexion, indice) => {
      const indiceOrigen = ciudades.indexOf(conexion.origen)
      const indiceDestino = ciudades.indexOf(conexion.destino)

      if (indiceOrigen === -1 || indiceDestino === -1) return null

      const posOrigen = obtenerPosicionCiudad(conexion.origen, indiceOrigen)
      const posDestino = obtenerPosicionCiudad(conexion.destino, indiceDestino)

      return (
        <line
          key={indice}
          x1={posOrigen.x}
          y1={posOrigen.y}
          x2={posDestino.x}
          y2={posDestino.y}
          stroke="#999"
          strokeWidth="2"
        />
      )
    })
  }

  const renderizarCiudades = () => {
    return ciudades.map((ciudad, indice) => {
      const posicion = obtenerPosicionCiudad(ciudad, indice)

      return (
        <g key={ciudad}>
          <circle
            cx={posicion.x}
            cy={posicion.y}
            r="25"
            fill="#69b3a2"
            stroke="#333"
            strokeWidth="2"
            style={{ cursor: "pointer" }}
            onClick={() => onSeleccionarCiudad(ciudad)}
          />
          <text
            x={posicion.x}
            y={posicion.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="12"
            fill="white"
            style={{ pointerEvents: "none" }}
          >
            {ciudad.length > 8 ? ciudad.substring(0, 8) + "..." : ciudad}
          </text>
        </g>
      )
    })
  }

  if (ciudades.length === 0) {
    return (
      <div className="grafo-container">
        <p>No hay ciudades en la red</p>
      </div>
    )
  }

  return (
    <div className="grafo-container">
      <svg width="400" height="300">
        {renderizarLineas()}
        {renderizarCiudades()}
      </svg>
    </div>
  )
}

export default RedCiudades
