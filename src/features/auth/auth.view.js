/**
 * auth.view.js — Vista de login y manejo del usuario en UI
 */

import { login, logout, getAuthErrorMessage } from './auth.service.js'
import { showConfigScreen } from '../config/config.view.js'
import { getState } from '../../core/store.js'

/** Muestra un error en el formulario de login */
function showLoginError(msg) {
  const el = document.getElementById('login-error')
  el.textContent = msg
  el.style.display = 'block'
}

/** Maneja el submit del formulario de login */
async function handleLogin() {
  const email = document.getElementById('login-email').value.trim()
  const pass  = document.getElementById('login-password').value
  const btn   = document.getElementById('login-btn')
  const err   = document.getElementById('login-error')

  if (!email || !pass) { showLoginError('Ingresa correo y contraseña.'); return }

  btn.disabled = true
  btn.innerHTML = '<div class="loading-spinner"></div> Ingresando...'
  err.style.display = 'none'

  try {
    await login(email, pass)
  } catch (e) {
    showLoginError(getAuthErrorMessage(e.code) || e.message)
    btn.disabled = false
    btn.innerHTML = 'Ingresar al sistema'
  }
}

/** Actualiza el chip de usuario en el sidebar con los datos del usuario autenticado */
export function setUser(user) {
  const name     = user.displayName || user.email.split('@')[0]
  const initials = name.slice(0, 2).toUpperCase()
  const config   = getState('config')

  document.getElementById('user-avatar').textContent       = initials
  document.getElementById('user-name').textContent         = name
  document.getElementById('user-email-display').textContent = user.email

  // Actualiza la página de settings con la config actual
  document.getElementById('cfg-show-project').textContent = config.fbProjectId || '—'
  document.getElementById('cfg-show-domain').textContent  = config.fbAuthDomain || '—'
  document.getElementById('cfg-show-sheet').textContent   = config.gsSheetId || '—'
  document.getElementById('cfg-show-range').textContent   = `${config.gsSheetName} / ${config.gsRange}`
}

/** Inicializa eventos de la pantalla de login */
export function initAuthView() {
  document.getElementById('login-btn')?.addEventListener('click', handleLogin)

  document.getElementById('btn-show-config')?.addEventListener('click', showConfigScreen)

  // Soporte Enter en campos de login
  ['login-email', 'login-password'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleLogin()
    })
  })

  // Logout desde sidebar y settings
  document.getElementById('btn-logout')?.addEventListener('click', logout)
  document.getElementById('btn-logout-settings')?.addEventListener('click', logout)
}
