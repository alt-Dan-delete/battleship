const Player = require("./player");

const menu = document.getElementById('menu')

const message = document.createElement('h2');
message.textContent = 'Press start to play or random to change ship placement';
menu.appendChild(message);

playBtn = document.createElement('button');
playBtn.textContent = 'play';
menu.appendChild(playBtn);

const randomBtn = document.createElement('button')
randomBtn.textContent = 'random';
menu.appendChild(randomBtn);

module.exports = {
    message,
    playBtn,
    randomBtn
}