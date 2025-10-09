// js/api.js
// INI ADALAH PUSAT KONTROL DATA & KOMUNIKASI KE BACKEND

// Ganti dengan URL Heroku-mu nanti
const HEROKU_API_URL = "https://nama-aplikasi-heroku-kamu.herokuapp.com";

// --- DATABASE SIMULASI (Nanti ini akan ada di backend) ---
const FULL_GAME_DATA = {
    'ml': {
        info: { name: 'Mobile Legends', image: 'https://placehold.co/100x100/1e3a8a/ffffff/png?text=MLBB', description: 'Top up Diamond Mobile Legends: Bang Bang termurah dan terpercaya.', needs_zone: true },
        products: [
            { id: 'ml-86', amount: 86, unit: 'Diamonds', price: 15000 },
            { id: 'ml-172', amount: 172, unit: 'Diamonds', price: 30000 },
            { id: 'ml-257', amount: 257, unit: 'Diamonds', price: 45000 },
            { id: 'ml-344', amount: 344, unit: 'Diamonds', price: 60000 },
            { id: 'ml-429', amount: 429, unit: 'Diamonds', price: 75000 },
            { id: 'ml-514', amount: 514, unit: 'Diamonds', price: 90000 },
        ]
    },
    'pubg': {
        info: { name: 'PUBG Mobile', image: 'https://placehold.co/100x100/f59e0b/ffffff/png?text=PUBG', description: 'Beli UC untuk PUBG Mobile dengan cepat dan mudah.', needs_zone: false },
        products: [
            { id: 'pubg-60', amount: 60, unit: 'UC', price: 10000 },
            { id: 'pubg-325', amount: 325, unit: 'UC', price: 50000 },
            { id: 'pubg-660', amount: 660, unit: 'UC', price: 100000 },
        ]
    },
    'ff': {
        info: { name: 'Free Fire', image: 'https://placehold.co/100x100/ea580c/ffffff/png?text=FF', description: 'Top up Diamond Free Fire resmi Garena.', needs_zone: false },
        products: [
            { id: 'ff-100', amount: 100, unit: 'Diamonds', price: 12000 },
            { id: 'ff-355', amount: 355, unit: 'Diamonds', price: 40000 },
            { id: 'ff-720', amount: 720, unit: 'Diamonds', price: 80000 },
        ]
    },
    'valo': {
        info: { name: 'Valorant', image: 'https://placehold.co/100x100/dc2626/ffffff/png?text=VALO', description: 'Beli Valorant Points untuk upgrade battle pass dan skin.', needs_zone: false },
        products: [
            { id: 'valo-125', amount: 125, unit: 'Points', price: 15000 },
            { id: 'valo-420', amount: 420, unit: 'Points', price: 50000 },
            { id: 'valo-1375', amount: 1375, unit: 'Points', price: 150000 },
        ]
    }
};

const DUMMY_PAYMENTS = [
    { id: 'qris', name: 'QRIS', image: 'https://placehold.co/60x60/0ea5e9/ffffff?text=QRIS' },
    { id: 'gopay', name: 'GoPay', image: 'https://placehold.co/60x60/2563eb/ffffff?text=GoPay' },
    { id: 'ovo', name: 'OVO', image: 'https://placehold.co/60x60/4f46e5/ffffff?text=OVO' },
    { id: 'dana', name: 'DANA', image: 'https://placehold.co/60x60/3b82f6/ffffff?text=DANA' },
];

// --- FUNGSI-FUNGSI API ---

/**
 * Mengambil daftar semua game untuk ditampilkan di halaman utama.
 */
async function getGameList() {
    console.log("API: Mengambil daftar game...");
    // Simulasi jeda waktu saat memanggil API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const games = Object.keys(FULL_GAME_DATA).map(id => ({
        id: id,
        name: FULL_GAME_DATA[id].info.name,
        image: `https://placehold.co/160x160/${Math.floor(Math.random()*16777215).toString(16)}/ffffff/png?text=${FULL_GAME_DATA[id].info.name.substring(0,4).toUpperCase()}` // Gambar dinamis untuk variasi
    }));
    
    // Menambah lebih banyak game untuk tampilan
    const moreGames = [
        { id: 'genshin', name: 'Genshin Impact', image: 'https://placehold.co/160x160/fde047/000/png?text=GI' },
        { id: 'aov', name: 'Arena of Valor', image: 'https://placehold.co/160x160/c2410c/fff/png?text=AOV' },
        { id: 'codm', name: 'Call of Duty: Mobile', image: 'https://placehold.co/160x160/4a5568/fff/png?text=CODM' },
        { id: 'lolwr', name: 'LoL: Wild Rift', image: 'https://placehold.co/160x160/06b6d4/fff/png?text=WR' },
    ];
    
    console.log("API: Daftar game berhasil didapatkan.");
    return [...games, ...moreGames];
}

/**
 * Mengambil detail lengkap sebuah game, termasuk produk dan metode pembayaran.
 * @param {string} gameId - ID dari game (contoh: 'ml', 'pubg').
 */
async function getGameDetails(gameId) {
    console.log(`API: Mengambil detail untuk game ID: ${gameId}...`);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (FULL_GAME_DATA[gameId]) {
        console.log("API: Detail game ditemukan.");
        return {
            ...FULL_GAME_DATA[gameId],
            payments: DUMMY_PAYMENTS
        };
    } else {
        console.error("API: Game tidak ditemukan.");
        return null; // Mengembalikan null jika game tidak ada
    }
}

/**
 * Mengirim data pesanan ke backend untuk membuat sesi pembayaran.
 * @param {object} orderData - Objek berisi detail pesanan.
 */
async function createPaymentSession(orderData) {
    console.log("API: Mengirim data pesanan ke backend...", orderData);
    // Ini adalah simulasi API call ke backend Heroku-mu.
    try {
        /*
        // KODE ASLI NANTI AKAN SEPERTI INI (JANGAN HAPUS KOMENTARNYA):
        const response = await fetch(`${HEROKU_API_URL}/create-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        const data = await response.json();
        */
        
        // KODE SIMULASI UNTUK SEKARANG:
        await new Promise(resolve => setTimeout(resolve, 1500));
        const data = { success: true, paymentUrl: 'https://duitku.com/simulasi-pembayaran' };
        
        if (data.success) {
            console.log("API: Sesi pembayaran berhasil dibuat.");
            return { success: true, paymentUrl: data.paymentUrl };
        } else {
            return { success: false, message: data.message || 'Gagal membuat sesi pembayaran.' };
        }
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: 'Koneksi ke server backend gagal.' };
    }
}