/**
 * sheets.service.js — Servicio de acceso a Google Sheets API v4
 * Responsabilidad única: obtener filas crudas desde la hoja.
 */

import { getState } from '../core/store.js'

/**
 * Obtiene todas las filas de la hoja configurada.
 * @returns {{ headers: string[], rows: object[] }}
 * @throws Error si la API devuelve error o la hoja está vacía
 */
export async function fetchSheetRows() {
  const config = getState('config')
  const range  = encodeURIComponent(`${config.gsSheetName}!${config.gsRange}`)
  const url    = `https://sheets.googleapis.com/v4/spreadsheets/${config.gsSheetId}/values/${range}?key=${config.gsApiKey}`

  const res  = await fetch(url)
  const json = await res.json()

  if (json.error) {
    throw new Error(json.error.message)
  }

  const rawRows = json.values || []
  if (rawRows.length < 2) {
    throw new Error('La hoja está vacía o solo tiene encabezados.')
  }

  const headers = rawRows[0]
  const rows    = rawRows.slice(1).map((row, i) => {
    const obj = { _idx: i }
    headers.forEach((h, j) => { obj[h] = row[j] || '' })
    return obj
  })

  return { headers, rows }
}
