/**
 * modal.component.js — Modal de detalle de registro
 */

import { getState } from '../core/store.js'

export function openModal(idx) {
  const allData = getState('allData')
  const headers = getState('headers')
  const row = allData[idx]
  if (!row) return

  let html = ''
  headers.forEach(h => {
    html += `<div class="detail-row">
      <span class="detail-key">${h}</span>
      <span class="detail-val">${row[h] || '<em style="color:var(--text-3)">—</em>'}</span>
    </div>`
  })

  document.getElementById('modal-body').innerHTML = html
  document.getElementById('detail-modal').classList.add('open')
}

export function closeModal() {
  document.getElementById('detail-modal').classList.remove('open')
}

export function initModal() {
  document.getElementById('btn-close-modal')?.addEventListener('click', closeModal)
  document.getElementById('detail-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('detail-modal')) closeModal()
  })
}
