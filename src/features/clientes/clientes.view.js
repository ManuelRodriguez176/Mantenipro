/**
 * clientes.view.js — Vista de la página Clientes
 */

import { getClientsData } from './clientes.service.js'

/** Renderiza la tabla de clientes con barras de proporción */
export function renderClients() {
  const { clientCol, sorted, total } = getClientsData()
  const wrap    = document.getElementById('clients-wrap')
  const countEl = document.getElementById('clients-count')
  if (!wrap) return

  if (!clientCol) {
    wrap.innerHTML = `<div class="empty-state"><p>No se detectó columna de cliente.</p></div>`
    return
  }

  if (countEl) countEl.textContent = `${sorted.length} clientes`

  const max = sorted[0]?.[1] || 1

  let html = `<div style="overflow-x:auto;"><table>
    <thead><tr>
      <th>Cliente</th>
      <th>Mantenimientos</th>
      <th>Proporción</th>
    </tr></thead><tbody>`

  sorted.forEach(([name, count]) => {
    const pct  = Math.round((count / total) * 100)
    const barW = Math.round((count / max) * 100)

    html += `<tr>
      <td>${name}</td>
      <td><span class="badge badge-accent">${count}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="background:var(--bg-input);border-radius:4px;height:6px;flex:1;min-width:80px;">
            <div style="background:var(--accent);border-radius:4px;height:6px;width:${barW}%;"></div>
          </div>
          <span style="font-size:12px;color:var(--text-2);min-width:32px;">${pct}%</span>
        </div>
      </td>
    </tr>`
  })

  html += `</tbody></table></div>`
  wrap.innerHTML = html
}
