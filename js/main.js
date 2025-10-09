// js/main.js (Versi Baru dengan Logika Tab)

document.addEventListener('DOMContentLoaded', () => {
    const categoryNav = document.querySelector('.category-nav');
    const contentContainer = document.getElementById('content-container');
    const categoryButtons = document.querySelectorAll('.category-button');
    
    // Fungsi untuk merender item produk ke dalam grid
    function renderItems(items, gridElement) {
        gridElement.innerHTML = ''; // Kosongkan grid sebelum diisi
        if (!items || items.length === 0) {
            gridElement.innerHTML = '<p class="info-text">Produk untuk kategori ini belum tersedia.</p>';
            return;
        }
        
        items.forEach(item => {
            const itemElement = document.createElement('a');
            // Arahkan ke order.html jika ini adalah game, atau halaman lain jika produk berbeda
            itemElement.href = `order.html?game_id=${item.id}`;
            itemElement.className = 'game-item'; // Kita pakai ulang style game-item
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <h3>${item.name}</h3>
            `;
            gridElement.appendChild(itemElement);
        });
    }
    
    // Fungsi untuk mengaktifkan tab dan memuat konten
    async function switchTab(category) {
        // Hapus kelas 'active' dari semua tombol dan grid
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content-grid').forEach(grid => grid.classList.remove('active'));
        
        // Tambahkan kelas 'active' ke tombol dan grid yang sesuai
        const activeButton = document.querySelector(`.category-button[data-category="${category}"]`);
        const activeGrid = document.getElementById(`${category}-content`);
        
        if (activeButton) activeButton.classList.add('active');
        if (activeGrid) {
            activeGrid.classList.add('active');
            
            // Cek jika grid sudah diisi, jika belum, muat datanya
            if (activeGrid.innerHTML.trim() === '') {
                activeGrid.innerHTML = '<p class="loading-text">Memuat produk...</p>';
                try {
                    const items = await getProductsByCategory(category);
                    renderItems(items, activeGrid);
                } catch (error) {
                    console.error(`Gagal memuat kategori ${category}:`, error);
                    activeGrid.innerHTML = '<p class="error-text">Gagal memuat produk.</p>';
                }
            }
        }
    }
    
    // Tambahkan event listener ke navigasi kategori
    categoryNav.addEventListener('click', (event) => {
        const button = event.target.closest('.category-button');
        if (button) {
            const category = button.dataset.category;
            switchTab(category);
        }
    });
    
    // Muat konten untuk tab default (Top Up Game) saat halaman pertama kali dibuka
    switchTab('topup-game');
});