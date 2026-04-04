/**
 * toast.js — Sistema de notificaciones tipo toast
 */

let toastTimer

/**
 * Muestra un mensaje toast
 * @param {string} msg  — Texto del mensaje
 * @param {'success'|'error'|''} type — Tipo visual
 */
export function toast(msg, type = '') {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = msg
  el.className = 'toast show' + (type ? ` toast-${type}` : '')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { el.className = 'toast' }, 3500)
}
