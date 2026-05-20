let selected = null; //used to check if a number in the digits selection has been selected twice
let selected1 = null; //used to check if a tile has been selected twice
let numSelected = null; //used in selectTile to ensure a tile receives the selected tile 
let selectedTwice = false; //also used to help check if a number in the digits selection has been selected twice
let currentTime = 0; //used for the timer

window.onload = function () { //calls all of these functions at page load
    setGame();
    help();
    startTimer();
    activateButton();
}

function setGame() {
    fetch('/get-difficulty')
    .then(response => response.json())
    .then(difficultyData => {
        console.log('Current Difficulty:', difficultyData.difficulty);
        return fetch('/initialize');
    })
    .then(response => response.json()) //fetches a response from the server!!
    .then(data => {
        const { board } = data;
            //creates 9 divs and puts them in the div with the id "digits" to create the selection of digits
            for (let i = 1; i <= 9; i++) {
                let number = document.createElement("div");
                number.id = i;
                number.innerText = i;
                number.addEventListener("click", selectNumber);
                number.classList.add("number");
                document.getElementById("digits").appendChild(number);
            }
            //creates 81 ddivs and puts them in the div with the id "board" to create the sudoku board
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    let tile = document.createElement("div");
                    tile.id = r.toString() + "-" + c.toString();
                    tile.classList.add("tile");
                    tile.addEventListener("click", selectTile);
                    tile.addEventListener("click", tileColour);
                    
                    if (board[r][c] !== "-") {
                        tile.innerText = board[r][c];
                        tile.classList.add("tile-start");
                    } else {
                        tile.innerText = "\xa0";
                    }

                    if (r === 2 || r === 5) {tile.classList.add("horizontal-line");} //adds a horizontal line between columns
                    if (c === 2 || c === 5) {tile.classList.add("vertical-line");} //adds a vertical line between rows

                    document.getElementById("board").appendChild(tile);
                }
            } console.log("Board successfully created");
        });
    
}

//responsible for the funciton of clicking a number in the selection tile on the website and storing that value in a variable
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
        selected = numSelected.id;
        if (selectedTwice == true) {
            selected = null;
        }
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
    if (this.id == selected) { //if selected digit is selected again, this statement 'unselects' the digit
        numSelected.classList.remove("number-selected");
        console.log("selected more than once");
        selectedTwice = true;
    } else {
        selectedTwice = false;
    }
}

//responsible for taking the selected number from the selection tile and putting it into the tile on the board
function selectTile() {
    Promise.all([
        fetch('/solution').then(response => response.json()),
        fetch('/initialize').then(response => response.json())
    ])
        .then(([solutionData, boardData]) => {
            const { solution } = solutionData;
            const { board }= boardData;
    if (numSelected == null) {
        return;
    }
    if (numSelected.classList.contains("number-selected")) {
        this.innerText = numSelected.id;
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        if (board[r][c] == solution[r][c]) {
            this.innerText = board[r][c];
        }
    }});
}

//responsible for the 'highlighting' of the tiles in the board
function tileColour(event) {
    let tile = event.currentTarget;
    fetch('/solution')
    .then(response => response.json())
    .then(data => {
    const { solution } = data;
    if (tile.style.backgroundColor == "lightcoral" || tile.style.backgroundColor == "lightgreen") {
        return;
    }
    let coords = tile.id.split("-"); //["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    let contained = document.querySelectorAll("div.tile")
        for (i of contained) {
            if (i.classList.contains("highlighted")) { 
                i.classList.remove("highlighted");
                i.style.backgroundColor = "white";
            }
        }
        if (tile.classList.contains("highlighted")) {
            return;
        }
        if (tile.innerText == solution[r][c] && tile.classList.contains("tile-start")) { //returns immediately if the selected tile is a default tile
            return;
        }
        if (tile.id == selected1) { //this will 'unselect' the current tile if it is clicked when it has already been selected
            console.log("selected twice");
            tile.classList.remove("highlighted");
            tile.style.backgroundColor = "white";
            selected1 = null;
            return;
        }
        tile.style.backgroundColor = "#cceeff"; //changes background colour of selected tile to #cceeff
        tile.classList.add("highlighted"); //adds the class 'highlighted' so that next iteration of this function, the div with this class can be adjusted
        tile.classList.add("highlighted-once");
        selected1 = tile.id;
    });
}

