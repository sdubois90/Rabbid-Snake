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

    let info = [ { alive: true }, { x:1 }, {y:1}, {direction:"D"} ];
    const keyState = {};
    window.onkeydown = function(event) {   // ou window.onkeydown = (e) => {keyState[e.code] = true;}
    keyState[event.code] = true;
    }
    window.onkeyup = function(event) {
        keyState[event.code] = false;
    }

    gameLoop();
    
    function gameLoop () {
        let snakeAlive = info[0].alive;

        setInterval(function () {

            if (snakeAlive) {

                switch (info[3].direction) {
                    case "D":
                        info[1].x += 1;
                        box[0].style.gridColumn = info[1].x;
                        // debugger;
                        break;
                    case "G":
                        info[1].x -= 1;
                        box[0].style.gridColumn = info[1].x;
                        break;
                    case "H":
                        info[2].y -= 1;
                        box[0].style.gridRow = info[2].y;
                        break;
                    case "B":
                        info[2].y+1;
                         box[0].style.gridRow = info[2].y;
                        break;
                }
            
            if (keyState["ArrowDown"]) {
                info[3].direction = "B";
                info[2].y+1;
                box[0].style.gridRow = info[2].y;

            } else if (keyState["ArrowUp"]) {
                info[3].direction = "H";
                info[2].y -= 1;
                box[0].style.gridRow = info[2].y;

            } else if (keyState["ArrowLeft"]) {
                info[3].direction = "G";
                info[1].x -= 1;
                box[0].style.gridColumn = info[1].x;
                
            } else if (keyState["ArrowRight"]) {
                info[3].direction = "D";
                info[1].x += 1;
                box[0].style.gridColumn = info[1].x;
            }

        } else if (!snakeAlive) {
            console.log("You lost");
        }
    }, 1000);

    // event.preventDefault(); // Prevents the arrow keys from scrolling the window
    }
}