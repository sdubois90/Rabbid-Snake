window.addEventListener("load", function() {

    // Création du board
    let container = document.getElementById('grid-container');
    function drawGrid() {
        let box = document.createElement('div');
        box.classList.add('box');
        container.appendChild(box);
    }
    for (let i = 0; i<100; i++) {
        drawGrid();
    }

    // Création du bouton START
    let startButton = document.createElement('button');
    startButton.setAttribute("id", "start");
    document.getElementById('header').appendChild(startButton);
    startButton.textContent = "START";
    startButton.addEventListener("mouseover", startGame, {
        once:true             // Just once
    });
    // Création du bouton PAUSE
    let pauseButton = document.createElement('button');
    pauseButton.setAttribute('id','pause');
    document.getElementById('footer').appendChild(pauseButton);
    pauseButton.textContent = "PAUSE";
});


//// COURS //////

// Changer de case en case le .snake {background-color:green} avec :

// grid-row:2; // va à la ligne 2 = y
// grid-column:2; // va à la colonne d'à côté = x

// .snake {background-color:green; grid-row:2; grid-column:2}

/// FIN COURS ///////

// Ajouter classe snake sur box, puis retirer la classe et l'ajouter sur box d'à côté avec :
// let container = document.getElementById('grid-container');
// container.style.gridColumn = snakeXY[1].x // container.style.gridRow = snakeXY[2].y // = +1
// Il faut incrémenter/décrémenter snakeXY sur x [1] et sur y [2]

//                                                             start-line / end-line
// Lorsque le snake grandit on peut se servir de : grid-column:     x     / span 2;      (span = nombre de cases, ici ça prendra 2 cases)
//                                                 grid-row:        y     / span 1;      (Un des 2 devra toujours être à 1)

// SI HAUT/BAS (i=longueur du snake)         => grid-column : x / span 1;  => grid-row:    y / span i
// SI GAUCHE/DROITE (i=longueur du snake)    => grid-row :    y / span 1;  => grid-column: x / span i

/////////////////////

let cell = {
    snake: 0
};

function gameLoop() {
    // Loop over the entire board, and update every cell
    for (var y = 0; y < boardHeight; ++y) {
        for (var x = 0; x < boardWidth; ++x) {
            var cell = board[y][x];

            if (cell.snake) {
                cell.element.className = 'snake';
            }
            else {
                cell.element.className = '';
            }
        }
    }

    // This function calls itself, with a timeout of 1000 milliseconds
    setInterval(gameLoop, 2000);
}




[y][x]

#board .snake {
    background-color: green;
}

var cell = {
    snake: 0
};
snakeLength = 5;
snakeDirection = 'Up';

function gameLoop() {
    // Loop over the entire board, and update every cell
    for (var y = 0; y < boardHeight; ++y) {
        for (var x = 0; x < boardWidth; ++x) {
            var cell = board[y][x];

            if (cell.snake) {
                cell.element.className = 'snake';
            }
            else {
                cell.element.className = '';
            }
        }
    }

    // This function calls itself, with a timeout of 1000 milliseconds
    setTimeout(gameLoop, 1000);
}


// Set the center of the board to contain a snake
snakeX = Math.floor(boardWidth / 2);
snakeY = Math.floor(boardHeight / 2);
board[snakeY][snakeX].snake = 1;

// ça monte à l'infini
switch (snakeDirection) {
    case 'Up':    snakeY--; break;
    case 'Down':  snakeY++; break;
    case 'Left':  snakeX--; break;
    case 'Right': snakeX++; break;
}

board[snakeY][snakeX].snake = 1;

// This prevents the arrow keys from scrolling the window
event.preventDefault();





// RESTART GAME
// Check for walls, and restart if we collide with any
if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
    startGame()
}

// Update the board at the new snake position
board[snakeY][snakeX].snake = 1;

// Clear the board at the beginning of startGame()
for (var y = 0; y < boardHeight; ++y) {
    for (var x = 0; x < boardWidth; ++x) {
        board[y][x].snake = 0;
    }
}







