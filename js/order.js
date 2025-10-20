
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('game_id');
  
  const orderForm = document.getElementById('orderForm');
  const productGrid = document.getElementById('product-grid');
  const gameTitleElement = document.getElementById('game-title');
  const guideElement = document.getElementById('guide-text');
  const priceDisplay = document.getElementById('total-price-display');
  const submitButton = document.getElementById('submit-order-button');
  
  let selectedProductId = null;
  let selectedPrice = 0;
  
  if (!gameId) {
    gameTitleElement.textContent = '❌ Game Tidak Ditemukan';
    return;
  }
  
  // Fungsi untuk memuat data produk
  async function loadProductDetails() {
    gameTitleElement.textContent = 'Loading...';
    productGrid.innerHTML = '<p class="info-text">Memuat produk...</p>';
    
    try {
      // Panggilan API VERCEL untuk detail game
      const data = await fetchAPI(`/api/games/${gameId}`, 'GET');
      
      if (data.success && data.data) {
        const gameData = data.data;
        gameTitleElement.textContent = gameData.game_name;
        guideElement.textContent = gameData.guide;
        
        productGrid.innerHTML = '';
        gameData.products.forEach(product => {
          const item = document.createElement('div');
          item.className = 'product-item';
          item.dataset.id = product.id;
          item.dataset.price = product.price;
          
          const formattedPrice = `Rp ${product.price.toLocaleString('id-ID')}`;
          
          item.innerHTML = `
                        <p class="amount">${product.amount} ${gameData.game_unit}</p>
                        <p class="price">${formattedPrice}</p>
                    `;
          productGrid.appendChild(item);
        });
        
        document.querySelectorAll('.product-item').forEach(item => {
          item.addEventListener('click', () => {
            document.querySelectorAll('.product-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedProductId = item.dataset.id;
            selectedPrice = parseInt(item.dataset.price);
            priceDisplay.textContent = `Total: Rp ${selectedPrice.toLocaleString('id-ID')}`;
            submitButton.disabled = false;
          });
        });
        
      } else {
        gameTitleElement.textContent = `❌ Gagal: ${data.message}`;
      }
      
    } catch (error) {
      gameTitleElement.textContent = '❌ Koneksi Server Gagal';
      productGrid.innerHTML = `<p class="error-text">Terjadi kesalahan koneksi ke backend Vercel.</p>`;
    }
  }
  
  // Fungsi Submit Form (Membuat Transaksi)
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!selectedProductId) {
      alert('Pilih nominal top-up terlebih dahulu!');
      return;
    }
    
    submitButton.disabled = true;
    submitButton.textContent = 'Memproses Pesanan...';
    
    const orderData = {
      userId: document.getElementById('user-id').value,
      zoneId: document.getElementById('zone-id').value,
      productId: selectedProductId,
      paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
      price: selectedPrice
    };
    
    try {
      // Panggilan API VERCEL untuk membuat transaksi
      const response = await fetchAPI('/api/create-transaction', 'POST', orderData);
      
      if (response.success) {
        // Berhasil membuat invoice. Arahkan ke halaman status/pembayaran
        alert('Pesanan berhasil dibuat! Segera lakukan pembayaran.');
        // Mengarahkan ke halaman status dengan membawa ID Transaksi
        window.location.href = `status.html?id=${response.transaction_id}`;
      } else {
        alert(`Gagal: ${response.message}`);
        submitButton.textContent = 'Pesan Sekarang';
        submitButton.disabled = false;
      }
      
    } catch (error) {
      alert('Terjadi kesalahan saat membuat transaksi. Coba lagi.');
      submitButton.textContent = 'Pesan Sekarang';
      submitButton.disabled = false;
    }
  });
  
  loadProductDetails();
});