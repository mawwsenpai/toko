document.addEventListener('DOMContentLoaded', () => {
  const checkForm = document.getElementById('checkForm');
  const statusResultDiv = document.getElementById('status-result');
  const urlParams = new URLSearchParams(window.location.search);
  const initialId = urlParams.get('id');
  
  // Jika ada ID di URL (dari order.js), langsung eksekusi pencarian
  if (initialId) {
    document.getElementById('transaction-id').value = initialId;
    checkStatus(initialId);
  }
  
  checkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const transactionId = document.getElementById('transaction-id').value.trim();
    if (transactionId) {
      checkStatus(transactionId);
    } else {
      statusResultDiv.innerHTML = '<p class="error-text">Masukkan ID Transaksi!</p>';
    }
  });
  
  async function checkStatus(transactionId) {
    statusResultDiv.innerHTML = '<p class="info-text">Mengecek status...</p>';
    const checkButton = document.querySelector('#checkForm button');
    checkButton.disabled = true;
    
    try {
      // Panggilan API VERCEL untuk cek status
      const response = await fetchAPI('/api/check-status', 'POST', { searchQuery: transactionId });
      
      if (response.success && response.transaction) {
        const tx = response.transaction;
        const statusClass = tx.status === 'SUCCESS' ? 'status-success' :
          tx.status === 'PENDING' ? 'status-pending' : 'status-failed';
        
        statusResultDiv.innerHTML = `
                    <div class="card ${statusClass}">
                        <h3 class="status-title">STATUS: ${tx.status}</h3>
                        <p><strong>ID Transaksi:</strong> ${tx.transaction_id}</p>
                        <p><strong>Game:</strong> ${tx.game_name} (${tx.game_user_id})</p>
                        <p><strong>Produk:</strong> ${tx.product_amount} ${tx.product_unit}</p>
                        <p><strong>Total Bayar:</strong> Rp ${tx.total_paid.toLocaleString('id-ID')}</p>
                        <p><strong>Waktu:</strong> ${new Date(tx.timestamp).toLocaleString('id-ID')}</p>
                        <hr>
                        <p class="guide-text">${tx.status === 'PENDING' ? 'Silakan lanjutkan pembayaran Anda.' : tx.status === 'SUCCESS' ? 'Diamond/Pulsa sudah masuk ke akun Anda.' : 'Silakan hubungi CS untuk bantuan.'}</p>
                    </div>
                `;
      } else {
        statusResultDiv.innerHTML = `<p class="error-text">❌ ${response.message || 'Transaksi tidak ditemukan.'}</p>`;
      }
    } catch (error) {
      statusResultDiv.innerHTML = '<p class="error-text">❌ Gagal terhubung ke backend Vercel. Cek koneksi internet Anda.</p>';
    }
    
    checkButton.disabled = false;
  }
});