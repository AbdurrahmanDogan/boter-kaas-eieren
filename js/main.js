window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');   // ik roep hier de classes aan met de queryselectors

    let board = ['', '', '', '', '', '', '', '', '']; // boord is leeg
    let currentPlayer = '✖'; // actieve speler = x
    let isGameActive = true; // spel is aktief

    const PLAYERX_WON = 'PLAYERX_WON'; // variabele voor als x heeft gewonnen.
    const PLAYERO_WON = 'PLAYERO_WON'; // variabele voor als o heeft gewonnen.
    const TIE = 'TIE'; // variabele voor als het gelijkspel is



    // mogelijke winsituaties 
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {

        let roundWon = false;
        for (let i = 0; i <= 7; i++) { // 0  tot 7 
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]]; // mogelijkheden wordt gekeken of ze leeg staan als dat zo is kan je verder gaan
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;                   // hier gaat die verder
            }
            if (a === b && b === c) {
                roundWon = true;          // hier als de winningconditions vol zijn heb je gewonnen an heb je te maken met een break
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === '✖' ?  PLAYERX_WON : PLAYERO_WON);
            isGameActive = false; // dit zorgy ervoor dat je melding krijgt met gewonnen anders kan je heletijd tikken maar kan wel gelijkspel
            return;
        }

        if (!board.includes('')) // hier zie je wel wie gewonnen heeft maar staat heletijd gelijkspel 
            announce(TIE);
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'SPELER <span class="player〇">〇</span> HEEFT GEWONNEN'; // als o heeft gewonnen 
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'SPELER <span class="player✖">✖</span> HEEFT GEWONNEN'; // als x heeft gewonnen 
                break;
            case TIE:
                announcer.innerText = ' HET IS GELIJKSPEL '; // als het gelijkspel is
        }
        announcer.classList.remove('hide'); // zorgt ervoor dat de mededelingen weg gaat na elke ronde
    };

    const isValidAction = (tile) => {
        if (tile.innerText === '✖' || tile.innerText === '〇') {
            return false;
        } // zorgt ervoor dat de x en o gezien worden in het boord

        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer; // zorgt ervoor dat alles op de hoogste is en dat alle meldingen komen anders heb je alleen maar x 
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === '✖' ? '〇' : '✖';         // hier zie je wie mag
        playerDisplay.innerText = currentPlayer;                    // hier wordt er gezorgt dat als de ene heeft geklikt dat de andere dan weer kan
        playerDisplay.classList.add(`player${currentPlayer}`); 
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);  //  zorgt voor de kleur dan niet heletijd alles rood is
            updateBoard(index); // zorgt voor return 
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => { // je reset het spel
        board = ['', '', '', '', '', '', '', '', '']; // boor is helemaal leeg
        isGameActive = true; // spel is weer aktief
        announcer.classList.add('hide'); // je hide de class zodat de text boven de reset knop ook weg gaat.

        if (currentPlayer === '〇') {
            changePlayer(); // als o is geweest dan gebeurt de changeplayer functie
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('player✖'); // x gaat dan weg     // ook voor kleur
            tile.classList.remove('player〇'); // o gaat dan weg    // ook voor kleur
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index)); // zorgt ervoor daat het ook stopt
    });

    resetButton.addEventListener('click', resetBoard); // hiermee reset je het spel
});