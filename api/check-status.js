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
  
  const { searchQuery } = req.body; // Data dari status.js
  
  if (!searchQuery) {
    return res.status(400).json({ success: false, message: "ID Pencarian wajib diisi." });
  }
  
  // --- LOGIKA UTAMA PENCARIAN ---
  
  // Di sini seharusnya ada koneksi ke database dan mencari 'searchQuery'
  // const transaction = database.find(searchQuery);
  
  // SIMULASI HASIL TRANSAKSI
  const DUMMY_TRANSACTION = {
    transaction_id: searchQuery,
    status: 'SUCCESS', // Atau 'PENDING' / 'FAILED'
    game_name: 'Mobile Legends: Bang Bang',
    game_user_id: '12345678',
    product_amount: 344,
    product_unit: 'Diamond',
    total_paid: 112000,
    timestamp: new Date().toISOString()
  };
  
  // SIMULASI KONDISI GAGAL
  if (searchQuery.length < 5) {
    return res.status(404).json({ success: false, message: "ID Transaksi tidak valid atau tidak ditemukan." });
  }
  
  res.status(200).json({
    success: true,
    message: "Transaksi ditemukan.",
    transaction: DUMMY_TRANSACTION
  });
};