# InfoMitra Group

Repository ini berisi snapshot project perkuliahan/kelompok InfoMitra dengan backend Express/PostgreSQL dan frontend React. Audit menemukan hubungan content yang sangat dekat dengan `InfoMitra-Company`; karena itu copy ini lebih tepat diperlakukan sebagai kandidat konsolidasi, bukan project portfolio yang berdiri sendiri.

## Isi Repository

- backend untuk autentikasi, komentar, brosur, harga iklan, dan upload;
- frontend React untuk halaman publik, pengguna, dan admin;
- skema SQL dan konfigurasi deployment.

## Menjalankan Secara Lokal

Salin `.env.example` pada backend dan frontend menjadi `.env`, gunakan credential lokal, lalu jalankan:

```bash
cd InfoMitra-Backend
npm install
npm run dev
```

```bash
cd InfoMitra-Frontend
npm install
npm run dev
```

Unit test backend mencakup penolakan file upload yang menyamar sebagai gambar. Build frontend dan alur database tetap perlu diverifikasi terpisah.

## Catatan Keamanan

Jangan commit `.env` atau `node_modules`. Credential yang pernah ter-track perlu dirotasi walaupun file tersebut kemudian dihapus dari branch kerja, karena nilainya masih ada dalam history Git lama. Current tree memerlukan runtime secret, memakai verifikasi TLS production, membatasi autentikasi, memvalidasi signature upload, dan membentuk URL upload dari `PUBLIC_BASE_URL` yang dikonfigurasi.

## Status Project

Snapshot historis/kandidat archive atau merge. `InfoMitra-Company` direkomendasikan sebagai canonical karena mempunyai history lebih baru dan konfigurasi deployment yang lebih lengkap. Current tree snapshot ini sudah dimitigasi, tetapi rotasi credential dan sanitasi history tetap wajib sebelum publikasi ulang.
