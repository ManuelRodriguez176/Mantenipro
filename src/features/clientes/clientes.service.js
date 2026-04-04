/**
 * clientes.service.js — Lógica de negocio de la página Clientes
 * Agrupa mantenimientos por cliente y calcula proporciones.
 */

import { getState } from '../../core/store.js'

/**
 * Construye el listado de clientes con sus conteos.
 * @returns {{ clientCol: string|null, sorted: [string, number][], total: number }}
 */
export function getClientsData() {
  const allData = getState('allData')
  const headers = getState('headers')

  const clientCols = headers.filter(h => /cliente|nombre|company|empresa/i.test(h))
  const clientCol  = clientCols[0] || headers[1] || null

  if (!clientCol) return { clientCol: null, sorted: [], total: 0 }

  const map = {}
  allData.forEach(row => {
    const name = row[clientCol] || '(sin nombre)'
    map[name] = (map[name] || 0) + 1
  })

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1])

  return { clientCol, sorted, total: allData.length }
}