// Initialisation du Snake sur 1 case
function startGame() {
    // let snake = document.getElementsByClassName('box')[Math.floor(Math.random()*100)];
    let box = document.getElementsByClassName('box');
    // let init = 0;
    // box[init].style.background="pink url('./Lapinpin.png') no-repeat center center / contain";
    box[0].classList.toggle('image'); // NE MARCHE PAS
    // //let image = "pink url('./Lapinpin.png') no-repeat center center / contain";
    box[0].style.backgroundColor = "pink";

    // let snakeX = box.style.gridColumn[snakeXY[1]];
    // let snakeY = box.style.gridRow[snakeXY[2]];

    let snakeXY = [ { alive: true }, { x:1 }, {y:1} ];
    let container = document.getElementById('grid-container');
console.log(container.style.gridColumn = snakeXY[1].x) // 1

    // box[0].style.gridColumn = snakeXY[1].x
    // let imageX = `${box[0]}.style.gridColumn = ${snakeXY[1].x}`; // Position selon x
    // console.log(imageX)
    // let imageY = `${box}.style.gridRow = ${snakeXY[2].y}`;    // Position selon y

    // snakeXY[1].x += 1;   // Si on incrémente x
    // imageX.classList.toggle('image');      // Ajoute classe avec image
    // snakeXY[2].y += 1;   // Si on incrémente y
    // imageY.classList.toggle('image');      // Ajoute classe avec image


    function gameLoop () {
        let snakeAlive = snakeXY[0].alive;

        window.onkeydown = function(event) {

        setInterval(function () {
// or setInterval (gameLoop, 2000) at the end of the gameLoop() function;
            while (snakeAlive && !event.code) {
                snakeXY[1].x += 1;
                imageX.classList.toggle('image');
            }

            if (snakeAlive && event.code) {

            if (event.code === "ArrowDown") {
                while(!event.code) {
                snakeXY[2].y += 1;
                imageY.classList.toggle('image');
            }
            } else if (event.code === "ArrowUp") {
                while(!event.code) {
                snakeXY[2].y -= 1;
                imageY.classList.toggle('image');
            }
            } else if (event.code === "ArrowLeft") {
                while(!event.code) {
                snakeXY[1].x -= 1;
                imageX.classList.toggle('image');
            }
            } else if (event.code === "ArrowRight") {
                while(!event.code) {
                snakeXY[1].x += 1;
                imageX.classList.toggle('image');
            }
            }

        } else if (!snakeAlive) {
            console.log("You lost");
        }
    }, 2000);

    event.preventDefault(); // Prevents the arrow keys from scrolling the window
    }
}
    gameLoop();
}

    // imageX[snakeXY[1].x].toggle('image'); // x : 0
    // box[snakeXY[2].y].toggle('image'); // y : 0


//     Changer de case en case le .snake {background-color:green} avec :

// grid-row:2; // va à la ligne 2 = y
// grid-column:2; // va à la colonne d'à côté = x

// .snake {background-color:green; grid-row:2; grid-column:2}

// Mettre un id="snake" par exemple dansle HTML et on modifie son style selon le x et le y



// function gameLoop (box) {

//     setInterval(function () {
//         while (snakeAlive) {
//         if (window.onkeydown) {
//             // snake[x] = snake[x-1];
//         } else if (window.onkeydown) {
//             // snake[x] = snake[x-10];
//         } else if (window.onkeydown) {
//             // snake[x] = snake[x+10];
//         } else {
//             // snake[x] = snake[x+1];
//             // snake[x+1] = snake[x];
//             x = x++;
//             snakeAppear(box);
//         }
//     }
// }, 3000);
// }








    // function snakeAppear(box) {
    //     return box[x].style.background="pink url('./Lapinpin.png') no-repeat center center / contain";
    // }
    // Ajouter la position initiale et faire avancer en boucle
    
    // let snakeAlive = true;
    // gameLoop();

// console.log(snakeXY[0].alive); // true
// console.log(snakeXY[1].x+1); // 1
    
    
// }


//     function gameLoop () {
//         while (snakeXY[0].alive) {
//         setInterval(function () {
//             snakeXY[1].x = snakeXY[1].x+1    // `translateX(${snakePosition.x}px)`
//             snake[x] = snake[x+1];
//         }, 3000);
//     }
//     }
//     gameLoop();
// }


// let imageHen = new Image();
// imageHen.src = "path/img.png";


// let corpsLapin = [[0,5][0,4][0,3][0,2][0,1]];
// let teteLapin = [0,5];

// let box1 = document.getElementsByClassName(".box");
// function createSnake () {
//     box1[teteLapin[0]].find(".box")[1].addClass("tete"); // Ligne du snake première coordonnée du snake puis 2e
// }










// class Snake {
//     constructor (name, color) {
//         this.name = name;
//         this.color = color;
//         length = 10;
//     }

//     color () {
//         style.color = this.color;
//     }
// }

// const redSnake = new Snake("Sir Pent", red);
// const greenSnake = new Snake("Python", green);


