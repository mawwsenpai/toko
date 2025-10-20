/**
 * js/home.js
 * Logika Halaman Beranda
 */

document.addEventListener('DOMContentLoaded', () => {
    const categoryNav = document.querySelector('.category-nav');
    const categoryButtons = document.querySelectorAll('.category-button');
    
    // Data Simulasi untuk kategori non-game (Di dunia nyata, ini juga dari API)
    const DUMMY_OTHER_PRODUCTS = {
        'pulsa-data': [
            { id: 'pulsa-telkomsel', name: 'Telkomsel', image: 'https://placehold.co/120x120/e53e3e/fff?text=TSEL' },
            { id: 'data-xl', name: 'XL/Axis Data', image: 'https://placehold.co/120x120/4a5568/fff?text=XL' },
            { id: 'pulsa-tri', name: 'Tri', image: 'https://placehold.co/120x120/f6ad55/fff?text=3' }
        ],
        'e-wallet': [
            { id: 'ew-gopay', name: 'GoPay', image: 'https://placehold.co/120x120/00b894/fff?text=GP' },
            { id: 'ew-dana', name: 'DANA', image: 'https://placehold.co/120x120/2d3748/fff?text=DANA' },
        ]
    };
    
    let productCache = {
        'topup-game': null,
        'pulsa-data': null,
        'e-wallet': null,
    };
    
    function renderItems(items, gridElement, category) {
        gridElement.innerHTML = '';
        
        if (!items || items.length === 0) {
            gridElement.innerHTML = '<p class="info-text">Produk untuk kategori ini belum tersedia.</p>';
            return;
        }
        
        items.forEach(item => {
            const itemElement = document.createElement('a');
            const href = category === 'topup-game' ? `order.html?game_id=${item.id}` : '#';
            
            itemElement.href = href;
            itemElement.className = 'game-item';
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <h3>${item.name}</h3>
            `;
            gridElement.appendChild(itemElement);
        });
    }
    
    async function loadContent(category, gridElement) {
        if (productCache[category]) {
            renderItems(productCache[category], gridElement, category);
            return;
        }
        
        gridElement.innerHTML = `
            <div class="skeleton-grid-placeholder">
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
            </div>
        `;
        
        let items = [];
        
        try {
            if (category === 'topup-game') {
                // Panggil Serverless Function Vercel
                const data = await fetchAPI('/api/products', 'GET');
                if (data.success && data.data) {
                    items = data.data;
                } else {
                    throw new Error(data.message || 'Gagal terhubung ke katalog game.');
                }
            } else {
                // Simulasi data dummy
                await new Promise(resolve => setTimeout(resolve, 500));
                items = DUMMY_OTHER_PRODUCTS[category] || [];
            }
            
            productCache[category] = items;
            renderItems(items, gridElement, category);
            
        } catch (error) {
            console.error(`Gagal memuat kategori ${category}:`, error);
            gridElement.innerHTML = `<p class="error-text">❌ Gagal memuat produk. Cek koneksi API Vercel.</p>`;
        }
    }
    
    async function switchTab(category) {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content-grid').forEach(grid => grid.classList.remove('active'));
        
        const activeButton = document.querySelector(`.category-button[data-category="${category}"]`);
        const activeGrid = document.getElementById(`${category}-content`);
        
        if (activeButton) activeButton.classList.add('active');
        
        if (activeGrid) {
            activeGrid.classList.add('active');
            await loadContent(category, activeGrid);
        }
    }
    
    categoryNav.addEventListener('click', (event) => {
        const button = event.target.closest('.category-button');
        if (button) {
            const category = button.dataset.category;
            switchTab(category);
        }
    });
    
    // Inisialisasi: Muat tab default saat halaman pertama kali dibuka
    switchTab('topup-game');
});