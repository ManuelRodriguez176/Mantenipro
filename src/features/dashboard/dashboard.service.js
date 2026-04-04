/**
 * dashboard.service.js — Lógica de negocio del Dashboard
 * Cálculo de estadísticas a partir del estado global.
 */

import { getState } from '../../core/store.js'

/**
 * Calcula todas las estadísticas del dashboard.
 * @returns {{ total, monthCount, uniqueClients, lastTime, lastDate, recentRows, previewCols }}
 */
export function getDashboardStats() {
  const allData      = getState('allData')
  const filteredData = getState('filteredData')
  const headers      = getState('headers')

  // Total
  const total = allData.length

  // Clientes únicos
  const clientCols   = headers.filter(h => /cliente|nombre|company|empresa/i.test(h))
  const cCol         = clientCols[0] || headers[1]
  const uniqueClients = cCol
    ? new Set(allData.map(r => r[cCol]).filter(Boolean)).size
    : '?'

  // Este mes
  const dateCols  = headers.filter(h => /fecha|date|timestamp|hora/i.test(h))
  const dCol      = dateCols[0]
  let monthCount  = '?'
  if (dCol) {
    const now = new Date()
    monthCount = allData.filter(r => {
      try {
        const d = new Date(r[dCol])
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      } catch { return false }
    }).length
  }

  // Última actualización
  const now      = new Date()
  const lastTime = now.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' })
  const lastDate = now.toLocaleDateString('es-PA')

  // Últimos 8 registros y primeras 4 columnas para preview
  const recentRows  = filteredData.slice(0, 8)
  const previewCols = headers.slice(0, 4)

  return { total, monthCount, uniqueClients, lastTime, lastDate, recentRows, previewCols }
}
