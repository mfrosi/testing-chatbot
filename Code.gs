// Tempel di Google Sheet: Extensions > Apps Script
// Satu baris = satu sesi chat. Kolom id hanya penanda internal, boleh disembunyikan.
const HEADERS = ['waktu','nama','prodi','status','jumlah_tanya','terjawab','rating','id'];
const aman = v => String(v == null ? '' : v).replace(/^([=+\-@])/, "'$1"); // cegah formula injection
const kol = h => HEADERS.indexOf(h) + 1;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
    const n = Math.max(sh.getLastRow() - 1, 1);
    const ids = sh.getRange(2, kol('id'), n, 1).getValues().flat().map(String);
    const i = ids.indexOf(String(d.id));

    if (d.action === 'sesi') {
      if (i < 0) {
        sh.appendRow(HEADERS.map(h => aman(d[h])));
      } else {
        const baris = i + 2;
        ['jumlah_tanya', 'terjawab'].forEach(h => {
          const lama = Number(sh.getRange(baris, kol(h)).getValue()) || 0;
          sh.getRange(baris, kol(h)).setValue(Math.max(lama, Number(d[h]) || 0));
        });
      }
    } else if (d.action === 'rate') {
      const r = Number(d.rating);
      if (i >= 0 && r >= 1 && r <= 5) sh.getRange(i + 2, kol('rating')).setValue(r);
    }
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
