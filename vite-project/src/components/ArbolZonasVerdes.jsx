function ArbolZonasVerdes({ zonas }) {
    if (!zonas || Object.keys(zonas).length === 0) {
      return <div className="arbol-vacio">No hay zonas verdes</div>
    }
  
    const renderizarNodo = (nodo, nombre) => {
      const tieneHijos = nodo && Object.keys(nodo).length > 0
  
      return (
        <li key={nombre}>
          <div className="nodo-arbol">{nombre}</div>
          {tieneHijos && (
            <ul className="hijos-arbol">{Object.keys(nodo).map((hijo) => renderizarNodo(nodo[hijo], hijo))}</ul>
          )}
        </li>
      )
    }
  
    return (
      <div className="arbol-container">
        <ul className="arbol">{Object.keys(zonas).map((zona) => renderizarNodo(zonas[zona], zona))}</ul>
      </div>
    )
  }
  
  export default ArbolZonasVerdes
  