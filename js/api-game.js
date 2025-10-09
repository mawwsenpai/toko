// js/api-game.js
// Ini adalah file yang nanti akan mengambil data game dari API.

// Data game statis sebagai contoh
const DUMMY_GAMES = [
    {
        id: 'ml',
        name: 'Mobile Legends',
        image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=ML'
    },
    {
        id: 'pubg',
        name: 'PUBG Mobile',
        image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PUBG'
    },
    {
        id: 'ff',
        name: 'Free Fire',
        image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=FF'
    },
    {
        id: 'valo',
        name: 'Valorant',
        image: 'https://via.placeholder.com/150/FFFF00/000000?text=VALO'
    }
];

// Fungsi untuk mendapatkan daftar game
async function getGameList() {
    // Nanti, kita ganti kode ini untuk memanggil backend Heroku
    // dan mengambil data dari API game sungguhan.
    return DUMMY_GAMES;
}