/* eventlistener on the window object to listen to the DOMContentLoaded, this is needed because 
we included our js file on the head of our HTML doc this needs to be processed b4 any HTML*/
window.addEventListener('DOMContentLoaded',()=>{
    const tiles=Array.from(document.querySelectorAll('.tile'));
    const playerDisplay=document.querySelector('.display-player');
    const resetButton=document.querySelector('#reset');
    const announcer=document.querySelector('.announcer');

    // add the variables we will need
    let board = ['','','','','','','','',''];
    let currentPlayer ='X';
    let isGameActive=true;

    // these are our constant values
    const PLAYERX_WON ='PLAYERX_WON';
    const PLAYERO_WON ='PLAYERO_WON';
    const TIE ='TIE';

    /*
    Indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    [9]
    */

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],    
        [0,4,8],
        [2,4,6]
    ];

    //checking ifwe have a winner or not by looping through the wincondition
    function handleResultValidation() {
        let roundWon = false;
        for (let i=0; i<=7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            //if any of the three elements is an empty string we will skipp the iteration
            if (a === '' || b === '' || c ==='') {
                continue;
            }
            //if they are equal then we set roundwon to true
            if (a ===b && b ===c) {
                roundWon = true;
                break;
            }
        }
       //if we have a winner then the anounce function will say who won
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive =false;
            return;
        }
    //if we dont have any winners and there are no empty spaces left then its a tie
        if (!board.includes(''))
        announce(TIE);
    }

//announce our winner
    const announce = (type) =>{
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML ='Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML ='Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        // remove the hide class to show the user who won
        announcer.classList.remove('hide');
    };
//this is used to check if the tile has a value already
    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innnerText ==='O'){
            return false;
        }

        return true;
    };
    /*it sends the value of index array to board array and the current position 
    to ebe equal to the value of the current player variable*/
    const updateBoard = (index) =>{
        board[index] = currentPlayer;
    }

    //change current player to be o if it was x and vice versa
    const changePlayer = () =>{
        playerDisplay.classList.remove('player${currentPlayer}');
        currentPlayer = currentPlayer === 'X' ? 'O' :'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add('player${currentPlayer}');
    }

    // implement user action function when user 
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add('player${currentPlayer}');
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    // this will help reset the game state
    const resetBoard = () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O'){
            changePlayer();
        }
//here we will set all inner text to be empty and remove all player related values
        tiles.forEach (tile =>{
            tile.innerText ='';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    // with refference to the specific tile ,index will be used to update our in memory saved
    tiles.forEach( (tile,index)=>{
        tile.addEventListener('click', ()=>userAction(tile,index));
    });

// this line allows us to reset the score and restart the game afresh
    resetButton.addEventListener('click', resetBoard);
});
