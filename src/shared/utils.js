/**
 * utils.js — Funciones utilitarias compartidas
 */

/** Trunca un string a n caracteres */
export function truncate(str, n) {
  return str.length > n ? str.slice(0, n) + '…' : str
}

/** Exporta datos a CSV y dispara descarga */
export function exportToCSV(headers, data, visibleCols, filename = 'export.csv') {
  const cols = headers.filter(h => visibleCols.includes(h))
  const rows = [
    cols,
    ...data.map(r => cols.map(h => `"${(r[h] || '').replace(/"/g, '""')}"`))
  ]
  const csv  = rows.map(r => r.join(',')).join('\n')
  const a    = document.createElement('a')
  a.href     = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
  a.download = filename
  a.click()
}
