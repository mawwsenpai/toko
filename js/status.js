// js/status.js
// Mengurus logika untuk mengecek status transaksi dan menampilkan analisis.

document.addEventListener('DOMContentLoaded', () => {
  const statusForm = document.getElementById('status-form');
  const searchInput = document.getElementById('search-input');
  const checkButton = document.getElementById('check-button');
  const resultSection = document.getElementById('result-section');
  const statusDetails = document.getElementById('status-details');
  const infoMessageElement = document.getElementById('info-message');
  
  // GANTI INI DENGAN URL API HEROKU KAMU YANG ASLI!
  const HEROKU_API_URL = "https://nama-aplikasi-heroku-kamu.herokuapp.com";
  
  // Fungsi untuk menampilkan pesan info/error
  function showMessage(message, type = 'info') {
    infoMessageElement.style.display = 'block';
    infoMessageElement.textContent = message;
    
    // Sesuaikan gaya berdasarkan tipe pesan (error atau info)
    if (type === 'error') {
      infoMessageElement.style.backgroundColor = 'var(--danger-color)';
      infoMessageElement.style.color = 'var(--accent-text)';
      infoMessageElement.style.border = '1px solid var(--danger-color)';
    } else {
      infoMessageElement.style.backgroundColor = 'rgba(var(--accent-color-rgb), 0.1)';
      infoMessageElement.style.color = 'var(--text-primary)';
      infoMessageElement.style.border = '1px solid var(--border-color)';
    }
  }
  
  // Fungsi utama untuk mengirim permintaan status
  statusForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const searchValue = searchInput.value.trim();
    if (!searchValue) {
      showMessage("Mohon masukkan ID Transaksi atau Nama Pembeli.", 'error');
      return;
    }
    
    resultSection.style.display = 'none';
    statusDetails.innerHTML = '';
    checkButton.disabled = true;
    showMessage("Mencari data transaksi Anda...", 'info');
    
    try {
      // Kita kirim input ke backend Heroku
      const response = await fetch(`${HEROKU_API_URL}/check-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery: searchValue }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Tampilkan pesan sukses dan detail
        showMessage("Data Transaksi berhasil ditemukan!", 'info');
        displayStatusDetails(data.transaction, data.analysis);
      } else {
        showMessage(data.message || "Data tidak ditemukan. Mohon cek kembali input Anda.", 'error');
      }
      
    } catch (error) {
      console.error('Error saat cek status:', error);
      showMessage("Koneksi ke server gagal. Cek kembali URL Heroku-mu.", 'error');
    } finally {
      checkButton.disabled = false;
    }
  });
  
  // Fungsi untuk menampilkan hasil yang detail dan rapi
  function displayStatusDetails(transaction, analysis) {
    let statusClass = '';
    if (transaction.status === 'SUCCESS') {
      statusClass = 'status-success';
    } else if (transaction.status === 'PENDING') {
      statusClass = 'status-pending';
    } else {
      statusClass = 'status-failed';
    }
    
    const detailsHTML = `
            <div class="status-card">
                <p><strong>ID Transaksi:</strong> ${transaction.transaction_id}</p>
                <p><strong>Status:</strong> <span class="${statusClass}">${transaction.status}</span></p>
                <p><strong>Game:</strong> ${transaction.game_name}</p>
                <p><strong>ID Pembeli:</strong> ${transaction.game_user_id}</p>
                <p><strong>Produk Dibeli:</strong> ${transaction.product_amount} ${transaction.product_unit}</p>
                <p><strong>Total Bayar:</strong> Rp ${transaction.total_paid.toLocaleString('id-ID')}</p>
                <p><strong>Waktu Order:</strong> ${new Date(transaction.timestamp).toLocaleString('id-ID')}</p>
            </div>
        `;
    
    // Tampilkan analisis pembelian total (Fitur Premium)
    const analysisHTML = analysis ? `
            <div class="analysis-card">
                <h4>Analisis Pembelian Anda</h4>
                <p><strong>Total Transaksi Selesai:</strong> ${analysis.total_transactions} kali</p>
                <p><strong>Total Pembelian (Rp):</strong> Rp ${analysis.total_spent.toLocaleString('id-ID')}</p>
                <p><strong>Game Favorit:</strong> ${analysis.favorite_game}</p>
            </div>
        ` : '';
    
    statusDetails.innerHTML = detailsHTML + analysisHTML;
    resultSection.style.display = 'block';
  }
});