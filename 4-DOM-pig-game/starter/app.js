/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let activePlayer, roundScore;
activePlayer = 0;
roundScore = 0;

document.querySelector('.dice').style.display = "none";

document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';


//onclick for the button, trigger this function
//button clicks on forever
document.querySelector('.btn-roll').addEventListener('click',function(){
    
    let dice = Math.floor(Math.random() *6) +1;

    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block'; //block display - basically change it to the style what it once was before
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice !== 1){
        roundScore += dice; //roundscore added number by dice rolled - roundScore persist bc it is in the global 
        document.querySelector('#current-' + activePlayer).textContent=roundScore;
    } else{
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0 ;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //toggle does is that if there is something remove, then if there isn't anything then add
        document.querySelector('.player-0-panel').classList.toggle('active'); //classlist is needed to get the remove
        document.querySelector('.player-1-panel').classList.toggle('active'); 

        // document.querySelector('.player-0-panel').classList.remove('active'); //classlist is needed to get the remove
        // document.querySelector('.player-1-panel').classList.add('active'); 

        document.querySelector('.dice').style.display = 'none';
    }


})