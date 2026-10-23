# Chatbot Tanya Perpustakaan (versi GitHub Pages)

Tanpa AI dan tanpa server: halaman web biasa yang mencocokkan pertanyaan ke `faq.csv`.
Rating dan data pengguna disimpan ke Google Sheets lewat Google Apps Script.

## 1. Siapkan data
- `faq.csv`: ganti dengan CSV kamu. Kolom wajib `pertanyaan` dan `jawaban`.
  Kolom opsional `kata_kunci` (isi sinonim atau cara lain orang menanyakannya, misalnya "jam operasional, kapan tutup").
- `index.html`: ubah `PRODI` dan `LIBRARY` di bagian PENGATURAN (dekat awal tag `<script>`).

## 2. Simpan data ke Google Sheets
1. Buat Google Sheet baru (kosong).
2. Di Sheet itu: menu Extensions > Apps Script. Hapus isinya, tempel isi `Code.gs`, lalu Save.
3. Klik Deploy > New deployment > ikon roda gigi > pilih "Web app".
   - Execute as: Me
   - Who has access: Anyone
4. Klik Deploy, izinkan akses (kalau muncul peringatan "belum diverifikasi", klik Advanced > Go to ... ).
5. Salin "Web app URL", lalu tempel di `index.html` pada `APPS_SCRIPT_URL: ""`.
Kalau kamu mengubah `Code.gs` lagi, buat deployment versi baru (Deploy > Manage deployments > Edit > New version).

## 3. Online lewat GitHub Pages
1. Buat repository di GitHub, unggah `index.html` dan `faq.csv` lewat Add file > Upload files.
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`, lalu Save.
3. Tunggu 1-2 menit. Linknya: `https://NAMAKAMU.github.io/NAMA-REPO/`

Catatan: membuka `index.html` dengan klik dua kali tidak akan memuat `faq.csv`. Uji lewat link GitHub Pages.

## Kolom data di Sheet
id, waktu, nama, prodi, status, pertanyaan, jawaban, ditemukan (Ya/Tidak), rating (1-5)
