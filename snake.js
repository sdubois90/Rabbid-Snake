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
	// Loading page sound
	// var startSound = new Audio('./refresh.mp3');
	// startSound.play();
	let refreshMusic = new Howl({
	src: ['./refresh.mp3'],
	volume: 0.5,
	});
	refreshMusic.play();
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
	// Loading page sound
	let backgroundMusic = new Howl({
		src: ['./worldMap.mp3'],
		volume: 0.6,
		autoplay:true,
		loop:true,
	  });
	backgroundMusic.play();
});


function startGame() {
	let reset = document.getElementById("start");
	reset.textContent = "RESET";
	// Reloads the page upon clicking RESET
	reset.addEventListener("click", function() {
		window.location.reload(true);
	});
	// Starts the background music
	let startMusic = new Howl({
		src: ['./start.mp3'],
		volume: 2,
	  });
	startMusic.play();

	let pauseButton = document.getElementById('pause');
    let paused = false;
	let box = document.getElementsByClassName('box');
	let score = document.querySelector("#score span");
	let lose = document.getElementById("lose");
	lose.style.display = "none";
	let info = {
		alive: true,
        // x:0,
        // y:0,
        direction: "right",
        suprise: true,
        score:0,
	};

	let body = [
		{x:0,y:0}
	]

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

				// Son
				let stopSound = new Howl({
					src: ['./clicksound.mp3'],
					volume: 2,
				});
				stopSound.play()

				paused = false;
			} else {
				clearInterval(intervalId);

				let stopSound = new Howl({
					src: ['./clicksound.mp3'],
					volume: 2,
				  });
				  stopSound.play();

				paused = true;
			}
		}
		// First Apple appears and Snake too
		apple = surpriseAppears();
		box[(body[0].x) + (body[0].y)].style.background =
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
			if (box[(body[0].x) + (body[0].y)] === box[appleIndex.x + appleIndex.y]) {
				let eatSound = new Howl({
					src: ['./eat.mp3'],
					volume: 1,
				});
				eatSound.play()

				// On pushe un nouvel objet pour une queue lorsqu'on mange une pomme
				body.push( { x:body[0].x, y: body[0].y });

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

				// AJOUTER FONCTION ICI pour la tail avec boucle, on met ça ici pour récupérer la position avant qu'il avance
				// Donc sa position n-1, qu'on va récupérer après pour la première queue
				let formerHeadPositionX = body[0].x;
				let formerHeadPositionY = body[0].y;
				let previousTailX;
				let previousTailY;

				switch (info.direction) {
					case "right":
						// On définit x et y, et on les sépare dans la box[x+y], car si on n'avait que des x, on ne pourrait pas tourner à droite
						// par exemple en étant sur la 2e ligne, car x serait plus grand que 10
						// Ici, si on est case 55, alors "y" représente les dizaines et "x" les unités
						box[(body[0].x) + (body[0].y)].style.background = "rgb(165,202,73)";
						body[0].x += 1;
						if (body[0].x >= 10) {
							body[0].x = 0;
						}
						box[(body[0].x) + (body[0].y)].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
					case "left":
						box[(body[0].x) + (body[0].y)].style.background = "rgb(165,202,73)";
						if (body[0].x <= 0) {
							body[0].x = 10;
						}
						body[0].x -= 1;
						box[(body[0].x) + (body[0].y)].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
					case "up":
						box[(body[0].x) + (body[0].y)].style.background = "rgb(165,202,73)";
						body[0].y -= 10;
						if (body[0].y <= -10) {
							body[0].y = 90;
						}
						box[(body[0].x) + (body[0].y)].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
					case "down":
						box[(body[0].x) + (body[0].y)].style.background = "rgb(165,202,73)";
						body[0].y += 10;
						if (body[0].y >= 100) {
							body[0].y = 0;
						}
						box[(body[0].x) + (body[0].y)].style.background =
							"pink url('./Lapinpin.png') no-repeat center center / contain";
						break;
				}
				// ICI on reprend les 
				
				
				body.forEach(function (tail, index) {
					if (index === 0) {return;}
					if (index === 1) {
					box[(body[index].x) + (body[index].y)].style.background = "rgb(165,202,73)";
					// On stocke les valeurs actuelles de la première queue avant changement dans previousTailX/Y
					// On déclare les 2 variables previousTailX/Y en dehors, car sinon on ne peut pas y accéder dans le else
					// previousTailX/Y SERT SIMPLEMENT POUR FAIRE APPARAITRE L'INDEX 2
					previousTailX = tail.x; // 0 & 1
					previousTailY = tail.y;
					// La première queue reprend l'ancienne position de la tête
					tail.x = formerHeadPositionX; // 0 & 1
					tail.y = formerHeadPositionY;
					
					box[(body[index].x) + (body[index].y)].style.background = "pink url('./Lapinpin.png') no-repeat center center / contain";

					} else {
						box[(body[index].x) + (body[index].y)].style.background = "rgb(165,202,73)";
						// Ici, on déclare les variables des valeurs actuelles de la queue de l'index, qui seront ensuite prises par les suivantes
						let tailAfterX = tail.x; // undefined & 1
						let tailAfterY = tail.y;
						// La queue suivante prend la position de la queue d'avant au tour d'avant
						tail.x = previousTailX; // undefined & 1
						tail.y = previousTailY;
						// 
						previousTailX = tailAfterX; // undefined & 1
						previousTailY = tailAfterY;

						box[(body[index].x) + (body[index].y)].style.background = "pink url('./Lapinpin.png') no-repeat center center / contain";

						// Si on se touche la queue
						if (body[0].x === tailAfterX && body[0].y === tailAfterY) {
							snakeAlive = false;
							clearInterval(intervalId);
							lose.style.display = "block";
							lose.innerHTML = `YOUR SCORE = ${info.score}`;
							// Reloads the page upon clicking RESET
							reset.addEventListener("click", function() {
								window.location.reload(true);
							});
						}

						if (body[0].x === previousTailX && body[0].y === previousTailY) {
							snakeAlive = false;
							clearInterval(intervalId);
							lose.style.display = "block";
							lose.innerHTML = `YOUR SCORE = ${info.score}`;
							// Reloads the page upon clicking RESET
							reset.addEventListener("click", function() {
								window.location.reload(true);
							});
						}
					}

				});

			}
			// 	else if (!snakeAlive) {
				// 	clearInterval(intervalId);
				// 	lose.style.display = "block";
				// 	lose.innerHTML = `YOUR SCORE = ${info.score}`;
			// }
		}
		// event.preventDefault(); // Prevents the arrow keys from scrolling the window (only if bigger than the window)
	}
	gameLoop();
}