/**
 * mantenimientos.view.js — Vista de la página Mantenimientos
 * Tabla paginada, toggle de columnas, filtro y exportar CSV
 */

import { getState, setState, PAGE_SIZE } from '../../core/store.js'
import { filterData, goToPage, getCurrentPageData } from './mantenimientos.service.js'
import { openModal } from '../../shared/modal.component.js'
import { exportToCSV } from '../../shared/utils.js'
import { truncate } from '../../shared/utils.js'

/** Construye los chips de toggle de columnas visibles */
export function buildColToggle() {
  const headers = getState('headers')
  const wrap    = document.getElementById('cols-toggle')
  if (!wrap) return
  wrap.innerHTML = ''

  headers.forEach(h => {
    const chip = document.createElement('span')
    chip.className   = 'col-chip on'
    chip.textContent = h
    chip.addEventListener('click', () => {
      let visibleCols = getState('visibleCols')
      if (visibleCols.includes(h)) {
        if (visibleCols.length <= 1) return
        setState('visibleCols', visibleCols.filter(c => c !== h))
        chip.classList.remove('on')
      } else {
        setState('visibleCols', [...visibleCols, h])
        chip.classList.add('on')
      }
      renderMantenimientosTable()
    })
    wrap.appendChild(chip)
  })
}

/** Construye el select de filtro por columna */
export function buildColFilter() {
  const headers = getState('headers')
  const sel     = document.getElementById('col-filter')
  if (!sel) return

  sel.innerHTML = '<option value="">Todas las columnas</option>'
  headers.forEach(h => {
    const o = document.createElement('option')
    o.value       = h
    o.textContent = h
    sel.appendChild(o)
  })
}

/** Renderiza la tabla paginada de mantenimientos */
export function renderMantenimientosTable() {
  const headers     = getState('headers')
  const visibleCols = getState('visibleCols')
  const cols        = headers.filter(h => visibleCols.includes(h))
  const { slice, total, start, pages } = getCurrentPageData()
  const currentPage = getState('currentPage')

  const container = document.getElementById('main-table-wrap')
  if (!container) return

  if (slice.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>Sin resultados para tu búsqueda.</p></div>`
    document.getElementById('pagination').style.display = 'none'
    return
  }

  let html = `<div style="overflow-x:auto;"><table><thead><tr><th>#</th>`
  cols.forEach(h => { html += `<th>${h}</th>` })
  html += `<th>Acciones</th></tr></thead><tbody>`

  slice.forEach((row, i) => {
    html += `<tr>`
    html += `<td class="cell-muted">${start + i + 1}</td>`
    cols.forEach(h => { html += `<td>${truncate(row[h] || '', 25)}</td>` })
    html += `<td><button class="btn btn-ghost table-action-btn"
      style="font-size:11px;padding:4px 10px;"
      data-idx="${row._idx}">Detalle</button></td>`
    html += `</tr>`
  })
  html += `</tbody></table></div>`
  container.innerHTML = html

  // Enlaza botones de detalle
  container.querySelectorAll('.table-action-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(Number(btn.dataset.idx)))
  })

  // Paginación
  const pag = document.getElementById('pagination')
  pag.style.display = 'flex'
  document.getElementById('page-info').textContent =
    `${start + 1}–${Math.min(start + PAGE_SIZE, total)} de ${total}`

  renderPagination(pages, currentPage)
}

/** Renderiza los botones de paginación */
function renderPagination(pages, currentPage) {
  const btns = document.getElementById('page-btns')
  if (!btns) return
  btns.innerHTML = ''

  const addBtn = (label, page, disabled = false) => {
    const b = document.createElement('button')
    b.className = 'page-btn' + (page === currentPage ? ' active' : '')
    b.textContent = label
    b.disabled    = disabled
    b.addEventListener('click', () => goToPage(page))
    btns.appendChild(b)
  }

  addBtn('‹', currentPage - 1, currentPage === 1)

  const range = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, pages])]
    .filter(p => p >= 1 && p <= pages)
    .sort((a, b) => a - b)

  range.forEach(p => addBtn(p, p))
  addBtn('›', currentPage + 1, currentPage === pages)
}

/** Inicializa eventos de la página de mantenimientos */
export function initMantenimientosView() {
  document.getElementById('search-input')?.addEventListener('input', filterData)
  document.getElementById('col-filter')?.addEventListener('change', filterData)

  document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    const headers     = getState('headers')
    const filteredData = getState('filteredData')
    const visibleCols = getState('visibleCols')
    exportToCSV(headers, filteredData, visibleCols, 'mantenimientos.csv')
  })
}
