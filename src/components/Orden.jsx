// Muestra la orden en curso: mesa, platillos, total, errores y el botón de
// confirmar. Ver docs/08-contrato-ui.md y el wireframe de docs/07-wireframes.md.
// Toma Menu.jsx como modelo.
//
// Props: decide tú cuáles necesita y escríbelas aquí.
//        (Pista: la orden, el total, los mensajes de error y una función por acción.)
export default function Orden({ orden, total, errores = [], onQuitar, onConfirmar }) {
  const vacia = orden.items.length === 0

  return (
    <section aria-label="Orden">
      <h2>Orden</h2>
      {/* TODO HU-02 · HU-03 · HU-04 */}
      <p>
        Mesa: <strong>{orden.mesa}</strong>
      </p>
      {vacia ? (
        <p>Aún hay platillos en la orden</p>
      ):(
        <ul>
          {orden.items.map((item) => (
            <li key={item.id} aria-label={item.nombre}>
              <strong>{item.nombre}</strong> x{item.cantidad}{' '}
              <span>${item.precio * item.cantidad}</span>{' '}
              <button onClick={() => onQuitar(item)}>Quitar</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function Menu({ menu, onAgregar }) {
  const categorias = [...new Set(menu.map((p) => p.categoria))]
  return (
    <section aria-label="Menú">
      <h2>Menú</h2>
      {categorias.map((categoria) => (
        <div key={categoria}>
          <h3>{categoria}</h3>
          {menu
            .filter((p) => p.categoria === categoria)
            .map((p) => {
              const agotado = p.disponible === false
              return (
                <article key={p.id} aria-label={p.nombre}>
                  <strong>{p.nombre}</strong> <span>${p.precio}</span>{' '}
                  <button disabled={agotado} onClick={() => onAgregar(p)}>
                    {agotado ? 'Agotado' : 'Agregar'}
                  </button>
                </article>
              )
            })}
        </div>
      ))}
    </section>
  )
}
