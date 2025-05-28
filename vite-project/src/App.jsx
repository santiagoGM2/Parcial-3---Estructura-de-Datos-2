import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import CiudadForm from "./components/CiudadForm"
import RedCiudades from "./components/RedCiudades"
import ZonasVerdes from "./components/ZonasVerdes"
import Estadisticas from "./components/Estadisticas"
import { NetworkProvider } from "./context/NetworkContext"

function App() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null)

  const seleccionarCiudad = (ciudad) => {
    setCiudadSeleccionada(ciudad)
  }

  return (
    <NetworkProvider>
      <div className="app">
        <Header />
        <div className="contenedor-principal">
          <div className="panel-izquierdo">
            <h2>Red de Ciudades</h2>
            <CiudadForm />
            <RedCiudades onSeleccionarCiudad={seleccionarCiudad} />
          </div>
          <div className="panel-derecho">
            {ciudadSeleccionada ? (
              <>
                <h2>Zonas Verdes de {ciudadSeleccionada}</h2>
                <ZonasVerdes ciudadSeleccionada={ciudadSeleccionada} />
                <Estadisticas ciudadSeleccionada={ciudadSeleccionada} />
              </>
            ) : (
              <p>Selecciona una ciudad para ver sus zonas verdes</p>
            )}
          </div>
        </div>
      </div>
    </NetworkProvider>
  )
}

export default App
