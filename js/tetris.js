// 変数定義
const width = 10;
const height = 20;
const nextWidth = 4;
const nextHeight = 4;
const blockSize = 4;

let tetris = {
    nextBlock: null,

    cells: null,
    middleLeftCol: 0,
    fallingInterval: null,
    timerId: 0,

    fallingBlock: {
        coordinate: {x: 0, y:0},
        block: null,
        shepeIndex: 0
    },

    score: 0,
    level: 1,
    lines: 0
}

// ブロック定義
const blocks = [
    {
        name: 'I',
        shapes: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]

        ]
    },
    {
        name: 'J',
        shapes: [
            [
                [0, 0, 0, 0],                
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0]
            ]
        ]
    },
    {
        name: 'L',
        shapes: [
            [
                [0, 0, 0, 0],                
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [1, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]

        ]
    },
    {
        name: 'S',
        shapes: [
            [
                [0, 0, 0, 0],                
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [1, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0]
            ]

        ]
    },
    {
        name: 'Z',
        shapes: [
            [
                [0, 0, 0, 0],                
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 1, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0]
            ]

        ]
    },
    {
        name: 'T',
        shapes: [
            [
                [0, 0, 0, 0],                
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        ]
    },
    {
        name: 'O',
        shapes: [
            [
                [0, 0, 0, 0],                
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],                
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        ]
    }
];

// 色定義
var colorMap = {
    I: 'cyan', J: '#4444ff', L: 'orange', S: 'lime', Z: 'red', T: 'magenta', O: 'yellow'
}

// スコアセット
function setScore() {
    $('#level').html('Level: ' + tetris.level);
    $('#score').html('Score: ' + tetris.score);
    $('#lines').html('Lines: ' + tetris.lines);
}

// リセット
function reset() {
    tetris.cells = [];
    for(let row = 0; row < height + blockSize; row++) {
        let line = [];
        for(let col = 0; col < width; col++) {
            line.push('');
        }
        tetris.cells.push(line);
    }

    $('#message').html('');

    tetris.score = 0;
    tetris.lines = 0;
    tetris.level = 1;
    tetris.fallingInterval = 1000;

    setScore();

    createFieldCells();
    createNextCells();
    setNextBlock();    
}

// 画面準備
function prepare() {
    reset();
    let diff = width - blockSize;
    if(diff % 2 == 1) {
        diff = diff + 1;
    }
    tetris.middleLeftCol = diff / 2;

    $('#start_button').click(onClickStart);
    $('#left_button').click(moveLeft);
    $('#right_button').click(moveRight);
    $('#rotate_button').click(rotate);
    $('#down_button').click(drop);
    $(window).keydown(
        function(e) {
            onKey(e.keyCode);
        }
    );
}

// セル作成
function createFieldCells() {
    $('#table').html('');
    for(let i = 0; i < height; i++) {
        let row = i + blockSize;
        let rowId = 'row' + row;
        $('#table').append('<tr id="' + rowId + '" class="line"></tr>');
        for(let j = 0; j < width; j++) {
            let col = j;
            let cellId = 'cell' + row + '-' + col;
            $('#' + rowId).append('<td id="' + cellId + '" class="cell"></tr>');
            $('#' + cellId).css('background-color', 'black');
            $('#' + cellId).html('');
        }
    }
}

// Next のセル作成
function createNextCells() {
    $('#next_table').html('');
    for(let row = 0; row < nextHeight; row++) {
        let rowId = 'next_row' + row;
        $('#next_table').append('<tr id="' + rowId + '" class="line"></tr>');

        for(let col = 0; col < nextWidth; col++) {
            let cellId = 'next_cell' + row + '-' + col;
            $('#' + rowId).append('<td id="' + cellId + '" class="cell"></tr>');
            $('#' + cellId).css('background-color', 'black');
        }
    }
}

// 次のブロックセット
function setNextBlock() {
    const index = Math.floor(blocks.length * Math.random())
    const block = blocks[index];
    const color = colorMap[block.name];
    const shape = block.shapes[0];

    tetris.nextBlock = block;

    for(let row = 0; row < nextHeight; row++) {
        for(col = 0; col < nextWidth; col++) {
            const id = 'next_cell' + row + '-' + col;
            if(shape[row][col] > 0) {
                $('#' + id).css('background-color', color);
            }
            else {
                $('#' + id).css('background-color', 'black');
            }
        }
    }
}

