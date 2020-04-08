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
​
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
​
function startGame() {
	let pauseButton = document.getElementById("pause");
	let paused = false;
​
	let box = document.getElementsByClassName("box");
​
	let info = {
		alive: true,
		x: 0,
		y: 0,
		direction: "right",
		suprise: true,
	};
​
	let appleIndex = {
		x: 0,
		y: 0,
	};
​
	let snakeLength = 1;
​
	const keyState = {};
​
	window.onkeydown = function (event) {
		// ou window.onkeydown = (e) => {keyState[e.code] = true;}
		keyState[event.code] = true;
	};
	window.onkeyup = function (event) {
		keyState[event.code] = false;
	};
​
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
​
	setInterval(() => {
		changeDirection();
	}, 1);
​
	function gameLoop() {
		// Snake is alive
		let snakeAlive = info.alive;
		let intervalId = 0;
		pauseButton.addEventListener("click", pause);
​
		function pause() {
			if (paused) {
				intervalId = setInterval(maLoop, 300);
				paused = false;
			} else {
				clearInterval(intervalId);
				paused = true;
			}
		}
​
		// prompt("Appuyer sur une touche pour reprendre la partie")
​
		// First Apple appears and Snake too
		apple = surpriseAppears();
		box[info.x + info.y].style.background =
			"pink url('./Lapinpin.png') no-repeat center center / contain";
​
		function surpriseAppears() {
			appleIndex.x = Math.floor(Math.random() * 10); // Chiffre 0-9
			appleIndex.y = Math.floor(Math.random() * 10) * 10; // Nombre 10-90 par dizaines
			box[appleIndex.x + appleIndex.y].style.background =
				"#A880C5 url('./loup.png') no-repeat center center / contain";
			info.surprise = true;
		}
​
		function checkSurprise() {
			if (box[info.x + info.y] === box[appleIndex.x + appleIndex.y]) {
				snakeLength++;
				info.surprise = false;
				surpriseAppears();
			}
		}
​
		// Boucle du jeu
		intervalId = setInterval(maLoop, 300);
		function maLoop() {
			console.log("boucle gameplay");
​
			// Pauses the game with the pauseButton
			// pauseButton.addEventListener("click", pause);
​
			// function pause() {
			// 	if (!paused) {
			// 		paused = true;
			// 	} else if (paused) {
			// 		paused = false;
			// 	}
			// }
			// if (paused) {
			// 	return;
			// }
​
			if (snakeAlive) {
				//Checks if the Apple is eaten
				checkSurprise();
​
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
​
					case "left":
						box[info.x + info.y].style.background = "rgb(165,202,73)";
						if (info.x <= 0) {
							info.x = 10;
						}
						info.x -= 1;
						box[info.x + info.y].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
​
					case "up":
						box[info.x + info.y].style.background = "rgb(165,202,73)";
						info.y -= 10;
						if (info.y <= -10) {
							info.y = 90;
						}
						box[info.x + info.y].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
​
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