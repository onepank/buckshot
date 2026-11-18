let userName = "Гравець";
let userLives = 3;
let compLives = 3;
let gameOver = false;

const userLivesEl = document.getElementById('userLives');
const compLivesEl = document.getElementById('compLives');
const userNumEl = document.getElementById('userNumber');
const compNumEl = document.getElementById('compNumber');
const messageEl = document.getElementById('message');
const btn = document.getElementById('generateBtn');
const compFigure = document.getElementById('compFigure');
const eyeL = document.getElementById('eyeL');
const eyeR = document.getElementById('eyeR');
const userNameLabel = document.getElementById('userNameLabel');

const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

function startMusic() {
    if (!isMusicPlaying) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});
        isMusicPlaying = true;
    }
}
document.body.addEventListener('click', startMusic, { once: true });

function updateLivesUI() {
    const userBullets = userLivesEl.querySelectorAll('.life-bullet');
    userBullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index < userLives);
        bullet.classList.toggle('lost', index >= userLives);
    });

    const compBullets = compLivesEl.querySelectorAll('.life-bullet');
    compBullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index < compLives);
        bullet.classList.toggle('lost', index >= compLives);
    });
}

function initGame() {
    let name = prompt("Введіть ваше ім'я:", "Гравець");
    if (name === null) name = "Гравець";
    else {
        name = name.trim();
        if (name.length > 15) name = name.substring(0, 15);
        if (name === "") name = "Гравець";
    }

    userName = name;
    userNameLabel.textContent = userName;
    messageEl.textContent = `Гра почалася! У вас по 3 життя. Хто втратить всі — програє.`;
    updateLivesUI();
}

function playRound() {
    if (gameOver) return;

    btn.disabled = true;
    compFigure.classList.remove('win', 'lose');
    eyeL.classList.remove('dead');
    eyeR.classList.remove('dead');
    userNumEl.classList.remove('pop');
    compNumEl.classList.remove('pop');

    const userNum = Math.floor(Math.random() * 10) + 1;
    const compNum = Math.floor(Math.random() * 10) + 1;

    setTimeout(() => {
        userNumEl.textContent = userNum;
        compNumEl.textContent = compNum;

        userNumEl.classList.add('pop');
        compNumEl.classList.add('pop');

        let message = "";
        let msgType = "";

        if (userNum > compNum) {
            compLives--;
            message = `${userName} перемагає в раунді! (Життів у комп'ютера: ${compLives})`;
            msgType = "win";
            compFigure.classList.add('lose');
            eyeL.classList.add('dead');
            eyeR.classList.add('dead');
        } 
        else if (compNum > userNum) {
            userLives--;
            message = `Комп'ютер перемагає в раунді! (Ваших життів: ${userLives})`;
            msgType = "lose";
            compFigure.classList.add('win');
        } 
        else {
            message = "Нічия! Раунд не зараховано.";
        }

        updateLivesUI();
        messageEl.textContent = message;
        messageEl.className = 'message-box ' + msgType;

        if (userLives <= 0 || compLives <= 0) {
            gameOver = true;
            setTimeout(() => {
                if (userLives <= 0) {
                    messageEl.textContent = `💀 Ви програли! Комп'ютер здобув перемогу.`;
                    messageEl.className = 'message-box lose';
                } else {
                    messageEl.textContent = `🏆 Ви перемогли! ${userName} здобув перемогу!`;
                    messageEl.className = 'message-box win';
                }
                btn.textContent = "ГРА ЗАКІНЧЕНА";
                btn.disabled = true;
            }, 500);
        } else {
            setTimeout(() => { btn.disabled = false; }, 600);
        }

    }, 100);
}

window.addEventListener('load', () => {
    initGame();
    document.getElementById('generateBtn').addEventListener('click', playRound);
});