function removeHighlight () {
    let contained = document.querySelectorAll("div.tile")
    for (i of contained) {
        if (i.classList.contains("highlighted-once")) { 
            i.classList.remove("highlighted-once");
            i.classList.remove("highlighted");
            selected1 = null;
        }
    }
}

//repsonsible for finding the currently selected tile
function selectedTile () {
    console.log("selectedTile");
    let contained = document.querySelectorAll("div.tile")
    for (i of contained) {
        if (i.classList.contains("highlighted")) { 
            return i;
        }
    }
}
//--------------------------------------------------------- HELP SECTION ---------------------------------------------------------//

//starts the time for the puzzle
function startTimer() {
    function Time(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const largerMinutes = minutes < 10 ? "0" + minutes : minutes;
      const largerSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      return `${largerMinutes}:${largerSeconds}`;
    }

    setInterval(() => {
      currentTime++;
      const finalTime = Time(currentTime);
      document.getElementById("timer").textContent = finalTime;
    }, 1000);
  }

//creates all of the elements in the 'help' section
function help() {
    let reset = document.createElement("p");
    reset.id = "reset";
    reset.innerText = "Reset";
    reset.addEventListener("click", selectReset);
    reset.classList.add("helpContent");
    document.getElementById("help").appendChild(reset);
    let hint = document.createElement("p");
    hint.id = "hint";
    hint.innerText = "Reveal Cell";
    hint.addEventListener("click", selectHint);
    hint.classList.add("helpContent");
    document.getElementById("help").appendChild(hint);
    let checkCell = document.createElement("p");
    checkCell.id = "checkCell";
    checkCell.innerText = "Check Cell";
    checkCell.addEventListener("click", selectCheckCell);
    checkCell.classList.add("helpContent");
    document.getElementById("help").appendChild(checkCell);
    let checkBlock = document.createElement("p");
    checkBlock.id = "checkBlock";
    checkBlock.innerText = "Check Block";
    checkBlock.addEventListener("click", selectCheckBlock);
    checkBlock.classList.add("helpContent");
    document.getElementById("help").appendChild(checkBlock);
    let checkPuzzle = document.createElement("p");
    checkPuzzle.id = "checkPuzzle";
    checkPuzzle.innerText = "Check Puzzle";
    checkPuzzle.addEventListener("click", selectCheckPuzzle);
    checkPuzzle.classList.add("helpContent");
    document.getElementById("help").appendChild(checkPuzzle);
    let submitPuzzle = document.createElement("p");
    submitPuzzle.id = "submitPuzzle";
    submitPuzzle.innerText = "Submit Puzzle";
    submitPuzzle.addEventListener("click", selectSubmit);
    submitPuzzle.classList.add("helpContent");
    document.getElementById("help").appendChild(submitPuzzle);
}

// --------------------------------------------------------- HELPER FUNCTIONS FOR RESET ---------------------------------------------------------//

//deletes all of the divs made at the start of the game to 'reset' them
function resetGame() {
    let board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    let boardDiv = document.getElementById("board"); 
    let newBoardDiv = document.createElement("div")
    newBoardDiv.id = "digits";
    boardDiv.appendChild(newBoardDiv);
}

//deletes all of the divs in the digit selection tile and removes any pre-existing selected tiles
function resetDigits () {
    numSelected = null;
    for (i = 1; i <= 9; i++) {
        document.getElementById(i).classList.remove("number-selected");
    }
}
// --------------------------------------------------------- FUNCTIONS FOR HELP SECTION ---------------------------------------------------------//

//functionality for the reset button
function selectReset() {
    resetGame();
    setGame();
    setTimeout(resetDigits, 10);
    currentTime = -1;
}

//functionality for the reveal cell button (i can change all of the names later but i am too lazy to do that right now)
function selectHint () {
    resetDigits ();
    fetch('/solution')
    .then(response => response.json())
    .then(data => {
        const { solution }= data;
        if (selectedTile() == null) {
            alert("Please select a square");
        }
        let id = selectedTile().id
        id.toString();
        let q = id.charAt(0);
        let r = id.charAt(2);
        selectedTile().innerText = solution[q][r];
    });
}

//functionality for the 'check cell' button
function selectCheckCell() {
    resetDigits ();
    fetch('/solution')
    .then(response => response.json())
    .then(data => {
        const { solution } = data;
        if (selectedTile() == null) {
            alert("Please select a square");
        }
        let id = selectedTile().id
        let b = selectedTile();
        id.toString();
        let q = id.charAt(0);
        let r = id.charAt(2);
        if (b.innerText == solution[q][r]) {
            removeHighlight ();
            b.style.backgroundColor = "lightgreen";
            setTimeout(function() {
                b.style.backgroundColor = "white";
              }, 2000);
        } else {
            removeHighlight ();
            b.style.backgroundColor = "lightcoral";
            setTimeout(function() {
                b.style.backgroundColor = "white";
              }, 2000);
        }
    });
}

