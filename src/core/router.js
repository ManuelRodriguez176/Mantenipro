/**
 * router.js — Navegación entre pantallas y páginas internas
 */

const PAGE_TITLES = {
  dashboard:      'Dashboard',
  mantenimientos: 'Mantenimientos',
  clientes:       'Clientes',
  settings:       'Configuración',
}

/** Muestra una pantalla principal (screen-config, screen-login, screen-app) */
export function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById(id)?.classList.add('active')
}

/** Navega entre páginas internas del app */
export function navigate(page, navItemEl = null) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'))
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'))

  if (navItemEl) navItemEl.classList.add('active')
  document.getElementById(`page-${page}`)?.classList.add('active')

  const titleEl = document.getElementById('topbar-title')
  if (titleEl) titleEl.textContent = PAGE_TITLES[page] || page
}

/** Inicializa los click handlers de navegación del sidebar */
export function initNavigation() {
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      navigate(item.dataset.page, item)
    })
  })
}
