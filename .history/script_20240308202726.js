document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const gridSize = 10;
    const cellSize = canvas.width / gridSize;
    const shipTypes = [5, 4, 3, 2];
    let ships = [];
    let shotsGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    function placeShips() {
        shipTypes.forEach(size => {
            let placed = false;
            while (!placed) {
                const direction = Math.random() > 0.5;
                let row = Math.floor(Math.random() * gridSize);
                let col = Math.floor(Math.random() * gridSize);
                if (canPlaceShip(row, col, size, direction)) {
                    const ship = { size: size, cells: [] }
                    for (let i = 0; i < size; i++) {
                        ship.cells.push({ x: col + (direction ? i : 0), y: row + (direction ? 0 : i) });
                    }
                    ships.push(ship);
                    placed = true;
                }
            }
        })
    }
    function canPlaceShip(row, col, size, direction) {
        for (let i = 0; i < size; i++) {
            const x = col + (direction ? i : 0)
            const y = row + (direction ? 0 : i);
            if (x >= gridSize || y >= gridSize || ships.some(ship => ship.cells.some(cell => cell.x === x && cell.y === y))) {
                return false
            }
        }
        return true;
    }
    function drawGrid(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ships.forEach(ship=>{
            ship.cells.forEach(cell=>{
             ctx.fillRect = (cell.x * cellSize,cell.y * cellSize,cellSize,cellSize);   
            })
        })
        for(let row =0;row<gridSize;row++){
            for(let col =0;col<gridSize;col++){
                ctx.strokeStyle = "#526E75";
                ctx.strokeRect(col * cellSize, row * cellSize, cellSize,cellSize)
                if(shotsGrid[row][col] === 1){
                    ctx.fillStyle = "#4E7968";
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize,cellSize);
                }
                else if(shotsGrid[row][col] === 2){
                    ctx.fillStyle = "red";
                    ctx.fillRect(col * cellSize, row* cellSize, cellSize,cellSize)
                }
            }
        }
    }
    

})




