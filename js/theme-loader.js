// js/theme-loader.js
// Script ini HARUS DITARUH PALING ATAS DI <head> SEMUA HALAMAN!

(function() {
  const defaultTheme = 'neon-biru';
  const defaultAnimation = 'none';
  const htmlElement = document.documentElement; // Ambil elemen <html>
  
  // 1. Ambil pengaturan dari Local Storage
  const savedTheme = localStorage.getItem('vochergames-theme') || defaultTheme;
  const savedAnimation = localStorage.getItem('vochergames-animation') || defaultAnimation;
  
  // 2. Terapkan tema ke tag <html> SEBELUM CSS dimuat
  // Ini adalah KUNCI STABILITAS
  htmlElement.setAttribute('data-theme', savedTheme);
  
  // 3. Simpan setting animasi untuk dimuat oleh DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const animatedBg = document.getElementById('animated-bg');
    if (animatedBg) {
      animatedBg.setAttribute('data-animation', savedAnimation);
    }
  });
})();

// Fungsi global untuk digunakan oleh setting.js
window.saveAndApplyTheme = function(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('vochergames-theme', themeName);
};

window.saveAndApplyAnimation = function(animName) {
  const animatedBg = document.getElementById('animated-bg');
  if (animatedBg) {
    animatedBg.setAttribute('data-animation', animName);
  }
  localStorage.setItem('vochergames-animation', animName);
};