//functionality for the 'check block' button
function selectCheckBlock() {
    resetDigits ();
    Promise.all([
        fetch('/solution').then(response => response.json()),
        fetch('/blocks').then(response => response.json())
    ])
        .then(([solutionData, blocksData]) => {
            const { solution } = solutionData;
            const { blocks } = blocksData;
            if (selectedTile() == null) {
                alert("Please select a square");
            }
            let tiles = document.querySelectorAll(".tile");
            for (let i = 0; i < tiles.length; i++) {
                let tile = tiles[i];
                if (tile.style.backgroundColor == "lightcoral" || tile.style.backgroundColor == "lightgreen") {
                    return;
                }
            }
            var tile = selectedTile();
            var j = 0;
            for (i = 1; i <= 9; i++) {
                let currentArray = blocks["b" + i];
                if (currentArray.includes(tile.id)) { 
                    currentArray.forEach(myFunction);
                    function myFunction (item) {
                        let coords = item.split("-");
                        let f = parseInt(coords[0]);
                        let g = parseInt(coords[1]);
                        let tileDiv = document.getElementById(currentArray[j]);
                        if (tileDiv.classList.contains("tile-start")) {
                            tileDiv.style.backgroundColor = "whitesmoke";
                        } else if (tileDiv.innerText == solution[f][g]) {
                            removeHighlight ();
                            tileDiv.style.backgroundColor = "lightgreen";
                              setTimeout(function() {
                                tileDiv.style.backgroundColor = "white";
                              }, 2000);
                        } else {
                            removeHighlight ();
                            tileDiv.style.backgroundColor = "lightcoral";
                            setTimeout(function() {
                                tileDiv.style.backgroundColor = "white";
                              }, 2000);
                        }
                    j++;
                }
            }
        }
    });
}

//functionality for the 'check puzzle' button
function selectCheckPuzzle() {
    resetDigits ();
    // compare the current board with the solution board and
    // apply green background colour to correct cells and 
    // red background colour to incorrect cells
    fetch('/solution')
    .then(response => response.json())
    .then(data => {
        const { solution } = data;
        let tiles = document.querySelectorAll(".tile");
        for (let i = 0; i < tiles.length; i++) {
            let tile = tiles[i];
            if (tile.style.backgroundColor == "lightcoral" || tile.style.backgroundColor == "lightgreen") {
                return;
            }
        }
        tiles.forEach(tile => {
            let coords = tile.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            let tileValue = tile.innerText;
            let solutionValue = solution[r][c]
            if (tile.classList.contains("tile-start")) {
                tile.style.backgroundColor = "whitesmoke";
            } else if (tileValue == solutionValue) {
                removeHighlight ();
                tile.style.backgroundColor = "lightgreen";
                setTimeout(function() {
                    tile.style.backgroundColor = "white";
                  }, 2000);
            } else {
                removeHighlight ();
                tile.style.backgroundColor = "lightcoral";
                setTimeout(function() {
                    tile.style.backgroundColor = "white";
                  }, 2000);
            }
        });
    });
}

//functionality for the 'submit puzzle' button
function selectSubmit() {
    resetDigits ();
    let time = document.getElementById('timer').innerHTML;
    fetch('/solution')
    .then(response => response.json())
    .then(data => {
        const { solution } = data;
    let currentBoard = [];
    let tiles = document.querySelectorAll(".tile");
    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        currentBoard.push(tile.innerText);
    }
    splitArray(currentBoard);
    function splitArray(array) {
        let board = [];
        for (let i = 0; i < array.length; i += 9) {
            board.push(array.slice(i, i + 9));
        }
        JSON.stringify(board)
        let fixedCurrentBoard = board.map(row => row.join(""));
        let arr = solution.toString();
        fixedCurrentBoard.toString();
        if (arr == fixedCurrentBoard) {
            localStorage.setItem('timer', time);
            window.location.href ="congratulations.html";
        } else {
            alert("The puzzle is incomplete. Please keep trying");
        }
    }
});
}

//--------------------------------------------------------- END OF HELP SECTION ---------------------------------------------------------//