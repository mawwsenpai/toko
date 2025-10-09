// js/pay.js
// Modul ini mengurus pembayaran.
const HEROKU_API_URL = "https://nama-aplikasi-heroku-kamu.herokuapp.com"; // GANTI INI!

async function createPaymentSession(orderData) {
  // Ini adalah simulasi API call ke backend Heroku kamu.
  // Kode backend Heroku-mu yang akan memanggil Duitku API.
  try {
    const response = await fetch(`${HEROKU_API_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Jika berhasil, data.paymentUrl adalah URL dari Duitku
      return { success: true, paymentUrl: data.paymentUrl };
    } else {
      return { success: false, message: data.message || 'Gagal membuat sesi pembayaran.' };
    }
    
  } catch (error) {
    console.error('Error di Pay.js:', error);
    return { success: false, message: 'Koneksi ke server backend gagal. Cek URL Heroku.' };
  }
}