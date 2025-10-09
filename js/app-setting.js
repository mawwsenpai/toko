// js/app-settings.js
// VERSI DEBUG & PALING STABIL

(function() {
    'use strict';
    console.log("app-settings.js: Script mulai dimuat.");
    
    // =====================================================================
    // BAGIAN 1: LOADER (Berjalan secepat mungkin)
    // =====================================================================
    try {
        const savedTheme = localStorage.getItem('vochergames-theme') || 'neon-biru';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const savedFont = localStorage.getItem('vochergames-font-css') || "'Poppins', sans-serif";
        document.documentElement.style.setProperty('--font-main', savedFont);
        
        console.log(`app-settings.js: Tema awal '${savedTheme}' dan Font '${savedFont}' berhasil diterapkan.`);
    } catch (e) {
        console.error("app-settings.js: Gagal saat menerapkan tema awal!", e);
    }
    
    
    // =====================================================================
    // BAGIAN 2: LOGIKA INTERAKTIF (Hanya untuk halaman setting.html)
    // =====================================================================
    function initializeInteractiveSettings() {
        const settingsPanel = document.querySelector('.settings-panel');
        if (!settingsPanel) {
            // Jika ini bukan halaman setting, tidak ada yang perlu dilakukan lagi.
            return;
        }
        
        console.log("app-settings.js: Halaman Pengaturan terdeteksi. Memulai inisialisasi interaktif...");
        
        // Ambil semua elemen kontrol
        const themeRadios = settingsPanel.querySelectorAll('input[name="theme"]');
        const fontRadios = settingsPanel.querySelectorAll('input[name="font-family"]');
        const animationRadios = settingsPanel.querySelectorAll('input[name="animation"]');
        // Tambahkan elemen lain jika ada (contoh: slider)
        
        // --- Atur Nilai Awal dari localStorage ---
        try {
            const currentTheme = localStorage.getItem('vochergames-theme') || 'neon-biru';
            themeRadios.forEach(radio => {
                if (radio.value === currentTheme) radio.checked = true;
            });
            
            const currentFontCss = localStorage.getItem('vochergames-font-css') || "'Poppins', sans-serif";
            fontRadios.forEach(radio => {
                if (radio.dataset.css === currentFontCss) radio.checked = true;
            });
            
            console.log("app-settings.js: Nilai awal input berhasil diatur.");
            
        } catch (e) {
            console.error("app-settings.js: Gagal mengatur nilai awal input!", e);
        }
        
        // --- Tambahkan Event Listener ---
        settingsPanel.addEventListener('change', function(event) {
            const target = event.target;
            
            if (target.type !== 'radio') return;
            
            // Log untuk debugging
            console.log(`app-settings.js: Tombol '${target.name}' dengan nilai '${target.value}' diubah.`);
            
            switch (target.name) {
                case 'theme':
                    document.documentElement.setAttribute('data-theme', target.value);
                    localStorage.setItem('vochergames-theme', target.value);
                    break;
                case 'font-family':
                    const fontCss = target.dataset.css;
                    if (fontCss) {
                        document.documentElement.style.setProperty('--font-main', fontCss);
                        localStorage.setItem('vochergames-font-css', fontCss);
                    }
                    break;
                case 'animation':
                    const animatedBg = document.getElementById('animated-bg');
                    if (animatedBg) animatedBg.setAttribute('data-animation', target.value);
                    localStorage.setItem('vochergames-animation', target.value);
                    break;
            }
        });
        
        console.log("app-settings.js: Event listener berhasil ditambahkan ke panel pengaturan.");
    }
    
    // Jalankan fungsi interaktif setelah halaman selesai dimuat
    document.addEventListener('DOMContentLoaded', initializeInteractiveSettings);
    
})();