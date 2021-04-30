const btnReset = document.querySelector('#reset');

let playingTo = document.querySelector('#playingTo');
let playingToScore = playingTo.value;


const p1 = {
    score: 0,
    button: document.querySelector('#playerOne'),
    display: document.querySelector('#playerOneScore')
}

const p2 = {
    score: 0,
    button: document.querySelector('#playerTwo'),
    display: document.querySelector('#playerTwoScore')
}

p1.button.addEventListener('click', () => {
    checkWinner(p1, playingToScore, p2);
});

p2.button.addEventListener('click', (e) => {
    checkWinner(p2, playingToScore, p1, );
});

btnReset.addEventListener('click', (e) => {
    reset();
});

playingTo.addEventListener('change', () => {
    playingToScore = parseInt(playingTo.value);
})


const checkWinner = (player, playingToScore, ...opponents ) => {

    
    playingTo.disabled = true;
    player.score++;
    player.display.innerText = player.score;

    if (playingToScore <= player.score) {
        player.button.disabled = true;
        player.display.classList.add("has-text-success");
        
        for (let opponent of opponents) {
            opponent.button.disabled = true;
            opponent.display.classList.add("has-text-danger")
        }
    }
  
}

const reset = () => {

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.innerText = 0;
        p.display.classList.remove("has-text-success", "has-text-danger");
        p.button.disabled = false;
    }

    playingTo.disabled = false;
    playingTo.value = 1;
    
}
