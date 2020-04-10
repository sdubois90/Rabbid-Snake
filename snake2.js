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

























  window.addEventListener("load", function () {
	// Création du board
	let container = document.getElementById("grid-container");
	function drawGrid() {
		let box = document.createElement("div");
		box.classList.add("box");
		container.appendChild(box);
	}
	for (let i = 0; i < 100; i++) {
		drawGrid();
	}
	// Création du bouton START
	let startButton = document.createElement("button");
	startButton.setAttribute("id", "start");
	document.getElementById("header").appendChild(startButton);
	startButton.textContent = "START";
	startButton.addEventListener("click", startGame, {
		once: true, // Just once
	});
	// Création du bouton PAUSE
	let pauseButton = document.createElement("button");
	pauseButton.setAttribute("id", "pause");
	document.getElementById("footer").appendChild(pauseButton);
	pauseButton.textContent = "PAUSE";
});
function startGame() {
	let pauseButton = document.getElementById('pause');
    let paused = false;
    let score = document.querySelector("#score span");
    let box = document.getElementsByClassName('box');
	let info = {
		alive: true,
        x:0,
        y:0,
        direction: "right",
        suprise: true,
        score:0,
        snakeLength:1
	};
	let appleIndex = {
		x: 0,
		y: 0,
	};
	const keyState = {};
	window.onkeydown = function (event) {
		// ou window.onkeydown = (e) => {keyState[e.code] = true;}
		keyState[event.code] = true;
	};
	window.onkeyup = function (event) {
		keyState[event.code] = false;
	};
	// Affiliée à window.onkeyup/onkeydown, donc il est pris en compte à chaque fois que l'on appuie sur une touche
	function changeDirection() {
		if (keyState["ArrowDown"]) {
			info.direction = "down";
		} else if (keyState["ArrowUp"]) {
			info.direction = "up";
		} else if (keyState["ArrowLeft"]) {
			info.direction = "left";
		} else if (keyState["ArrowRight"]) {
			info.direction = "right";
		}
	}
	setInterval(() => {
		changeDirection();
	}, 1);
	function gameLoop() {
		let snakeAlive = info.alive;
		// Pauses the game with the pauseButton
		let intervalId = 0;
		pauseButton.addEventListener("click", pause);
		function pause() {
			if (paused) {
				intervalId = setInterval(maLoop, 300);
				paused = false;
			} else {
				clearInterval(intervalId);
				paused = true;
			}
		}
		// First Apple appears and Snake too
		apple = surpriseAppears();
		box[info.x + info.y].style.background =
			"pink url('./Lapinpin.png') no-repeat center center / contain";
		function surpriseAppears() {
			appleIndex.x = Math.floor(Math.random() * 10); // Chiffre 0-9
			appleIndex.y = Math.floor(Math.random() * 10) * 10; // Nombre 10-90 par dizaines
			
			if ( Math.floor(Math.random()*3) === 0 ) {
			box[appleIndex.x + appleIndex.y].style.background =
				"lightgrey url('./elephant.png') no-repeat center center / contain";
			} else if (Math.floor(Math.random()*3) === 1) {
				box[appleIndex.x + appleIndex.y].style.background =
					"#A880C5 url('./loup.png') no-repeat center center / contain";
			} else {
				box[appleIndex.x + appleIndex.y].style.background =
					"black url('./Lapinpin.png') no-repeat center center / contain";
			}
			info.surprise = true;
		}
		function checkSurprise() {
			if (box[info.x + info.y] === box[appleIndex.x + appleIndex.y]) {
                // switch (info.direction) {
				// 	case "right":
				// 		body.push( { x:(body[0].x)-1, y: body[0].y });
				// 		break;
				// 	case "left":
				// 		body.push( { x:(body[0].x)+1, y: body[0].y });
				// 		break;
				// 	case "up":
				// 		body.push( { x:body[0].x, y: (body[0].y)+10 });
				// 		break;
				// 	case "down":
				// 		body.push( { x:body[0].x, y: (body[0].y)-10 });
				// 		// box[(body[body.length-1].x) + (body[body.length-1].y)].style.background = "pink url('./Lapinpin.png') no-repeat center center / contain";
				// 		break;
				// }
				info.snakeLength+=1;
                info.surprise = false;
                surpriseAppears();
                info.score++;
                score.innerHTML = info.score;
			}
		}
		// Boucle du jeu : met setInterval dans une variable initialisée à 0
		intervalId = setInterval(maLoop, 300);
		function maLoop() {

			if (snakeAlive) {
				//Checks if the Apple is eaten
				checkSurprise();
				switch (info.direction) {
					case "right":
						// On définit x et y, et on les sépare dans la box[x+y], car si on n'avait que des x, on ne pourrait pas tourner à droite
						// par exemple en étant sur la 2e ligne, car x serait plus grand que 10
						// Ici, si on est case 55, alors "y" représente les dizaines et "x" les unités
						box[info.x + info.y].style.background = "rgb(165,202,73)";
						info.x += 1;
						if (info.x >= 10) {
							info.x = 0;
						}
						box[info.x + info.y].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
					case "left":
						box[info.x + info.y].style.background = "rgb(165,202,73)";
						if (info.x <= 0) {
							info.x = 10;
						}
						info.x -= 1;
						box[info.x + info.y].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
					case "up":
						box[info.x + info.y].style.background = "rgb(165,202,73)";
						info.y -= 10;
						if (info.y <= -10) {
							info.y = 90;
						}
						box[info.x + info.y].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
					case "down":
						box[info.x + info.y].style.background = "rgb(165,202,73)";
						info.y += 10;
						if (info.y >= 100) {
							info.y = 0;
						}
						box[info.x + info.y].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
				}
			} else if (!snakeAlive) {
				console.log("You lost");
			}
		}
		// event.preventDefault(); // Prevents the arrow keys from scrolling the window
	}
	gameLoop();
}



Yesterday I took care of all the basic functionalities such as moving and the scoring and pausing,
now I still have either the styling to improve or to focus on the most complicated part: the head + tail and the size

Add Array = [ {x:8 y:8}, {} ]

head is always [0.x + 0.y]
tail is always []



Faire bouger queue avec tête :

let oldHeadPositionX = body[0].x;
let oldHeadPositionY = body[0].y;

Puis :
let previousTailX;
let previousTailY;

for (let i=0;i<this.tail.length;i++) {
    previousTailX = this.tail[i].x;
    previousTailY = this.tail[i].y;
    if (i === 0) {
        previousTailX = this.tail[i].x;
        previousTailY = this.tail[i].y;
        this.tail[i].x = oldHeadPositionX;
        this.tail[i].y = oldHeadPositionY;
    } else {
        let oldY = this.tail[i].y;
        let oldX = this.tail[i].x;
        this.tail[i].x = previousTailX;
        this.tail[i].y = previousTailY;
        previousTailX = oldX;
        previousTailY = oldY;
    }
}
}


// Fichier audio 100% JS
var audio = new Audio('audio.file.mp3');
audio.play()