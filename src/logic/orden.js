// Reglas de negocio de la orden.
// Ver docs/05-arquitectura.md (contrato de cada función) y docs/02-requerimientos.md.
//
// Todas las funciones de este archivo son funciones normales de JavaScript:
//   - No usan React ni Firebase.
//   - Reciben la orden y regresan una orden NUEVA, sin modificar la que recibieron.
//     Es lo mismo que hiciste en la Pokédex con [...equipo, p] y equipo.filter(...).
//
// Forma de una orden:
//   { mesa: number | null, items: [ { id, nombre, precio, cantidad, nota } ] }

export const MAX_POR_PLATILLO = 10
export const MESA_MIN = 1
export const MESA_MAX = 20

// Códigos de error que regresa validarOrden, y el texto que se muestra en pantalla.
export const MENSAJES = {
  MESA_INVALIDA: 'Selecciona una mesa del 1 al 20',
  ORDEN_VACIA: 'Agrega al menos un platillo',
}

// ---------------------------------------------------------------------------
// YA HECHAS: úsalas como modelo para escribir las demás.
// ---------------------------------------------------------------------------

export function crearOrden() {
  return { mesa: null, items: [] }
}

// HU-02-E3. Regresa una orden nueva sin el platillo con ese id.
export function quitarPlatillo(orden, id) {
  return { ...orden, items: orden.items.filter((item) => item.id !== id) }
}

// ---------------------------------------------------------------------------
// MUST
// ---------------------------------------------------------------------------

// HU-02-E1, HU-02-E2 (y HU-05, HU-06 cuando llegues a los Should)
export function agregarPlatillo(orden, platillo) {
  if (platillo.disponible === false) return orden

  const existente = orden.items.find((item) => item.id === platillo.id)

  if (existente) {
    return {
      ...orden,
      items: orden.items.map((item) =>
        item.id === platillo.id
          ? { ...item, cantidad: Math.min(item.cantidad + 1, MAX_POR_PLATILLO) }
          : item
      ),
    }
  }

  return {
    ...orden,
    items: [
      ...orden.items,
      {
        id: platillo.id,
        nombre: platillo.nombre,
        precio: platillo.precio,
        cantidad: 1,
        nota: '',
      },
    ],
  }
}
// HU-03
export function calcularTotal(orden) {

  return orden.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
}

// HU-04-E2
export function asignarMesa(orden, valor) {
  if (valor === '' || valor === null || valor === undefined) {
    return { ...orden, mesa: null }
  }

  const numero = Number(valor)

  if (numero !== numero) {
    return { ...orden, mesa: null }
  }

  return { ...orden, mesa: numero }
}


// HU-04-E2, HU-04-E3
export function validarOrden(orden) {
  const errores = []

  const mesaOk =
    Number.isInteger(orden.mesa) && orden.mesa >= MESA_MIN && orden.mesa <= MESA_MAX
  if (!mesaOk) errores.push('MESA_INVALIDA')

  if (orden.items.length === 0) errores.push('ORDEN_VACIA')

  return { valida: errores.length === 0, errores }
}
// ---------------------------------------------------------------------------
// SHOULD
// ---------------------------------------------------------------------------

// HU-05
export function cambiarCantidad(orden, id, cantidad) {
  if (cantidad <=0) {
    return quitarPlatillo(orden, id)

  }
  let cantidadFinal = cantidad
  if (cantidad > MAX_POR_PLATILLO) {
    cantidadFinal
  }
  return orden
}

// ---------------------------------------------------------------------------
// COULD
// ---------------------------------------------------------------------------

// HU-08
export function ponerNota(orden, id, nota) {
  // TODO
  return orden
}
