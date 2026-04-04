/**
 * mantenimientos.service.js — Carga, filtrado y paginación de registros
 *
 * ARQUITECTURA: este service NO importa ninguna view.
 * Después de mutar el store, emite CustomEvents para que
 * las views se actualicen solas (desacoplamiento total).
 */

import { getState, setState, PAGE_SIZE } from '../../core/store.js'
import { fetchSheetRows } from '../../shared/sheets.service.js'
import { toast } from '../../core/toast.js'

/** Emite un CustomEvent global para notificar a las views */
function emit(event, detail = {}) {
  document.dispatchEvent(new CustomEvent(event, { detail }))
}

/** Carga datos desde Google Sheets y actualiza el store */
export async function loadSheetData() {
  try {
    const { headers, rows } = await fetchSheetRows()

    setState('headers', headers)
    setState('allData', rows)
    setState('visibleCols', [...headers])
    setState('filteredData', [...rows])
    setState('currentPage', 1)

    emit('data:loaded', { count: rows.length })
    toast(`${rows.length} registros cargados`, 'success')

  } catch (e) {
    toast('Error al conectar con Google Sheets: ' + e.message, 'error')
  }
}

/** Filtra datos según búsqueda y columna seleccionada */
export function filterData() {
  const q         = (document.getElementById('search-input')?.value || '').toLowerCase()
  const colFilter = document.getElementById('col-filter')?.value || ''
  const headers   = getState('headers')
  const allData   = getState('allData')

  setState('colFilterVal', colFilter)

  const filtered = allData.filter(row => {
    if (colFilter) return (row[colFilter] || '').toLowerCase().includes(q)
    return headers.some(h => (row[h] || '').toLowerCase().includes(q))
  })

  setState('filteredData', filtered)
  setState('currentPage', 1)

  emit('data:filtered')
}

/** Cambia la página actual */
export function goToPage(page) {
  setState('currentPage', page)
  emit('data:page-changed')
}

/** Devuelve el slice de datos para la página actual */
export function getCurrentPageData() {
  const filteredData = getState('filteredData')
  const currentPage  = getState('currentPage')
  const start        = (currentPage - 1) * PAGE_SIZE
  return {
    slice: filteredData.slice(start, start + PAGE_SIZE),
    total: filteredData.length,
    start,
    pages: Math.ceil(filteredData.length / PAGE_SIZE),
  }
}
