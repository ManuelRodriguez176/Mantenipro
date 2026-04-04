/**
 * settings.view.js — Vista de la página Configuración
 * Solo inicializa botones (los datos los setea auth.view al hacer login).
 */

import { showConfigScreen } from '../config/config.view.js'
import { logout } from '../auth/auth.service.js'

export function initSettingsView() {
  document.getElementById('btn-reconfig')?.addEventListener('click', showConfigScreen)
  document.getElementById('btn-logout-settings')?.addEventListener('click', logout)
}
