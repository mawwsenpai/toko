module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: "Method Not Allowed." });
  }
  
  // Data yang dikirim dari frontend order.js
  const { userId, zoneId, productId, paymentMethod } = req.body;
  
  // 1. Validasi Input (WAJIB)
  if (!userId || !productId || !paymentMethod) {
    return res.status(400).json({ success: false, message: "Data order tidak lengkap." });
  }
  
  const productPrice = 56000; // Contoh harga jual
  const modalPrice = 50000; // Contoh harga modal
  const transactionId = `VG-${Date.now()}`;
  const webhookUrl = `${req.headers.host}/webhook/payment`; // URL krusial untuk notifikasi bayar!
  
  try {

    // --- SIMULASI RESPON PAYMENT GATEWAY SUKSES ---
    res.status(200).json({
      success: true,
      message: "Pesanan berhasil dibuat. Menunggu pembayaran.",
      transaction_id: transactionId,
      payment_url: "https://simulasi-payment-gateway.com/invoice/12345", // URL Invoice
      total_price: productPrice,
      status: "PENDING"
    });
    
  } catch (error) {
    console.error("Payment Gateway Error:", error);
    res.status(500).json({ success: false, message: "Gagal memproses pembayaran. Coba lagi." });
  }
};