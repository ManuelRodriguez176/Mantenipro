/**
 * main.js — Punto de entrada de ManteniPro
 *
 * Responsabilidad: orquestar la inicialización de todos los módulos.
 * NO contiene lógica de negocio — solo conecta piezas.
 *
 * Orden de arranque:
 *  1. Cargar config desde localStorage
 *  2. Si existe config → iniciar Firebase → onAuthStateChanged decide pantalla
 *  3. Si no existe config → mostrar pantalla de configuración
 *  4. Inicializar todos los event listeners de vistas
 */

import { loadConfig }             from './features/config/config.service.js'
import { initConfigView }         from './features/config/config.view.js'
import { initAuthView, setUser }  from './features/auth/auth.view.js'
import { initMantenimientosView,
         buildColToggle,
         buildColFilter,
         renderMantenimientosTable } from './features/mantenimientos/mantenimientos.view.js'
import { renderDashboard }        from './features/dashboard/dashboard.view.js'
import { renderClients }          from './features/clientes/clientes.view.js'
import { initSettingsView }       from './features/settings/settings.view.js'
import { initModal }              from './shared/modal.component.js'
import { initNavigation, showScreen } from './core/router.js'
import { initFirebase }           from './core/firebase.js'
import { loadSheetData }          from './features/mantenimientos/mantenimientos.service.js'

/**
 * Suscribe las views a los CustomEvents que emite firebase.js (auth)
 * y mantenimientos.service.js (datos).
 *
 * Flujo limpio:
 *   firebase  → emit('auth:login')   → main.js → setUser + showScreen + loadSheetData
 *   service   → emit('data:loaded')  → main.js → render views
 */
function initAuthEvents() {
  document.addEventListener('auth:login', ({ detail: { user } }) => {
    setUser(user)
    showScreen('screen-app')
    loadSheetData()
  })

  document.addEventListener('auth:logout', () => {
    showScreen('screen-login')
  })
}

function initDataEvents() {
  document.addEventListener('data:loaded', () => {
    buildColToggle()
    buildColFilter()
    renderDashboard()
    renderMantenimientosTable()
    renderClients()
  })

  document.addEventListener('data:filtered', () => {
    renderMantenimientosTable()
    renderDashboard()
  })

  document.addEventListener('data:page-changed', () => {
    renderMantenimientosTable()
  })
}

// ── Botón de refresco en topbar ──────────────────────────────────────────────
function initRefreshButton() {
  document.getElementById('btn-refresh')?.addEventListener('click', loadSheetData)
}

// ── Bootstrap ────────────────────────────────────────────────────────────────
function bootstrap() {
  // 1. Inicializar event listeners de vistas
  initConfigView()
  initAuthView()
  initMantenimientosView()
  initSettingsView()
  initModal()
  initNavigation()
  initRefreshButton()

  // 2. Conectar firebase/service → views mediante eventos
  initAuthEvents()
  initDataEvents()

  // 3. Cargar config guardada
  const hasConfig = loadConfig()

  if (hasConfig) {
    initFirebase()      // Firebase decide pantalla según auth state
  } else {
    showScreen('screen-config')   // Primera vez
  }
}

document.addEventListener('DOMContentLoaded', bootstrap)
