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
    // let init = 0;
    // box[init].style.background="pink url('./Lapinpin.png') no-repeat center center / contain";
    box[0].classList.toggle('image'); // NE MARCHE PAS
    // //let image = "pink url('./Lapinpin.png') no-repeat center center / contain";
    box[0].style.backgroundColor = "pink";

    // let snakeX = box.style.gridColumn[snakeXY[1]];
    // let snakeY = box.style.gridRow[snakeXY[2]];

    let snakeXY = [ { alive: true }, { x:1 }, {y:1} ];

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
    }, 3000);
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