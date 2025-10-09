// js/heroku.js
// Ini adalah modul yang mengurus komunikasi dengan backend Heroku.

// Variabel untuk menyimpan URL backend Heroku kamu
const HEROKU_API_URL = "https://nama-aplikasi-heroku-kamu.herokuapp.com";

// Fungsi untuk mengirim data pesanan ke backend Heroku
async function sendOrderToHeroku(orderData) {
  try {
    const response = await fetch(`${HEROKU_API_URL}/process-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Koneksi ke server gagal.' };
  }
}