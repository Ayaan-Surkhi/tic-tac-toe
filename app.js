const cells = document.querySelectorAll('.cell');
const statusEl = document.querySelector('.status');
const banned = [];
const stats = JSON.parse(localStorage.getItem('stats'));
let inGame;
let newArray = Array.from(cells);
let status = 'play';

const obj = {
    played: stats.played,
    wins: stats.wins,
    lost: stats.lost,
}

const statBoard = (arg) => {
    return `
    <div class='stats'>
        Stats
        <div className="played">Played: ${arg.played}</div>
        <div className="won">Won: ${arg.wins}</div>
        <div className="lost">Lost: ${arg.lost}</div>
    </div>
    `;
}

if (!stats) {
    obj.played = 0;
    obj.wins = 0;
    obj.lost = 0;

    localStorage.setItem('stats', JSON.stringify(obj))
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', (e) => {

        // Adding removing from board
        if (!banned.includes(e.target) && status === 'play') {
            banned.push(e.target);
            e.target.textContent = 'X';
    
            arr = newArray.filter(el => !banned.includes(el));
            console.log(arr);

        // Check for win
        if (cells[0].textContent === cells[1].textContent && cells[0].textContent === cells[2].textContent && cells[0].textContent === 'X' // 1st row
            || cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent && cells[0].textContent === 'X' // left diagonal
            || cells[2].textContent === cells[4].textContent && cells[2].textContent === cells[6].textContent && cells[2].textContent === 'X' // right diagonal
            || cells[3].textContent === cells[4].textContent && cells[3].textContent === cells[5].textContent && cells[3].textContent === 'X' // 2nd row
            || cells[6].textContent === cells[7].textContent && cells[6].textContent === cells[8].textContent && cells[6].textContent === 'X' // 3rd row
            || cells[0].textContent === cells[3].textContent && cells[0].textContent === cells[6].textContent && cells[0].textContent === 'X' // 1st col
            || cells[1].textContent === cells[4].textContent && cells[1].textContent === cells[7].textContent && cells[1].textContent === 'X' // 2nd col
            || cells[2].textContent === cells[5].textContent && cells[2].textContent === cells[8].textContent && cells[2].textContent === 'X' // 3rd col
        ) {
            obj.played += 1;
            obj.wins += 1;
            localStorage.setItem('stats', JSON.stringify(obj));

            statusEl.style.display = 'flex';
            const display = statBoard(obj);
            statusEl.innerHTML = `
                You win! you have beaten the legend
                <a href="game.html">Try again</a>
                ${display}
                `;
            status = 'you win';
        } else if (cells[0].textContent === cells[1].textContent && cells[0].textContent === cells[2].textContent && cells[0].textContent === 'X' // 1st row
        || cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent && cells[0].textContent === 'X' // left diagonal
        || cells[2].textContent === cells[4].textContent && cells[2].textContent === cells[6].textContent && cells[2].textContent === 'X' // right diagonal
        || cells[3].textContent === cells[4].textContent && cells[3].textContent === cells[5].textContent && cells[3].textContent === 'X' // 2nd row
        || cells[6].textContent === cells[7].textContent && cells[6].textContent === cells[8].textContent && cells[6].textContent === 'X' // 3rd row
        || cells[0].textContent === cells[3].textContent && cells[0].textContent === cells[6].textContent && cells[0].textContent === 'X' // 1st col
        || cells[1].textContent === cells[4].textContent && cells[1].textContent === cells[7].textContent && cells[1].textContent === 'X' // 2nd col
        || cells[2].textContent === cells[5].textContent && cells[2].textContent === cells[8].textContent && cells[2].textContent === 'X' // 3rd col) 
        ) { 
            obj.played += 1;
            obj.lost += 1;
            localStorage.setItem('stats', JSON.stringify(obj));
            const display = statBoard(obj);
            statusEl.style.display = 'flex';
            statusEl.innerHTML = `
                You lost! you have been defeated
                <a href="game.html">Try again</a>
                ${display}
                `;
            status  = 'computer wins'
        } else if (!arr.length) {
            obj.played += 1;
            localStorage.setItem('stats', JSON.stringify(obj)); 
            const display = statBoard(obj);           
            statusEl.style.display = 'flex';
            statusEl.innerHTML = `
                A draw! a worthy opponent
                <a href="game.html">Play again</a>
                ${display}
                `;
            status = 'draw'
        }

        console.log(status);

        if (arr.length && status === 'play') {
            let random = Math.floor(Math.random() * arr.length);
            if (random !== index) {
                arr[random].textContent = 'O';
                banned.push(arr[random]);
            } else {
                random = Math.floor(Math.random() * arr.length);
                arr[random].textContent = 'O';
                banned.push(arr[random]);
            }
        } else {
            console.log('no space');
        }

    }

    })
})