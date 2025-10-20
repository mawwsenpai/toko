// api/products.js
// Endpoint: /api/products
// Tugas: Menyediakan daftar game untuk halaman Home

module.exports = (req, res) => {
    // Header Wajib untuk CORS agar frontend bisa akses
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    // Handle Preflight request dari browser
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Data Simulasi Produk Games
    const gameList = [
        { 
            id: 'mlbb', 
            name: 'Mobile Legends: Bang Bang', 
            desc: 'Top-up Diamond MLBB murah dan cepat!',
            image: '/images/mlbb.webp', // Asumsi gambar ada di folder public/images
            status: 'online'
        },
        { 
            id: 'ff', 
            name: 'Free Fire', 
            desc: 'Top-up Diamond FF harga gila!',
            image: '/images/ff.webp',
            status: 'online'
        },
        { 
            id: 'genshin', 
            name: 'Genshin Impact', 
            desc: 'Genesis Crystal Genshin Impact',
            image: '/images/genshin.webp',
            status: 'maintenance' // Contoh status maintenance
        },
    ];

    res.status(200).json({
        success: true,
        message: "Daftar games berhasil dimuat.",
        data: gameList
    });
};