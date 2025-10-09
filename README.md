# TOKO ONLINE 

🎮 VocherGames - Toko Top-Up Game Otomatis (MawwSenpai_ Project)
!(https://placehold.co/1000x200/000a1a/0099ff?text=VOCHER+GAMES+%7C+Automatic+Gaming+Top-Up+Solution)

Sebuah proyek e-commerce mandiri yang dibangun untuk mengotomatisasi penjualan produk digital game. Proyek ini didasarkan pada konsep "Uang Pembeli Sebagai Modal" dan memanfaatkan hosting gratis (GitHub Pages).

✨ Fitur Kunci & Aesthetic UI
Tema Kustom Dinamis: Menggunakan CSS Variables untuk 20+ tema aesthetic (Neon, Cyberpunk, dll.) yang dapat diganti real-time dari halaman setting.html.

Font Global & UI: Kontrol penuh atas Jenis Font (200+ Pilihan) dan Ukuran Teks Global melalui slider yang akurat.

Order Otomatis: Integrasi dengan Backend (Heroku/GCP) untuk memproses pembayaran dan pengiriman produk 24/7.

Formulir Stabil: Form pemesanan (order.html) bersifat dinamis, hanya menampilkan input yang diperlukan (ID Zone) sesuai dengan game.

🛠️ Tumpukan Teknologi (The Stack)
Proyek ini dirancang dengan fokus pada biaya rendah dan otomatisasi penuh.

Komponen	Teknologi	Tujuan
Frontend (Tampilan)	HTML5, CSS Variables	Hosting Gratis di GitHub Pages (Estetika UI).
Backend (Server)	Node.js (Express/Koa)	Dihosting di Heroku (Paket Gratis) atau Google Cloud Run.
Pembayaran/API	Duitku / Midtrans	Memproses transaksi dan mengirim product.
🚀 Panduan Instalasi & Deployment
Untuk menjalankan shop ini, kamu perlu menyatukan Frontend dan Backend melalui kunci API.

1. Kunci API & Setup Backend
Dapatkan Kunci: Daftar ke Duitku atau Payment Gateway lain untuk mendapatkan Merchant Code dan API Key.

Siapkan Server: Deploy kode Node.js backend kamu ke Heroku.

Config Vars: Simpan kunci rahasiamu (DUITKU_API_KEY, dll.) di Config Vars Heroku (JANGAN di kode!).

2. Deployment Frontend (GitHub Pages)
Clone Repositori: Dapatkan semua file proyekmu dari GitHub.

Hubungkan Script: Pastikan URL Backend Heroku-mu sudah diperbarui di file js/pay.js.

Aktifkan Pages: Unggah ke GitHub dan aktifkan GitHub Pages dari pengaturan repositori.

📂 Struktur Proyek
/VocherGames/
├── main.html                 # Halaman utama (Pilihan Game)
├── order.html                # Formulir Pemesanan (Dinamis)
├── setting.html              # Pengaturan Tema & Font
├── style.css                 # Styling Utama (Layout)
├── theme.css                 # Variabel CSS KHUSUS (Warna & Tema)
└── /js/
    ├── theme-loader.js       # Script Kritis untuk Stabilitas Tema
    ├── order.js              # Logic Validasi & Komunikasi
    └── pay.js                # Jembatan API ke Backend Heroku
🤝 Kontribusi
Jika kamu ingin berkontribusi pada fitur baru atau perbaikan, silakan buat Pull Request (PR)!

Dibuat dengan semangat open source oleh MawwSenpai_