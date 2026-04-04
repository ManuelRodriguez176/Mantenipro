/**
 * store.js — Estado global reactivo (patrón pub/sub simple)
 * Unica fuente de verdad para toda la app.
 */

const state = {
  config: {},
  allData: [],
  headers: [],
  filteredData: [],
  visibleCols: [],
  colFilterVal: '',
  currentPage: 1,
}

const PAGE_SIZE = 15
const listeners = {}

/** Suscribirse a cambios de una clave del estado */
export function subscribe(key, fn) {
  if (!listeners[key]) listeners[key] = []
  listeners[key].push(fn)
}

/** Actualizar estado y notificar suscriptores */
export function setState(key, value) {
  state[key] = value
  if (listeners[key]) listeners[key].forEach(fn => fn(value))
}

/** Leer estado */
export function getState(key) {
  return state[key]
}

export { PAGE_SIZE }
