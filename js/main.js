/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
//const for images initiation
const RPS_LOOKUP = {
    r: {img: 'images/rock.png', beats: 's'},
    p: {img: 'images/paper.png', beats: 'r'},
    s: {img: 'images/scissors.png', beats: 'p'}
};
/*----- app's state (variables) -----*/
let scores;//'p' - player, 'c' - computer, 't' - tie
let results; //object key of 'p' for the player
//values 'r' => rock, 'p' => paper, 's' => scissors
let winner; // string 'p' => player, 'c' => computer, t => 'tie
/*----- cached element references -----*/
//three variables for caching variables
const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');
const countdownEl = document.getElementById('countdown');


/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);

/*----- functions -----*/
init();

//init all state, then call render
function init() {
    scores = {
        p: 0,
        t: 0,
        c: 0
    };
    results = {
        p: 'r',
        c: 'r'
    };
    winner = 'p';
    render();
}

//3.handler goes to event listener (player choice)
//in response to user interaction we update the state. => call render
function handleChoice(event) {
    //guard (do nothing unless one of three button clicked)
    if (event.target.tagName !== 'BUTTON') return;
    //player has made a choice
    results.p = event.target.innerText.toLowerCase();
    //compute a random choice to computer
    results.c = getRandomRPS();
    //determine winner
    winner = getWinner();
    //add counting logic
    scores[winner] += 1;
    render();
}

//5. check for winner function
function getWinner() {
    if (results.p === results.c) return 't';
    return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c';
}

//4. compute random choice for computer 
function getRandomRPS() {
    const rps = Object.keys(RPS_LOOKUP);
    const randomIdx = Math.floor(Math.random() * rps.length);
    return rps[randomIdx];
}

//1.looping through score obj, getting the el key and display scores key
function renderScores() {
    for (let key in scores) {
        //getting id of score h1
        const scoreEl = document.getElementById(`${key}-score`);
        //assign h1 elements values of score variable
        scoreEl.innerText = scores[key];
    }
}

//2.displaying images of player chose .img in the end
function renderResults() {
    pResultEl.src = RPS_LOOKUP[results.p].img;
    cResultEl.src = RPS_LOOKUP[results.c].img;
    pResultEl.style.borderColor = winner === 'p' ? '#228B22FF' : 'white';
    cResultEl.style.borderColor = winner === 'c' ? 'red' : 'white';
}

//transfer/visualize all state to DOM
function render() {
    //6
    renderCountDown( () => {
        //1
        renderScores();
        //2
        renderResults();
    });
}

//6. function for adding counter and some music
function renderCountDown(callback) {
    let count = 3;
    AUDIO.currentTime = 0;
    AUDIO.play().then(r => {r.data});
    countdownEl.style.visibility = 'visible';
    countdownEl.innerText = count;
    const timerId = setInterval(() => {
        count--;
        if (count) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timerId);
            countdownEl.style.visibility = 'hidden';
            callback();
        }
    }, 1000);
}