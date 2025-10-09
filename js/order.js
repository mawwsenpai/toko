// js/order.js
// Mengurus semua logika interaksi dan pengumpulan data di halaman pemesanan (order.html).

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Ambil ID Game dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('game_id');
  
  // 2. Ambil elemen HTML
  const orderForm = document.getElementById('top-up-form');
  const gameTitleElement = document.getElementById('game-title');
  const gameImageElement = document.getElementById('game-image');
  const productGrid = document.getElementById('product-grid');
  const paymentGrid = document.getElementById('payment-grid');
  const totalPriceElement = document.getElementById('total-price');
  const statusMessageElement = document.getElementById('status-message');
  const submitButton = document.getElementById('submit-button');
  const gameDescriptionElement = document.getElementById('game-description');
  
  // Elemen Dinamis
  const zoneInputGroup = document.getElementById('zone-input-group');
  const zoneIdInput = document.getElementById('zone-id');
  
  
  // 3. Variabel Status
  let selectedProduct = null;
  let selectedPayment = null;
  
  // --- DATA SIMULASI (Nanti diganti dengan API Heroku / Duitku) ---
  // Tambahkan properti 'needs_zone' untuk stabilisasi
  const DUMMY_PRODUCTS_BY_GAME = {
    'ml': {
      info: { name: 'Mobile Legends', image: 'https://placehold.co/100x100/0000FF/FFFFFF/png?text=ML', description: 'Top up Diamond Mobile Legends termurah!', needs_zone: true },
      products: [{ id: 'ml-100', amount: 86, price: 10000 }, { id: 'ml-200', amount: 172, price: 20000 }, { id: 'ml-300', amount: 344, price: 40000 }]
    },
    'pubg': {
      info: { name: 'PUBG Mobile', image: 'https://placehold.co/100x100/FF0000/FFFFFF/png?text=PUBG', description: 'Top up UC PUBG Mobile terpercaya!', needs_zone: false },
      products: [{ id: 'pubg-1', amount: 60, price: 10000 }, { id: 'pubg-2', amount: 120, price: 20000 }]
    }
  };
  
  const DUMMY_PAYMENTS = [
    { id: 'gopay', name: 'GoPay', image: 'https://placehold.co/60x60/FF9D00?text=GoPay' },
    { id: 'ovo', name: 'OVO', image: 'https://placehold.co/60x60/4C2F92?text=OVO' },
    { id: 'qris', name: 'QRIS', image: 'https://placehold.co/60x60/007BFF?text=QRIS' }
  ];
  // ------------------------------------------------------------------
  
  const gameData = DUMMY_PRODUCTS_BY_GAME[gameId];
  
  if (!gameData) {
    gameTitleElement.textContent = 'GAME TIDAK DITEMUKAN';
    statusMessageElement.textContent = 'Game yang Anda cari tidak tersedia.';
    statusMessageElement.style.display = 'block';
    return;
  }
  
  // 4. Tampilkan informasi game & ATUR VISIBILITAS ZONE INPUT (Kunci Stabil)
  gameTitleElement.textContent = gameData.info.name;
  gameImageElement.src = gameData.info.image;
  gameDescriptionElement.textContent = gameData.info.description;
  
  if (gameData.info.needs_zone) {
    zoneInputGroup.style.display = 'block';
    zoneIdInput.setAttribute('required', 'required'); // Wajib diisi jika perlu
  } else {
    zoneInputGroup.style.display = 'none';
    zoneIdInput.removeAttribute('required'); // Tidak wajib diisi jika tidak perlu
  }
  
  
  // 5. Tampilkan produk
  gameData.products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.dataset.productId = product.id;
    item.innerHTML = `<h4>${product.amount} Diamond</h4><p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>`;
    
    item.addEventListener('click', () => {
      document.querySelectorAll('.product-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
      selectedProduct = product;
      updateTotalPrice();
    });
    productGrid.appendChild(item);
  });
  
  // 6. Tampilkan metode pembayaran
  DUMMY_PAYMENTS.forEach(payment => {
    const item = document.createElement('div');
    item.className = 'payment-item';
    item.dataset.paymentId = payment.id;
    item.innerHTML = `<img src="${payment.image}" alt="${payment.name}"><p>${payment.name}</p>`;
    
    item.addEventListener('click', () => {
      document.querySelectorAll('.payment-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
      selectedPayment = payment;
    });
    paymentGrid.appendChild(item);
  });
  
  // 7. Fungsi untuk update total harga
  function updateTotalPrice() {
    if (selectedProduct) {
      totalPriceElement.textContent = `Total: Rp ${selectedProduct.price.toLocaleString('id-ID')}`;
    } else {
      totalPriceElement.textContent = `Total: Rp 0`;
    }
  }
  
  // 8. Handle form submission (Logika Otomatisasi)
  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // VALIDASI AWAL
    if (!selectedProduct || !selectedPayment) {
      statusMessageElement.textContent = 'Silakan pilih jumlah dan metode pembayaran.';
      statusMessageElement.style.display = 'block';
      return;
    }
    
    const gameIdValue = document.getElementById('game-id').value.trim();
    let zoneIdValue = document.getElementById('zone-id').value.trim();
    
    // VALIDASI ID GAME
    if (!gameIdValue) {
      statusMessageElement.textContent = 'ID Game tidak boleh kosong.';
      statusMessageElement.style.display = 'block';
      return;
    }
    
    // VALIDASI DINAMIS ID ZONE (KUNCI STABIL)
    if (gameData.info.needs_zone && !zoneIdValue) {
      statusMessageElement.textContent = 'Game ini memerlukan ID Zone. Mohon diisi.';
      statusMessageElement.style.display = 'block';
      return;
    }
    
    // JIKA TIDAK BUTUH ZONE, PASTIKAN NILAI KOSONG UNTUK BACKEND
    if (!gameData.info.needs_zone) {
      zoneIdValue = '';
    }
    
    // SIAPKAN DATA PESANAN
    const orderData = {
      game: gameId,
      game_id: gameIdValue,
      zone_id: zoneIdValue,
      product_id: selectedProduct.id,
      price: selectedProduct.price,
      payment_method: selectedPayment.id
    };
    
    submitButton.disabled = true;
    statusMessageElement.textContent = 'Memproses pesanan Anda. Mohon tunggu...';
    statusMessageElement.style.display = 'block';
    
    // Panggil fungsi dari js/pay.js (Komunikasi ke Heroku)
    const paymentResult = await createPaymentSession(orderData);
    
    if (paymentResult.success) {
      statusMessageElement.textContent = 'Sesi pembayaran berhasil dibuat. Mengarahkan ke Payment Gateway...';
      window.location.href = paymentResult.paymentUrl; // Redirect ke Duitku
    } else {
      statusMessageElement.textContent = `Error: ${paymentResult.message || 'Terjadi kesalahan tidak dikenal.'}`;
      submitButton.disabled = false; // Aktifkan lagi tombol jika gagal
    }
  });
});