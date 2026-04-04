/**
 * auth.service.js — Lógica de autenticación con Firebase
 */

import { toast } from '../../core/toast.js'
import { setState } from '../../core/store.js'

const AUTH_ERROR_MESSAGES = {
  'auth/user-not-found':    'Usuario no encontrado.',
  'auth/wrong-password':    'Contraseña incorrecta.',
  'auth/invalid-email':     'Correo inválido.',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
}

/** Inicia sesión con email y contraseña */
export async function login(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password)
}

/** Cierra la sesión actual y limpia el estado */
export function logout() {
  firebase.auth().signOut()
  setState('allData', [])
  setState('headers', [])
  setState('filteredData', [])
}

/** Mapea códigos de error de Firebase a mensajes amigables */
export function getAuthErrorMessage(code) {
  return AUTH_ERROR_MESSAGES[code] || 'Error de autenticación.'
}
