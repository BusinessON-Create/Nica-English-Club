const CLAVE = 'miclave2026'; // <-- cambia por tu clave de maestro

const GH = ['id', 'nombre', 'horario', 'codigo'], CH = ['grupo_id', 'fecha', 'file_id', 'actualizado'];
const P = PropertiesService.getScriptProperties();

function ss_() {
  try { const a = SpreadsheetApp.getActive(); if (a) return a; } catch (e) {}
  const id = P.getProperty('SSID');
  if (id) return SpreadsheetApp.openById(id);
  const s = SpreadsheetApp.create('NEC Pizarras'); P.setProperty('SSID', s.getId()); return s;
}
function sheet_(n, h) {
  const ss = ss_(); let s = ss.getSheetByName(n);
  if (!s) { s = ss.insertSheet(n); s.appendRow(h); if (n === 'Clases') s.getRange('B:B').setNumberFormat('@'); }
  return s;
}
const rows_ = (n, h) => { const v = sheet_(n, h).getDataRange().getValues(); v.shift(); return v; };
const fmt_ = (v) => v instanceof Date ? Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(v);
const need_ = (ok) => { if (!ok) throw new Error('Clave incorrecta'); };
const out_ = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
function folder_() {
  const id = P.getProperty('FOLDER'); if (id) return DriveApp.getFolderById(id);
  const f = DriveApp.createFolder('NEC Pizarras'); P.setProperty('FOLDER', f.getId()); return f;
}

function doGet() { return out_({ ok: true, mensaje: 'NEC Pizarras funcionando' }); }

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try { return out_(handle_(JSON.parse(e.postData.contents))); }
  catch (err) { return out_({ error: String(err.message || err) }); }
  finally { lock.releaseLock(); }
}

function handle_(r) {
  const admin = !!r.key && r.key === CLAVE;
  if (r.action === 'listGroups') { need_(admin); return { groups: rows_('Grupos', GH).map(g => ({ id: g[0], nombre: g[1], horario: g[2], code: g[3] })) }; }
  if (r.action === 'createGroup') {
    need_(admin);
    sheet_('Grupos', GH).appendRow([Utilities.getUuid().slice(0, 8), r.nombre, r.horario || '', Utilities.getUuid().replace(/-/g, '').slice(0, 10)]);
    return { ok: true };
  }
  const g = rows_('Grupos', GH).find(x => admin && r.groupId ? x[0] === r.groupId : (r.code && x[3] === r.code));
  if (!g) throw new Error('Enlace inválido o grupo no encontrado');
  const cs = sheet_('Clases', CH), all = cs.getDataRange().getValues();
  const idx = all.findIndex((x, i) => i > 0 && x[0] === g[0] && fmt_(x[1]) === r.fecha);
  if (r.action === 'listDates')
    return { group: { nombre: g[1], horario: g[2] }, dates: all.slice(1).filter(x => x[0] === g[0]).map(x => fmt_(x[1])).sort().reverse() };
  if (r.action === 'getClass') {
    if (idx < 1) return { scene: null };
    return { scene: JSON.parse(DriveApp.getFileById(all[idx][2]).getBlob().getDataAsString()) };
  }
  if (r.action === 'saveClass') {
    need_(admin); const txt = JSON.stringify(r.scene);
    if (idx < 1) { const f = folder_().createFile(g[0] + '_' + r.fecha + '.json', txt, 'application/json'); cs.appendRow([g[0], r.fecha, f.getId(), new Date()]); }
    else { DriveApp.getFileById(all[idx][2]).setContent(txt); cs.getRange(idx + 1, 4).setValue(new Date()); }
    return { ok: true };
  }
  throw new Error('Acción desconocida');
}
