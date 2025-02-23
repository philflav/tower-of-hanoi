let selectedDisk = null;
let moves = 0;
let optimalMoves = 0;
let gameEnded = false;

function createDisk(size) {
    const disk = document.createElement('div');
    disk.className = 'disk';
    disk.style.width = (size * 30 + 50) + 'px';
    disk.style.backgroundColor = `hsl(${size * 30}, 70%, 50%)`;
    disk.dataset.size = size;
    return disk;
}

function resetGame() {
    const diskCount = parseInt(document.getElementById('diskCount').value);
    optimalMoves = Math.pow(2, diskCount) - 1;
    document.getElementById('optimal').textContent = optimalMoves;
    moves = 0;
    document.getElementById('moves').textContent = moves;
    gameEnded = false;
    
    const towers = document.querySelectorAll('.tower');
    towers.forEach(tower => tower.innerHTML = '');
    
    const tower1 = document.getElementById('tower1');
    for (let i = diskCount; i > 0; i--) {
        tower1.appendChild(createDisk(i));
    }
    
    selectedDisk = null;
}

function showDialog(message) {
    const dialog = document.getElementById('gameDialog');
    const messageEl = document.getElementById('dialogMessage');
    messageEl.textContent = message;
    dialog.style.display = 'block';
}

function closeDialog() {
    document.getElementById('gameDialog').style.display = 'none';
    resetGame();
}

function checkWin() {
    if (gameEnded) return;
    
    const tower3 = document.getElementById('tower3');
    const diskCount = parseInt(document.getElementById('diskCount').value);
    
    if (tower3.children.length === diskCount) {
        gameEnded = true;
        if (moves <= optimalMoves) {
            showDialog('🎉 Congratulations! You solved the puzzle optimally! 🎉');
        } else {
            showDialog('Sorry, you exceeded the optimal number of moves.');
        }
        return true;
    }
    return false;
}
// Add these variables at the top with other global variables
let isAnimating = false;
const MOVE_DELAY = 1000; // 1 second between moves

// Add these new functions
async function moveDisk(fromTower, toTower) {
    return new Promise(resolve => {
        const disk = fromTower.lastElementChild;
        if (disk) {
            setTimeout(() => {
                toTower.appendChild(disk);
                moves++;
                document.getElementById('moves').textContent = moves;
                resolve();
            }, MOVE_DELAY);
        } else {
            resolve();
        }
    });
}

async function solveTowerOfHanoi(n, source, auxiliary, target) {
    if (n === 1) {
        await moveDisk(source, target);
        return;
    }
    await solveTowerOfHanoi(n - 1, source, target, auxiliary);
    await moveDisk(source, target);
    await solveTowerOfHanoi(n - 1, auxiliary, source, target);
}

async function showSolution() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Reset the game first
    resetGame();
    
    const tower1 = document.getElementById('tower1');
    const tower2 = document.getElementById('tower2');
    const tower3 = document.getElementById('tower3');
    const diskCount = parseInt(document.getElementById('diskCount').value);
    
    // Disable controls during animation
    document.getElementById('diskCount').disabled = true;
    document.querySelectorAll('button').forEach(btn => btn.disabled = true);
    
    // Solve the puzzle
    await solveTowerOfHanoi(diskCount, tower1, tower2, tower3);
    
    // Re-enable controls
    document.getElementById('diskCount').disabled = false;
    document.querySelectorAll('button').forEach(btn => btn.disabled = false);
    isAnimating = false;
    
    // Check if solution was optimal
    checkWin();
}
document.querySelectorAll('.tower').forEach(tower => {
    tower.addEventListener('click', () => {
        if (gameEnded) return;
        
        if (!selectedDisk) {
            if (tower.lastElementChild) {
                selectedDisk = tower.lastElementChild;
                selectedDisk.style.opacity = '0.5';
            }
        } else {
            const topDisk = tower.lastElementChild;
            if (!topDisk || parseInt(selectedDisk.dataset.size) < parseInt(topDisk.dataset.size)) {
                tower.appendChild(selectedDisk);
                selectedDisk.style.opacity = '1';
                selectedDisk = null;
                moves++;
                document.getElementById('moves').textContent = moves;
                
                if (checkWin()) {
                    setTimeout(resetGame, 1500);
                }
            } else {
                selectedDisk.style.opacity = '1';
                selectedDisk = null;
            }
        }
    });
});

window.onload = resetGame;