// Ma méthode :
<header id='header'></header>
    <main id="grid-container">
        <div>lapin</div>
        <div></div>
        <div></div>
        <div></div>
    </main>
 <footer id="footer"></footer>
// 2e méthode pour ne bouger que le background: la div du lapin bouge de div en div
        <div><div>lapin</div></div>
        <div></div>
        <div></div>
        <div></div>



// CHECKING COLLISION :

if (checkBoops(box.getBoundingClientRect(), box2.getBoundingClientRect())) {
    console.log("I am colliding !!");
  }

function checkBoops(rect1, rect2) {
    /*
    https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Collision detection implementation **HIGHLY** inspired by MDN.
    */
    if (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    ) {
      return true;
    }
    return false;
  }

























  window.addEventListener("load", function() {

    // Création du board
    let container = document.getElementById('grid-container');
    function drawGrid() {
        let box = document.createElement('div');
        box.classList.add('box');
        container.appendChild(box);
    }
    for (let i = 0; i<100; i++) {
        drawGrid();
    }

    // Création du bouton START
    let startButton = document.createElement('button');
    startButton.setAttribute("id", "start");
    document.getElementById('header').appendChild(startButton);
    startButton.textContent = "START";
    startButton.addEventListener("mouseover", startGame, {
        once:true             // Just once
    });
    // Création du bouton PAUSE
    let pauseButton = document.createElement('button');
    pauseButton.setAttribute('id','pause');
    document.getElementById('footer').appendChild(pauseButton);
    pauseButton.textContent = "PAUSE";
});



// Initialisation du Snake sur 1 case
function startGame() {
    // let snake = document.getElementsByClassName('box')[Math.floor(Math.random()*100)];
    let box = document.getElementsByClassName('box');

    box[0].style.background = "pink url('./Lapinpin.png') no-repeat center center / contain";

    // let snakeX = box.style.gridColumn[info[1]];
    // let snakeY = box.style.gridRow[info[2]];

    let info = [ { alive: true }, { x:1 }, {y:1}, {direction:"D"}, {surprise:true} ];
    const keyState = {};

    function surpriseAppears () {
        let random = Math.floor(Math.random()*100); // nbr 0-100
        box[random].style.backgroundColor = "red";  // div[0-100] = red
        info[4].surprise = true;
    }

    window.onkeydown = function(event) {   // ou window.onkeydown = (e) => {keyState[e.code] = true;}
    keyState[event.code] = true;
    }
    window.onkeyup = function(event) {
        keyState[event.code] = false;
    }
     
    
    function gameLoop () {
        let snakeAlive = info[0].alive;
        
        setInterval(function () {

            if (snakeAlive) {

                switch (info[3].direction) {
                    case "D":
                        info[1].x += 1;
                        box[0].style.gridColumn = info[1].x;                        
                        // box[0].style.gridRow = info[2].y;
                        // debugger;
                        break;
                    case "G":
                        info[1].x -= 1;
                        box[0].style.gridColumn = info[1].x;
                        // box[0].style.gridRow = info[2].y;
                        break;
                    case "H":
                        info[2].y -= 1;
                        box[0].style.gridRow = info[2].y;
                        // box[0].style.gridColumn = info[1].x;
                        break;
                    case "B":
                        info[2].y += 1;
                         box[0].style.gridRow = info[2].y;
                        //  box[0].style.gridColumn = info[1].x;
                        break;
                }
            
            if (keyState["ArrowDown"]) {
                info[3].direction = "B";
                info[2].y += 1;
                box[0].style.gridRow = info[2].y;
                // box[0].style.gridColumn = info[1].x;
                

            } else if (keyState["ArrowUp"]) {
                info[3].direction = "H";
                info[2].y -= 1;
                box[0].style.gridRow = info[2].y;
                // box[0].style.gridColumn = info[1].x;

            } else if (keyState["ArrowLeft"]) {
                info[3].direction = "G";
                info[1].x -= 1;
                box[0].style.gridColumn = info[1].x;
                // box[0].style.gridRow = info[2].y;
                
            } else if (keyState["ArrowRight"]) {
                info[3].direction = "D";
                info[1].x += 1;
                box[0].style.gridColumn = info[1].x;
                // box[0].style.gridRow = info[2].y;
            }

        } else if (!snakeAlive) {
            console.log("You lost");
        }
    }, 300);

    // event.preventDefault(); // Prevents the arrow keys from scrolling the window
    }
    gameLoop();
}