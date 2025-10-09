// js/main.js
document.addEventListener('DOMContentLoaded', async () => {
    const gameGrid = document.getElementById('game-grid');
    
    // Menggunakan placeholder yang lebih stabil (Diperbaiki)
    const games = [
        { id: 'ml', name: 'Mobile Legends', image: 'https://placehold.co/160x160/0000FF/FFFFFF/png?text=MLBB' },
        { id: 'pubg', name: 'PUBG Mobile', image: 'https://placehold.co/160x160/FF0000/FFFFFF/png?text=PUBG' },
        { id: 'ff', name: 'Free Fire', image: 'https://placehold.co/160x160/00FF00/000000/png?text=FF' },
        { id: 'valo', name: 'Valorant', image: 'https://placehold.co/160x160/FFFF00/000000/png?text=VALO' },
    ];
    
    games.forEach(game => {
        const gameItem = document.createElement('a');
        gameItem.href = `order.html?game_id=${game.id}`;
        gameItem.className = 'game-item';
        
        const gameImage = document.createElement('img');
        gameImage.src = game.image;
        gameImage.alt = game.name;
        
        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.name;
        
        gameItem.appendChild(gameImage);
        gameItem.appendChild(gameTitle);
        gameGrid.appendChild(gameItem);
    });
});