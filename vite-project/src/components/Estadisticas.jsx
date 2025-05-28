import { useContext } from "react"
import { NetworkContext } from "../context/NetworkContext"

function Estadisticas({ ciudadSeleccionada }) {
  const { obtenerZonasVerdes, calcularEstadisticas } = useContext(NetworkContext)

  const zonasVerdes = obtenerZonasVerdes(ciudadSeleccionada)
  const { altura, totalZonas } = calcularEstadisticas(ciudadSeleccionada)

  return (
    <div className="estadisticas">
      <h3>Estadísticas de {ciudadSeleccionada}</h3>
      <div className="estadistica">
        <p>
          <strong>Altura máxima del árbol:</strong> {altura}
        </p>
        <p>
          <strong>Número total de zonas verdes:</strong> {totalZonas}
        </p>
      </div>
    </div>
  )
}

export default Estadisticas
