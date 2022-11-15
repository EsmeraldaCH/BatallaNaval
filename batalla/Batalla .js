const board = document.querySelector("#board");
const boardAttack = document.querySelector("#boardAttack");
const boardP1 = document.querySelector("#boardP1");
const boardP2 = document.querySelector("#boardP2");
const position = document.querySelectorAll(".position");
let matrix = [];
let matrixAttack = [];
const sizeShip = [3,2,2,1];
let quantityShip = [1, 1, 1, 1];
let quantityShipP2 =  [1, 1, 1, 1];
let ship = {};
let shipPlayer2 = {};

class Juego{
    //ocultar tablero de la pagina
    hide(element) {
        var x = document.getElementById(element);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }


}



class Tablero extends Juego{

//Función para creación de tableros
     createMatrix(boardType, matrixType, func, type){
        for(let i=0; i<10; i++){
            let list = []
            let row = document.createElement("div");
            boardType.appendChild(row);
            row.className = "myRow"
            for(let j=0; j<10; j++){
                let grid = document.createElement("div");
                row.appendChild(grid);
                grid.className = "grid";
                grid.id = i + "," + j + "," + type;
                grid.addEventListener("click", func);
                list.push("");
            }
            matrixType.push(list)
        }
    }


}

//Función para seleccionar barco Jugador 1
function selectShipP1(event){
     shipData = event.target.className.split(" ");
    ship.position = shipData[0];
    ship.size = sizeShip[shipData[1]];
    ship.quantity = quantityShip[shipData[1]];
    ship.id = shipData[1];
}


//Función para seleccionar barco
function selectShipP2(event){
     shipDataP2 = event.target.className.split(" ");
    shipPlayer2.position = shipDataP2[0];
    shipPlayer2.size = sizeShip[shipDataP2[1]];
    shipPlayer2.quantity = quantityShipP2[shipDataP2[1]];
    shipPlayer2.id = shipDataP2[1];
}

//Creación de barcos
function enableShipP1( ) {
    for (let i = 0; i < position.length; i++) {
        let horizontal = document.createElement("div");
        position[i].appendChild(horizontal);
        horizontal.className = "horizontal "+ i;
        horizontal.addEventListener("click", selectShipP1)
        let vertical = document.createElement("div");
        position[i].appendChild(vertical);
        vertical.className = "vertical " + i;
        vertical.addEventListener("click", selectShipP1)
    }
}

//Creación de barcos player 1
function enableShipsP2( ) {
    for (let i = 0; i < position.length; i++) {
        let horizontal = document.createElement("div");
        position[i].appendChild(horizontal);
        horizontal.className = "horizontal "+ i;
        horizontal.addEventListener("click", selectShipP2)
        let vertical = document.createElement("div");
        position[i].appendChild(vertical);
        vertical.className = "vertical " + i;
        vertical.addEventListener("click", selectShipP2)
    }
}
const  t = new Tablero();
document.querySelector("#buttonStart").disabled = true;
t.createMatrix(board, matrix, selectPositionPlayerOne, "player");

t.hide("boardP1")
t.hide("boardP2")
enableShipP1();


//Función para seleccionar posición de los barcos Jugador 1
function selectPositionPlayerOne(event){
    if(ship.quantity > 0){
        let grid = event.target
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if(ship.position === "horizontal"){
            if((y + (ship.size - 1)) < 10){
                for(let i=y; i<(y + ship.size); i++){
                    matrix[x][i] = "ship";
                    document.getElementById(x + "," + i + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
        else if(ship.position === "vertical"){
            if((x + (ship.size - 1)) < 10){
                for(let i=x; i<(x + ship.size); i++){
                    matrix[i][y] = "ship";
                    document.getElementById(i + "," + y + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
    }
    else{
        alert("Debes seleccionar un barco disponible");
    }
}
//Función para seleccionar posición de los barcos Jugador 2
function selectPositionPlayerTwo(event){
    if(shipPlayer2.quantity > 0){
        let grid = event.target
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if(shipPlayer2.position === "horizontal"){
            if((y + (shipPlayer2.size - 1)) < 10){
                for(let i=y; i<(y + shipPlayer2.size); i++){
                    matrixAttack[x][i] = "ship";
                    document.getElementById(x + "," + i + "," + "player2").className += " selected";
                }
                quantityShipP2[shipPlayer2.id] -= 1;
                shipPlayer2 = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
        else if(shipPlayer2.position === "vertical"){
            if((x + (shipPlayer2.size - 1)) < 10){
                for(let i=x; i<(x + shipPlayer2.size); i++){
                    matrixAttack[i][y] = "ship";
                    document.getElementById(i + "," + y + "," + "player2").className += " selected";
                }
                quantityShipP2[shipPlayer2.id] -= 1;
                shipPlayer2 = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
    }
    else{
        alert("Debes seleccionar un barco disponible");
    }
}
//Función de botón iniciar juego
function turnoJ2(){
    const  t = new Tablero();
//Creación de tablero jugador
    t.hide("board");
    t.createMatrix(boardAttack, matrixAttack, selectPositionPlayerTwo, "player2");
    enableShipsP2();

    document.querySelector("#button").disabled = true;
    document.querySelector("#buttonStart").disabled = false;

}

function startGame(){
    const  t = new Tablero();
    t.hide("boardAttack");
    t.hide("boardP2");



    document.querySelector("#buttonStart").disabled = true;
    t.createMatrix(boardP1, matrix, shotP2, "playerA");
    t.createMatrix(boardP2, matrixAttack, checkShot, "playerB");
}

//Verificar tiro de jugador
function checkShot(event){

    t.hide("boardP1");
    let grid = event.target
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);
    if(matrixAttack[x][y] === "ship"){
        alert("Muy bien Jugador 1, acertaste. Vuelve a jugar");
        matrixAttack[x][y] = "hit";
        document.getElementById(x + "," + y + "," + "playerB").className += " hit";
        checkWinner(matrixAttack, "player")
        t.hide("boardP1");
    }
    else{
        alert("Mal Jugador 1! tu disparo cayó al agua");
        matrixAttack[x][y] = "miss";
        document.getElementById(x + "," + y + "," + "playerB").className += " miss";
        shotP2()
    }
}
//Jugada del jugador 2
function shotP2(event){

    t.hide("boardP2");
    let grid = event.target
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);
    if(matrix[x][y] === "ship"){
        alert("Muy bien Jugador 2, acertaste. Vuelve a jugar");
        matrix[x][y] = "hit";
        document.getElementById(x + "," + y+ "," + "playerA").className += " hit";
        checkWinner(matrix, "player2");
        t.hide("boardP2");
    }

    else{
        alert("El disparo del Jugador 2 cayó al agua");
        matrix[x][y] = "miss";
        document.getElementById(x + "," + y+ "," + "playerA").className += " miss";
        checkShot();
    }
}
//Revisar ganador
function checkWinner(matrix, player){
    for(let i=0; i<10; i++){
        let arraychecked = matrix[i].filter((index)=>{return index === "ship"})
        if(arraychecked.length > 0){
            return
        }
    }

    if(player === "player2"){
        alert("Ha ganado el Jugador 2");
        location.reload();
    }
    else{
        alert("Ha ganado el Jugador 1!!!");
        location.reload();
    }
}

//ESMERALDA CRUZ HERNANDEZ