// ブロック交換
function changeBlock() {
    tetris.fallingBlock.block = tetris.nextBlock;
    tetris.fallingBlock.coordinate = {x: tetris.middleLeftCol, y: 0};
    tetris.fallingBlock.shapeIndex = 0;
    setNextBlock();
}

// 重なり判定
function isOverlapping(block, shapeIndex, x, y) {
    let overlapping = false;

    const shape = block.shapes[shapeIndex];
    for(let i = 0; i < blockSize; i++) {
        const row = y + i;
        for(let j = 0; j < blockSize; j++) {
            const col = x + j;

            if(shape[i][j] == 1) {
                if(row >= tetris.cells.length) {
                    overlapping = true;
                }
                else if(col < 0 || col >= width) {
                    overlapping = true;
                }
                else if(row >= 0 && tetris.cells[row][col] !== '') {
                    overlapping = true;
                }
            }
        }
    }
    return overlapping;
}

// 描画
function draw() {
    for(let row = blockSize; row < height + blockSize; row++) {
        for(let col = 0; col < width; col++) {
            const name = tetris.cells[row][col];
            let color = 'black';
            if(name !== '') {
                color = colorMap[name];
            }
            const cellId = 'cell' + row + '-' + col;
            $('#' + cellId).css('background-color', color);
        }
    }

    const block = tetris.fallingBlock.block;
    const shape = block.shapes[tetris.fallingBlock.shapeIndex];
    const color = colorMap[block.name];
    for(let i = 0; i < blockSize; i++) {
        const row = tetris.fallingBlock.coordinate.y + i;
        for(let j = 0; j < blockSize; j++) {
            const col = tetris.fallingBlock.coordinate.x + j;
            if(shape[i][j] == 1) {
                const cellId = 'cell' + row + '-' + col;
                $('#' + cellId).css('background-color', color);
            }
        }
    }
}

// メッセージ
function addScore(count) {
    if(count > 0) {
        draw();
        tetris.lines += count;
        if(count === 1) {
            $('#message').html('Single!');
            tetris.score = tetris.score + 40;
        }
        else if(count === 2) {
            $('#message').html('Double!!');
            tetris.score = tetris.score + 100;
        }
        else if(count === 3) {
            $('#message').html('Triple!!!');
            tetris.score = tetris.score + 300;
        }
        else if(count === 4) {
            $('#message').html('Tetris!!!!');
            tetris.score = tetris.score + 1200;
        }

        const newLevel = (tetris.lines - (tetris.lines % 5)) / 5 + 1;
        if(newLevel > tetris.level) {
            tetris.level = newLevel;
            tetris.fallingInterval = Math.floor(tetris.fallingInterval * 0.9);
        }
        setScore();
    }
    else {
        $('#message').html('');
    }    
}

// セルの確認
function checkCells() {
    let count = 0;
    for(let row = 0; row < height + blockSize; row++) {
        let flag = true;
        for(let col = 0; col < width; col++) {
            if(tetris.cells[row][col] === '') {
                flag = false;
            }
        }

        if(flag) {
            count++;
            for(let col = 0; col < width; col++) {
                tetris.cells[row][col] = '';
            }
        }
    }
    addScore(count);
}

// セルの並べ替え
function arrangeCells() {
    let line = height + blockSize - 1;
    for(let row = height + blockSize - 1; row >= 0; row--) {
        let isBlank = true;
        for(let col = 0; col < width; col++) {
            if(tetris.cells[row][col] !== '') {
                isBlank = false;
            }
        }
        if(!isBlank) {
            if(row < line) {
                for(var col = 0; col < width; col++) {
                    tetris.cells[line][col] = tetris.cells[row][col];
                    tetris.cells[row][col] = '';
                }
            }
            line--;
        }
    }
}

// 続行可能判定
function canContinue() {
    let result = true;

    const shape = tetris.fallingBlock.block.shapes[tetris.fallingBlock.shapeIndex];

    for(let i = 0; i < blockSize; i++) {
        const row = i;
        for(let j = 0; j < blockSize; j++) {
            const col = tetris.middleLeftCol + j;
            if(shape[i][j] === 1 && tetris.cells[row][col] !== '') {
                result = false;
            }
        }
    }

    return result;    
}

