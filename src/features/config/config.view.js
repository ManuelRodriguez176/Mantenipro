/**
 * config.view.js — Vista de configuración inicial
 * Rellena el formulario con valores actuales y enlaza el botón guardar.
 */

import { getState } from '../../core/store.js'
import { saveConfig } from './config.service.js'
import { showScreen } from '../../core/router.js'

/** Muestra la pantalla de configuración y rellena los campos con la config guardada */
export function showConfigScreen() {
  const config = getState('config')

  const fields = {
    'cfg-fb-apikey':     config.fbApiKey,
    'cfg-fb-authdomain': config.fbAuthDomain,
    'cfg-fb-projectid':  config.fbProjectId,
    'cfg-gs-apikey':     config.gsApiKey,
    'cfg-gs-sheetid':    config.gsSheetId,
    'cfg-gs-sheetname':  config.gsSheetName,
    'cfg-gs-range':      config.gsRange,
  }

  Object.entries(fields).forEach(([id, val]) => {
    if (val) document.getElementById(id).value = val
  })

  showScreen('screen-config')
}

/** Inicializa eventos de la pantalla de configuración */
export function initConfigView() {
  document.getElementById('btn-save-config')?.addEventListener('click', saveConfig)
}
