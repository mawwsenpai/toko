<p align="center">
  <img src="https://placehold.co/800x250/0d1117/79c0ff?text=VocherGames&fontsize=120" alt="VocherGames Banner"/>
</p>

<h1 align="center">🎮 VocherGames Project</h1>

<p align="center">
  Sebuah ekosistem E-Commerce mandiri untuk produk digital game, <br>
  dirancang untuk berjalan <strong>sepenuhnya otomatis</strong> dengan <strong>biaya nol</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Aktif-brightgreen?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/Lisensi-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Versi-1.0-informational?style=flat-square" alt="Version">
</p>

<p align="center">
  · · ·
</p>

## **Filosofi Proyek**

> Proyek ini lahir dari ide sederhana: **"Uang Pembeli Sebagai Modal."** Sistem ini tidak memerlukan stok produk atau modal operasional yang besar. Semuanya diproses secara *real-time*, menjadikan bisnis digital lebih aksesibel bagi siapa saja.

<br>

## **Fitur Unggulan**

| Ikon | Fitur                  | Deskripsi Singkat                                                                                             |
| :--: | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
|  🎨  | **UI Adaptif & Estetik** | Ganti tema dan font secara instan. Dengan 20+ tema (Neon, Cyberpunk) dan 200+ font, UI bisa disesuaikan sesuka hati. |
|  ⚡  | **Otomatisasi Penuh 24/7** | Dari pembayaran hingga pengiriman produk, semua berjalan otomatis. Biarkan kode yang bekerja untukmu.       |
|  🧠  | **Formulir Cerdas** | Formulir pemesanan yang dinamis hanya menampilkan input yang dibutuhkan (seperti ID/Zone), menciptakan UX yang mulus.   |

<br>

## **Arsitektur Teknologi**

<table align="center" width="100%">
  <tr align="center">
    <td>
      <h3>Frontend</h3>
      <p>HTML5, CSS Variables, dan Vanilla JavaScript untuk UI yang ringan, cepat, dan sangat mudah dikustomisasi. Dihosting di <strong>GitHub Pages</strong>.</p>
    </td>
    <td>
      <h3>Backend</h3>
      <p>Ditenagai oleh <strong>Node.js (Express/Koa)</strong> untuk menangani logika bisnis dan API. Dijalankan secara efisien di <strong>Heroku</strong> atau <strong>Google Cloud Run</strong>.</p>
    </td>
    <td>
      <h3>Integrasi</h3>
      <p>Menggunakan payment gateway seperti <strong>Duitku</strong> atau <strong>Midtrans</strong> untuk memproses transaksi dengan aman dan otomatis.</p>
    </td>
  </tr>
</table>

<p align="center">
  · · ·
</p>

## **Panduan Peluncuran Cepat**

Siapkan tokomu dalam dua langkah utama.

### **1. Konfigurasi Sisi Server (Backend)**
* **Dapatkan Kunci API**: Daftar di payment gateway pilihanmu (misal: Duitku) untuk mendapatkan `Merchant Code` & `API Key`.
* **Deploy Server**: Unggah kode backend ke Heroku.
* **Simpan Kunci dengan Aman**: Masukkan `API Key` dan kredensial lainnya ke dalam **Config Vars** di pengaturan Heroku. ⚠️ **Jangan pernah taruh kunci rahasia di dalam kode!**

### **2. Publikasi Sisi Klien (Frontend)**
* **Clone Repositori**: Ambil semua file frontend dari repositori Git.
* **Hubungkan ke Server**: Edit file `js/pay.js` dan arahkan URL API ke alamat aplikasi Heroku-mu.
* **Go Live**: Unggah semua file ke repositori GitHub dan aktifkan **GitHub Pages**. Tokomu kini online!

<br>

## **Mari Berkontribusi**

Proyek ini bersifat *open source*. Jika kamu punya ide untuk membuatnya lebih baik, silakan buka **Issue** untuk berdiskusi atau kirimkan **Pull Request** dengan perbaikanmu. Setiap kontribusi sangat berarti.

<p align="center">
  · · ·
</p>

<p align="center">
  Dibuat dengan semangat oleh <strong>MawwSenpai_</strong>
</p>