// ブロック確定
function commit() {
    clearInterval(tetris.timerId);

    const block = tetris.fallingBlock.block;
    const shape = block.shapes[tetris.fallingBlock.shapeIndex];
    for(let i = 0; i < blockSize; i++) {
        const row = tetris.fallingBlock.coordinate.y + i;
        for(let j = 0; j < blockSize; j++) {
            const col = tetris.fallingBlock.coordinate.x + j;
            if(shape[i][j] == 1) {
                tetris.cells[row][col] = block.name;
            }
        }
    }

    changeBlock();
    checkCells();
    arrangeCells();

    if(canContinue()) {
        tetris.timerId = setInterval(proceed, tetris.fallingInterval);
    }
    else {
        finish();
    }
}

// 処理を進める
function proceed() {
    const block = tetris.fallingBlock.block;
    const shapeIndex = tetris.fallingBlock.shapeIndex;
    const x = tetris.fallingBlock.coordinate.x;
    const y = tetris.fallingBlock.coordinate.y;

    if(isOverlapping(block, shapeIndex, x, y + 1)) {
        commit();
    }
    else {
        const row = tetris.fallingBlock.coordinate.y;
        tetris.fallingBlock.coordinate.y = row + 1;
        draw();
    }
}

// ゲームオーバー
function finish() {
    $('#message').html('Game Over!!!');
    for(let row = blockSize; row < height + blockSize; row++) {
        for(let col = 0; col < width; col++) {
            if(tetris.cells[row][col] !== '') {
                const cellId = 'cell' + row + '-' + col;
                $('#' + cellId).css('background-color', 'grey');
            }
        }
    }
}

function move(dx, dy) {
    const block = tetris.fallingBlock.block;
    const shapeIndex = tetris.fallingBlock.shapeIndex;
    const x = tetris.fallingBlock.coordinate.x;
    const y = tetris.fallingBlock.coordinate.y;

    if(!isOverlapping(block, shapeIndex, x + dx, y + dy)) {
        tetris.fallingBlock.coordinate.x = x + dx;
        draw();
    }
}

// 左へ移動
function moveLeft() {
    move(-1, 0);
}

// 右へ移動
function moveRight() {
    move(1, 0);
}

// 回転
function rotate() {
    const block = tetris.fallingBlock.block;
    const shapeIndex = tetris.fallingBlock.shapeIndex;
    const nextShapeIndex = (shapeIndex + 1) % 4;

    let x = -1;
    let y = -1;
    let gap1 = 1000;
    let gap2 = 1000;
    for(let i = -2; i <= 2; i++) {
        for(let j = -2; j <= 2; j++) {
            const currentX = tetris.fallingBlock.coordinate.x + j;
            const currentY = tetris.fallingBlock.coordinate.y + i;
            if(!isOverlapping(block, nextShapeIndex, currentX, currentY)) {
                const currentGap1 = Math.abs(i) + Math.abs(j);
                const currentGap2 = Math.abs(i - j);
                if(currentGap1 < gap1 
                        || (currentGap1 == gap2 && currentGap2 < gap2)) {
                    x = currentX;
                    y = currentY;
                    gap1 = currentGap1;
                    gap2 = currentGap2;
                }
            }
        }
    }

    if(x >= 0 && y >= 0) {
        tetris.fallingBlock.shapeIndex = nextShapeIndex;
        tetris.fallingBlock.coordinate.x = x;
        tetris.fallingBlock.coordinate.y = y;
        draw();
    }
}

// ブロックを落とす
function drop() {
    const block = tetris.fallingBlock.block;
    const shapeIndex = tetris.fallingBlock.shapeIndex;
    let x = tetris.fallingBlock.coordinate.x;
    let y = tetris.fallingBlock.coordinate.y;
    let distance = 0;

    while(!isOverlapping(block, shapeIndex, x, y + 1)) {
        y += 1;
        distance += 1;
    }

    if(distance > 0) {
        tetris.fallingBlock.coordinate.y = y;
    }
    tetris.score = tetris.score + distance;
    setScore();
    draw();

    commit();
}


// 開始ボタンクリック
function onClickStart() {
    const name = $('#start_button').html();
    if(name === 'Start') {
        changeBlock();        
        tetris.timerId = setInterval(proceed, tetris.fallingInterval);
        $('#start_button').html('Reset');
    }
    else if(name === 'Reset') {
        clearInterval(tetris.timerId);
        reset();
        $('#start_button').html('Start');
    }
}

// キーボードイベント
function onKey(code) {
    if(code === 37) {    // Left
        moveLeft();
    }
    else if(code === 38) {    // Up
        rotate();        
    }
    else if(code === 39) {    // Right
        moveRight();
    }
    else if(code === 40) {    // Down
        drop();
    }
}
