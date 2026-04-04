/**
 * dashboard.view.js — Vista del Dashboard
 * Renderiza stats cards y tabla de últimos registros.
 */

import { getDashboardStats } from './dashboard.service.js'
import { openModal } from '../../shared/modal.component.js'
import { truncate } from '../../shared/utils.js'

/** Renderiza el dashboard completo con estadísticas y últimos registros */
export function renderDashboard() {
  const { total, monthCount, uniqueClients, lastTime, lastDate, recentRows, previewCols } =
    getDashboardStats()

  // Stats cards
  document.getElementById('stat-total').textContent   = total
  document.getElementById('stat-month').textContent   = monthCount
  document.getElementById('stat-clients').textContent = uniqueClients
  document.getElementById('stat-last').textContent    = lastTime
  document.getElementById('stat-last-sub').textContent = lastDate

  // Tabla de últimos registros
  const wrap = document.getElementById('dash-table-wrap')
  const countEl = document.getElementById('dash-count')
  if (!wrap) return

  if (recentRows.length === 0) {
    wrap.innerHTML = `<div class="empty-state"><p>Sin resultados</p></div>`
    if (countEl) countEl.textContent = '0 registros'
    return
  }

  if (countEl) countEl.textContent = `${recentRows.length} mostrando`

  let html = `<div style="overflow-x:auto;"><table><thead><tr>`
  previewCols.forEach(h => { html += `<th>${h}</th>` })
  html += `<th></th></tr></thead><tbody>`

  recentRows.forEach(row => {
    html += `<tr>`
    previewCols.forEach(h => { html += `<td>${truncate(row[h] || '', 30)}</td>` })
    html += `<td><button class="btn btn-ghost dashboard-detail-btn"
      style="font-size:11px;padding:4px 10px;"
      data-idx="${row._idx}">Ver</button></td>`
    html += `</tr>`
  })

  html += `</tbody></table></div>`
  wrap.innerHTML = html

  // Enlaza botones
  wrap.querySelectorAll('.dashboard-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(Number(btn.dataset.idx)))
  })
}
