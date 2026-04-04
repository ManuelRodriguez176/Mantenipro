/**
 * firebase.js — Inicialización y acceso a Firebase
 * Usa el SDK compat cargado en index.html (sin npm para evitar bundle doble)
 */

/**
 * firebase.js — Inicialización de Firebase
 *
 * ARQUITECTURA: core no importa features.
 * Emite CustomEvents para que main.js coordine las respuestas.
 */

import { toast }       from './toast.js'
import { showScreen }  from './router.js'
import { getState }    from './store.js'

function emit(event, detail = {}) {
  document.dispatchEvent(new CustomEvent(event, { detail }))
}

/**
 * Inicializa Firebase con la config actual del store.
 * Emite 'auth:login' o 'auth:logout' según el estado del usuario.
 */
export async function initFirebase() {
  const config = getState('config')

  try {
    if (firebase.apps.length) {
      await firebase.app().delete()
    }

    firebase.initializeApp({
      apiKey:     config.fbApiKey,
      authDomain: config.fbAuthDomain,
      projectId:  config.fbProjectId,
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        emit('auth:login', { user })
      } else {
        emit('auth:logout')
      }
    })

  } catch (e) {
    toast('Error Firebase: ' + e.message, 'error')
    showScreen('screen-login')
  }
}
