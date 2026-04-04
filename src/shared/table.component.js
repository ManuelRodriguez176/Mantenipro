/**
 * table.component.js — Componente reutilizable de tabla HTML
 */

import { truncate } from './utils.js'

/**
 * Renderiza una tabla genérica en un contenedor dado.
 * @param {string}   containerId  — ID del elemento contenedor
 * @param {string[]} cols         — Columnas a mostrar
 * @param {object[]} rows         — Filas de datos
 * @param {object}   options      — { showIndex, actionLabel, onAction }
 */
export function renderTable(containerId, cols, rows, options = {}) {
  const container = document.getElementById(containerId)
  if (!container) return

  const { showIndex = false, actionLabel = 'Ver', onAction = null, truncateLen = 25 } = options

  if (rows.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>Sin resultados para tu búsqueda.</p></div>`
    return
  }

  let html = `<div style="overflow-x:auto;"><table><thead><tr>`
  if (showIndex) html += `<th>#</th>`
  cols.forEach(h => { html += `<th>${h}</th>` })
  if (onAction) html += `<th>Acciones</th>`
  html += `</tr></thead><tbody>`

  rows.forEach((row, i) => {
    html += `<tr>`
    if (showIndex) html += `<td class="cell-muted">${i + 1}</td>`
    cols.forEach(h => {
      html += `<td>${truncate(row[h] || '', truncateLen)}</td>`
    })
    if (onAction) {
      html += `<td><button class="btn btn-ghost" style="font-size:11px;padding:4px 10px;"
        data-idx="${row._idx}">${actionLabel}</button></td>`
    }
    html += `</tr>`
  })

  html += `</tbody></table></div>`
  container.innerHTML = html

  // Enlaza botones de acción
  if (onAction) {
    container.querySelectorAll('[data-idx]').forEach(btn => {
      btn.addEventListener('click', () => onAction(Number(btn.dataset.idx)))
    })
  }
}
