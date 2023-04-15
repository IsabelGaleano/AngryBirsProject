//check which screen to load
const currentLevel = sessionStorage.getItem('level');
if(currentLevel == null){
    document.getElementById('startPanel').style.display = 'block';
} else if (sessionStorage.getItem('levelThreePass')){
    document.getElementById('gamePanel').style.display = 'none';
    document.getElementById('scorePanel').style.display = 'none';
    document.getElementById('currentLevel').style.display = 'none';
    document.getElementById('playerContainer').style.display = 'none';
    document.getElementById('endGameContainer').style.display = 'block';
}
else {
    document.getElementById('gamePanel').style.display = 'block';
    document.getElementById('scorePanel').style.display = 'block';
    document.getElementById('currentLevel').style.display = 'block';
    document.getElementById('playerContainer').style.display = 'block';
    document.getElementById('levelTitle').innerHTML = 'Nivel: ' + currentLevel;
    document.getElementById('playerNameParragraph').innerHTML = sessionStorage.getItem('player');
}

const startGame = () => {
    document.getElementById('gamePanel').style.display = 'block';
    document.getElementById('scorePanel').style.display = 'block';
    document.getElementById('startPanel').style.display = 'none';
    document.getElementById('currentLevel').style.display = 'block';
    document.getElementById("levelTitle").innerHTML = 'Nivel: ' + 1;
    const playerName = document.getElementById('playerName').value;
    sessionStorage.setItem('player',playerName);
    document.getElementById("playerNameParragraph").innerHTML =  playerName;
    document.getElementById('playerContainer').style.display = 'block';
}

const resetGame = () => {
    sessionStorage.clear();
    location.reload();
}