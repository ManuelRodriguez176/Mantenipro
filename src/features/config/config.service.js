/**
 * config.service.js — Lógica de negocio para configuración
 * Lee/escribe en localStorage y actualiza el store global.
 */

import { getState, setState } from '../../core/store.js'
import { toast } from '../../core/toast.js'
import { initFirebase } from '../../core/firebase.js'

const CONFIG_KEY = 'mantenipro_config'

/** Carga config desde localStorage al store */
export function loadConfig() {
  const saved = localStorage.getItem(CONFIG_KEY)
  if (saved) {
    setState('config', JSON.parse(saved))
    return true
  }
  return false
}

/** Guarda config al localStorage y reinicia Firebase */
export function saveConfig() {
  const fbApiKey     = document.getElementById('cfg-fb-apikey').value.trim()
  const fbAuthDomain = document.getElementById('cfg-fb-authdomain').value.trim()
  const fbProjectId  = document.getElementById('cfg-fb-projectid').value.trim()
  const gsApiKey     = document.getElementById('cfg-gs-apikey').value.trim()
  const gsSheetId    = document.getElementById('cfg-gs-sheetid').value.trim()
  const gsSheetName  = document.getElementById('cfg-gs-sheetname').value.trim()
  const gsRange      = document.getElementById('cfg-gs-range').value.trim()

  if (!fbApiKey || !fbAuthDomain || !fbProjectId || !gsApiKey || !gsSheetId) {
    toast('Completa todos los campos requeridos.', 'error')
    return
  }

  const config = { fbApiKey, fbAuthDomain, fbProjectId, gsApiKey, gsSheetId, gsSheetName, gsRange }
  setState('config', config)
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
  initFirebase()
}
