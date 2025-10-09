// js/order.js (Versi Baru & Stabil)

document.addEventListener('DOMContentLoaded', async () => {
  // --- 1. AMBIL ELEMEN & DATA AWAL ---
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('game_id');
  
  const orderCard = document.querySelector('.order-card');
  const gameTitleElement = document.getElementById('game-title');
  const gameImageElement = document.getElementById('game-image');
  const gameDescriptionElement = document.getElementById('game-description');
  const productGrid = document.getElementById('product-grid');
  const paymentGrid = document.getElementById('payment-grid');
  const totalPriceElement = document.getElementById('total-price');
  const statusMessageElement = document.getElementById('status-message');
  const submitButton = document.getElementById('submit-button');
  const zoneInputGroup = document.getElementById('zone-input-group');
  const zoneIdInput = document.getElementById('zone-id');
  const topUpForm = document.getElementById('top-up-form');
  
  let selectedProduct = null;
  let selectedPayment = null;
  let gameData = null;
  
  // --- 2. FUNGSI UNTUK MERENDER KONTEN ---
  function renderPage(data) {
    gameData = data;
    
    // Render Info Game
    gameTitleElement.textContent = gameData.info.name;
    gameImageElement.src = gameData.info.image;
    gameDescriptionElement.textContent = gameData.info.description;
    
    // Atur Visibilitas Input Zone ID (Kunci Stabilitas)
    if (gameData.info.needs_zone) {
      zoneInputGroup.style.display = 'block';
      zoneIdInput.setAttribute('required', 'required');
    } else {
      zoneInputGroup.style.display = 'none';
      zoneIdInput.removeAttribute('required');
    }
    
    // Render Produk
    productGrid.innerHTML = '';
    gameData.products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.dataset.productId = product.id;
      item.innerHTML = `<h4>${product.amount} ${product.unit}</h4><p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>`;
      item.addEventListener('click', () => handleProductSelection(item, product));
      productGrid.appendChild(item);
    });
    
    // Render Pembayaran
    paymentGrid.innerHTML = '';
    gameData.payments.forEach(payment => {
      const item = document.createElement('div');
      item.className = 'payment-item';
      item.dataset.paymentId = payment.id;
      item.innerHTML = `<img src="${payment.image}" alt="${payment.name}"><p>${payment.name}</p>`;
      item.addEventListener('click', () => handlePaymentSelection(item, payment));
      paymentGrid.appendChild(item);
    });
  }
  
  // --- 3. FUNGSI-FUNGSI PEMBANTU (HANDLER) ---
  function showLoading(isLoading) {
    if (isLoading) {
      orderCard.classList.add('loading');
    } else {
      orderCard.classList.remove('loading');
    }
  }
  
  function showMessage(message, isError = false) {
    statusMessageElement.textContent = message;
    statusMessageElement.style.display = 'block';
    statusMessageElement.style.backgroundColor = isError ? 'var(--danger-color)' : 'rgba(var(--accent-color-rgb), 0.1)';
  }
  
  function handleProductSelection(element, product) {
    document.querySelectorAll('.product-item.selected').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedProduct = product;
    updateTotalPrice();
  }
  
  function handlePaymentSelection(element, payment) {
    document.querySelectorAll('.payment-item.selected').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedPayment = payment;
  }
  
  function updateTotalPrice() {
    totalPriceElement.textContent = selectedProduct ? `Total: Rp ${selectedProduct.price.toLocaleString('id-ID')}` : 'Total: Rp 0';
  }
  
  // --- 4. LOGIKA UTAMA (MAIN LOGIC) ---
  async function initializePage() {
    if (!gameId) {
      orderCard.innerHTML = '<h2 class="error-text">Error: Game ID tidak ditemukan di URL.</h2>';
      return;
    }
    
    showLoading(true);
    const data = await getGameDetails(gameId);
    showLoading(false);
    
    if (data) {
      renderPage(data);
    } else {
      orderCard.innerHTML = `<h2 class="error-text">Game "${gameId}" tidak ditemukan.</h2><a href="main.html" class="back-button-center">Kembali ke Beranda</a>`;
    }
  }
  
  // --- 5. EVENT LISTENER UNTUK FORM SUBMIT ---
  topUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const gameUserId = document.getElementById('game-id').value.trim();
    const zoneIdValue = zoneIdInput.value.trim();
    
    // Validasi
    if (!selectedProduct) { return showMessage('Pilih jumlah produk terlebih dahulu.', true); }
    if (!selectedPayment) { return showMessage('Pilih metode pembayaran terlebih dahulu.', true); }
    if (!gameUserId) { return showMessage('ID Game tidak boleh kosong.', true); }
    if (gameData.info.needs_zone && !zoneIdValue) { return showMessage('ID Zone wajib diisi untuk game ini.', true); }
    
    const orderData = {
      game: gameId,
      game_id: gameUserId,
      zone_id: gameData.info.needs_zone ? zoneIdValue : null,
      product_id: selectedProduct.id,
      price: selectedProduct.price,
      payment_method: selectedPayment.id
    };
    
    submitButton.disabled = true;
    submitButton.textContent = "Memproses...";
    showMessage('Membuat sesi pembayaran, mohon tunggu...', false);
    
    const paymentResult = await createPaymentSession(orderData);
    
    if (paymentResult.success) {
      showMessage('Berhasil! Mengarahkan ke halaman pembayaran...');
      window.location.href = paymentResult.paymentUrl;
    } else {
      showMessage(paymentResult.message || 'Terjadi kesalahan.', true);
      submitButton.disabled = false;
      submitButton.textContent = "Beli Sekarang";
    }
  });
  
  // Panggil fungsi inisialisasi untuk memulai semuanya
  initializePage();
});