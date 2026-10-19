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
        <p>Aún no hay platillos en la orden</p>
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
      <p>
        Total: <strong>${total}</strong>
      </p>

      {errores.length > 0 && (
        <div role="alert">
          {errores.map((mensaje) => (
            <p key={mensaje}>{mensaje}</p>
          ))}
        </div>
      )}
      <button disabled={vacia} onClick={onConfirmar}>
        Confirmar orden
      </button>
    </section>
  )
}
