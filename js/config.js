const VERCEL_BASE_URL = "https://nama-aplikasi-kamu.vercel.app";

/**
 * Fungsi pembantu untuk memanggil API Backend Vercel Functions
 * @param {string} endpoint - Misalnya: '/api/products' atau '/api/create-transaction'
 * @param {string} method - Metode HTTP (GET, POST)
 * @param {object} body - Data yang dikirim (hanya untuk POST)
 */
async function fetchAPI(endpoint, method = 'GET', body = null) {
  // Vercel API endpoint sudah didefinisikan secara rapi
  const url = VERCEL_BASE_URL + endpoint;
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Koneksi/Fetch API Gagal:', error.message);
    // Mengembalikan struktur yang konsisten saat gagal
    return { success: false, message: error.message || "Gagal terhubung ke Vercel Serverless Function." };
  }
}