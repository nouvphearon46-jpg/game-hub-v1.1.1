const GAMES = [
  { id: 'snake', icon: '🐍', name: 'Snake', cat: 'Action', locked: false },
  { id: 'pacman', icon: '👻', name: 'Pac-Man', cat: 'Action', locked: false },
  { id: 'flappy', icon: '🐦', name: 'Flappy Bird', cat: 'Action', locked: false },
  { id: 'dino', icon: '🦕', name: 'Dino Run', cat: 'Action', locked: false },
  { id: 'shooter', icon: '🚀', name: 'Space Shooter', cat: 'Action', locked: false },
  { id: 'racing', icon: '🏎️', name: 'Car Race', cat: 'Action', locked: false },
  { id: 'pong', icon: '🏓', name: 'Pong', cat: 'Action', locked: false },
  { id: 'breakout', icon: '🧱', name: 'Breakout', cat: 'Action', locked: false },
  { id: 'memory', icon: '🧠', name: 'Memory Match', cat: 'Puzzle', locked: false },
  { id: 'tetris', icon: '🧩', name: 'Tetris', cat: 'Puzzle', locked: false },
  { id: 'connect4', icon: '🔴', name: 'Connect 4', cat: 'Puzzle', locked: false },
  { id: 'catch', icon: '🎣', name: 'Catch Game', cat: 'Casual', locked: false },
  { id: 'whack', icon: '🔨', name: 'Whack Mole', cat: 'Casual', locked: false },
  { id: 'garden', icon: '🌱', name: 'Grow Garden', cat: 'Casual', locked: false },
  { id: 'arena3d', icon: '⚔️', name: '3D Arena', cat: 'Premium', locked: true, requiredScore: 1000 },
  { id: 'neonturbo', icon: '🏁', name: 'Neon Turbo', cat: 'Premium', locked: true, requiredScore: 1000 },
];

let userScore = 1500;
let currentUser = null;

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  });
}

function goToLogin() {
  document.getElementById('welcomeSection').classList.add('hidden');
  document.getElementById('loginSection').classList.remove('hidden');
}

function goToWelcome() {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('welcomeSection').classList.remove('hidden');
  document.getElementById('loginForm').reset();
  document.getElementById('successMessage').textContent = '';
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  
  emailError.textContent = '';
  passwordError.textContent = '';
  
  if (!validateEmail(email)) {
    emailError.textContent = 'Invalid email format';
    return;
  }
  
  if (password !== '#') {
    passwordError.textContent = 'Invalid password';
    return;
  }
  
  currentUser = email;
  document.getElementById('successMessage').textContent = '✓ Login successful! Redirecting...';
  
  setTimeout(() => {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
    loadGames();
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});

function loadGames() {
  const container = document.getElementById('gamesContainer');
  container.innerHTML = '';
  
  const categories = ['Action', 'Puzzle', 'Casual', 'Premium'];
  
  categories.forEach(cat => {
    const gamesInCat = GAMES.filter(g => g.cat === cat);
    if (gamesInCat.length > 0) {
      const section = document.createElement('div');
      section.className = 'category-section';
      section.innerHTML = `<h3>${cat} Games</h3>`;
      
      const grid = document.createElement('div');
      grid.className = 'games-grid';
      
      gamesInCat.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        if (game.locked && userScore < game.requiredScore) {
          card.innerHTML = `
            <div class="game-icon">🔒</div>
            <h4>${game.name}</h4>
            <p>Need ${game.requiredScore} pts</p>
          `;
          card.style.cursor = 'not-allowed';
          card.style.opacity = '0.6';
        } else {
          card.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h4>${game.name}</h4>
            <p>Click to play</p>
          `;
          card.onclick = () => playGame(game);
        }
        
        grid.appendChild(card);
      });
      
      section.appendChild(grid);
      container.appendChild(section);
    }
  });
}

function playGame(game) {
  const gameUrls = {
    'arena3d': 'arena3d.html',
    'parkour': 'parkour.html',
    'neonturbo': 'neonturbo.html'
  };
  
  if (gameUrls[game.id]) {
    window.open(gameUrls[game.id], '_blank', 'fullscreen=yes');
  } else {
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('gameSection').classList.remove('hidden');
    document.getElementById('gameTitle').textContent = game.name;
    document.getElementById('gameScore').textContent = 'Score: 0';
    document.getElementById('gameLevel').textContent = 'Level: 1';
    
    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `<p>Loading ${game.name}...</p>`;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      document.getElementById('gameSection').classList.add('hidden');
      document.getElementById('dashboardSection').classList.remove('hidden');
      loadGames();
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      currentUser = null;
      userScore = 1500;
      document.getElementById('dashboardSection').classList.add('hidden');
      document.getElementById('loginSection').classList.add('hidden');
      document.getElementById('welcomeSection').classList.remove('hidden');
      document.getElementById('loginForm').reset();
      document.getElementById('successMessage').textContent = '';
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.getElementById('searchGames');
  if (searchBox) {
    searchBox.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.game-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const filterCategory = document.getElementById('filterCategory');
  if (filterCategory) {
    filterCategory.addEventListener('change', function(e) {
      const selectedCat = e.target.value;
      const sections = document.querySelectorAll('.category-section');
      sections.forEach(section => {
        const h3 = section.querySelector('h3');
        if (selectedCat === '' || h3.textContent.includes(selectedCat)) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  }
});