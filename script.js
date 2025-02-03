let coins = 0;
let earningsPerClick = 1;
let autoClicker = false;
let player;

// YouTube Background Music Setup
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'slOsXdrE-hM',
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'slOsXdrE-hM'
        }
    });
}

function toggleMusic() {
    if (player.getPlayerState() === 1) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

// Sound Effect Setup
const clickSound = document.getElementById("click-sound");
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function clickPlant() {
    coins += earningsPerClick;
    document.getElementById('coins').innerText = coins;
    playSound();
    generateProps();
}

function generateProps() {
    for (let i = 0; i < 5; i++) {
        let prop = document.createElement("img");
        prop.src = "Assets/props.png";
        prop.classList.add("prop");

        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;

        prop.style.left = `${x}px`;
        prop.style.top = `${y}px`;
        prop.style.position = "absolute";
        prop.style.animation = "popAnimation 0.5s ease-in-out";

        document.body.appendChild(prop);

        setTimeout(() => {
            prop.remove();
        }, 500);
    }
}

function buyPlant(type, cost) {
    if (coins >= cost) {
        coins -= cost;
        document.getElementById('coins').innerText = coins;
        
        let plantContainer = document.getElementById("plant-container");
        let newPlant = document.createElement("img");
        newPlant.src = `Assets/${type}.png`;
        newPlant.classList.add("plant");
        newPlant.onclick = () => clickPlant();
        plantContainer.appendChild(newPlant);
        
        earningsPerClick += Math.floor(cost / 50);
        document.getElementById(`buy-${type}`).disabled = true;
        playSound();
    }
}

function toggleShop() {
    let shop = document.getElementById("shop-items");
    shop.style.display = shop.style.display === "none" ? "block" : "none";
}

function toggleUpdates() {
    let updates = document.getElementById("updates-list");
    updates.style.display = updates.style.display === "none" ? "block" : "none";
}
