// Tempel di Google Sheet: Extensions > Apps Script
const HEADERS = ['id','waktu','nama','prodi','status','pertanyaan','jawaban','ditemukan','rating'];
const aman = v => String(v == null ? '' : v).replace(/^([=+\-@])/, "'$1"); // cegah formula injection

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
    if (d.action === 'log') {
      sh.appendRow(HEADERS.map(h => aman(d[h])));
    } else if (d.action === 'rate') {
      const n = Math.max(sh.getLastRow() - 1, 1);
      const ids = sh.getRange(2, 1, n, 1).getValues().flat();
      const i = ids.indexOf(String(d.id));
      const r = Number(d.rating);
      if (i >= 0 && r >= 1 && r <= 5) sh.getRange(i + 2, HEADERS.indexOf('rating') + 1).setValue(r);
    }
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
