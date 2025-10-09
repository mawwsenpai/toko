// js/setting.js
// KODE INI SUDAH FINAL DAN UTUH.

// --- 1. DATA MASTER PILIHAN ---
const FONT_FAMILY_OPTIONS = [
  { value: 'poppins', label: 'Poppins (Default)', css: "'Poppins', sans-serif" },
  { value: 'roboto', label: 'Roboto', css: "'Roboto', sans-serif" },
  { value: 'opensans', label: 'Open Sans', css: "'Open Sans', sans-serif" },
  { value: 'oswald', label: 'Oswald', css: "'Oswald', sans-serif'" },
  { value: 'arial', label: 'Arial', css: 'Arial, sans-serif' },
  { value: 'georgia', label: 'Georgia', css: 'Georgia, serif' },
];

const FONT_SIZE_LIST = [
  { index: 0, label: 'Super Kecil (0.7x)', multiplier: 0.7 },
  { index: 1, label: 'Ekstra Kecil (0.8x)', multiplier: 0.8 },
  { index: 2, label: 'Kecil (0.9x)', multiplier: 0.9 },
  { index: 3, label: 'Default (1.0x)', multiplier: 1.0 },
  { index: 4, label: 'Besar (1.1x)', multiplier: 1.1 },
  { index: 5, label: 'Ekstra Besar (1.2x)', multiplier: 1.2 },
  { index: 6, label: 'Sangat Besar (1.3x)', multiplier: 1.3 },
  { index: 7, label: 'Jumbo (1.4x)', multiplier: 1.4 },
  { index: 8, label: 'Maksimal (1.5x)', multiplier: 1.5 },
];

const THEME_OPTIONS = [
  { value: 'neon-biru', label: 'Neon Biru (Default)' }, { value: 'air', label: 'Air' },
  { value: 'buku', label: 'Buku' }, { value: 'gelap', label: 'Gelap' },
  { value: 'coklat', label: 'Coklat' }, { value: 'google-pixel', label: 'Google Pixel' },
  { value: 'matrix', label: 'Matrix' }, { value: 'senja', label: 'Senja' },
  { value: 'cyberpunk', label: 'Cyberpunk' }, { value: 'laut-dalam', label: 'Laut Dalam' },
  { value: 'retro', label: 'Retro' }, { value: 'neon-merah', label: 'Neon Merah' },
  { value: 'neon-putih', label: 'Neon Putih' }, { value: 'neon-ungu', label: 'Neon Ungu' },
  { value: 'neon-google', label: 'Neon Google' }, { value: 'buku-klasik', label: 'Buku Klasik' },
  { value: 'novel', label: 'Novel' }, { value: 'kertas', label: 'Kertas' },
  { value: 'karbon', label: 'Karbon' }, { value: 'langit', label: 'Langit' },
  { value: 'malam-kota', label: 'Malam Kota' }, { value: 'hutan-senyap', label: 'Hutan Senyap' },
];

const ANIMATION_OPTIONS = [
  { value: 'none', label: 'Tidak Ada (Default)' },
  { value: 'subtle-gradient', label: 'Gradien Halus' },
  { value: 'blinking-stars', label: 'Bintang Berkedip' },
];


// --- FUNGSI UTAMA UNTUK FONT FAMILY ---
function saveAndApplyFontFamily(fontValue, cssValue) {
  document.documentElement.style.setProperty('--font-main', cssValue);
  localStorage.setItem('vochergames-font-family', fontValue);
  localStorage.setItem('vochergames-font-css', cssValue);
}

// ----------------------------------------------------------------------
// --- LOGIC FONT SIZE SLIDER (Ukuran Teks) ---
// ----------------------------------------------------------------------
function handleTextSizeSlider() {
  const sizeRange = document.getElementById('text-size-range');
  const currentSizeName = document.getElementById('current-size-name');
  
  const savedSizeIndex = parseInt(localStorage.getItem('vochergames-size-index')) || 3;
  
  sizeRange.max = FONT_SIZE_LIST.length - 1;
  sizeRange.value = savedSizeIndex;
  applyTextSize(sizeRange.value);
  
  sizeRange.addEventListener('input', () => { applyTextSize(sizeRange.value); });
  sizeRange.addEventListener('change', () => { localStorage.setItem('vochergames-size-index', sizeRange.value); });
  
  function applyTextSize(index) {
    const idx = parseInt(index);
    const sizeData = FONT_SIZE_LIST.find(item => item.index === idx);
    if (!sizeData) return;
    
    document.documentElement.style.setProperty('--font-size-base', `${sizeData.multiplier}rem`);
    currentSizeName.textContent = sizeData.label;
  }
}


// ----------------------------------------------------------------------
// --- LOGIC RENDER OPTIONS (Tema, Animasi, Font Family) ---
// ----------------------------------------------------------------------

function renderOptions(settingKey, optionsArray, applyFunction) {
  const container = document.querySelector(`[data-setting-name="${settingKey}"]`);
  if (!container) return;
  
  const savedValue = localStorage.getItem(`vochergames-${settingKey}`);
  const defaultValue = optionsArray[0].value;
  
  optionsArray.forEach(option => {
    const isChecked = option.value === (savedValue || defaultValue);
    const cssValue = option.css || '';
    
    const label = document.createElement('label');
    if (settingKey === 'font-family') { label.style.fontFamily = cssValue; }
    
    label.innerHTML = `
            <input type="radio" name="${settingKey}" value="${option.value}" data-css-value="${cssValue}" ${isChecked ? 'checked' : ''}> 
            ${option.label}
        `;
    
    if (isChecked) {
      label.classList.add('checked');
      if (settingKey === 'font-family' && cssValue) {
        document.documentElement.style.setProperty('--font-main', cssValue);
      }
    }
    container.appendChild(label);
  });
  
  // Event Listener Stabil (Mencegah Error 'applyFunction is not a function')
  container.addEventListener('click', (event) => {
    const targetInput = event.target.closest('input[type="radio"]');
    if (targetInput) {
      const value = targetInput.value;
      
      container.querySelectorAll('label').forEach(l => l.classList.remove('checked'));
      targetInput.parentNode.classList.add('checked');
      
      // Panggil fungsi sesuai kunci, memastikan fungsi global sudah ada
      if (settingKey === 'font-family') {
        const cssValue = targetInput.getAttribute('data-css-value');
        saveAndApplyFontFamily(value, cssValue);
      } else if (settingKey === 'theme' && typeof window.saveAndApplyTheme === 'function') {
        window.saveAndApplyTheme(value);
      } else if (settingKey === 'animation' && typeof window.saveAndApplyAnimation === 'function') {
        window.saveAndApplyAnimation(value);
      }
    }
  });
}


// ----------------------------------------------------------------------
// --- INITIALIZATION FINAL ---
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Panggil logika untuk Font Size (Slider)
  handleTextSizeSlider();
  
  // 2. Panggil logika untuk Font Family
  renderOptions('font-family', FONT_FAMILY_OPTIONS);
  
  // 3. Panggil logika untuk Tema dan Animation
  // Kita lewati fungsi global window.func, PENTING: Pengecekan ada di dalam renderOptions
  renderOptions('theme', THEME_OPTIONS, null);
  renderOptions('animation', ANIMATION_OPTIONS, null);
});