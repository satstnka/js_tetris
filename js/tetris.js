// 変数定義
var width = 10;
var height = 20;
var nextWidth = 4;
var nextHeight = 4;
var blockSize = 4;

var currentBlock = null;
var nextBlock = null;

var fallingBlock = {
    coordinate: [0, 0],
    block: null,
    shepeIndex: 0
};

var cells = null;
var middleLeftCol = 0;
var fallingInterval = null;
var timerId = 0;

var score = 0;
var level =  1;
var lines = 0;

// ブロック定義
blocks = [
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
    $('#level').html('Level: ' + level);
    $('#score').html('Score: ' + score);
    $('#lines').html('Lines: ' + lines);
}

// リセット
function reset() {
    cells = [];
    for(var row = 0; row < height + blockSize; row++) {
        var line = [];
        for(var col = 0; col < width; col++) {
            line.push('');
        }
        cells.push(line);
    }

    $('#message').html('');

    score = 0;
    lines = 0;
    level = 1;
    fallingInterval = 1000;

    setScore();

    createFieldCells();
    createNextCells();
    setNextBlock();    
}

// 画面準備
function prepare() {
    reset();

    var diff = width - blockSize;
    if(diff % 2 == 1) {
        diff = diff + 1;
    }
    middleLeftCol = diff / 2;

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
    for(var i = 0; i < height; i++) {
        var row = i + blockSize;
        var rowId = 'row' + row;
        $('#table').append('<tr id="' + rowId + '" class="line"></tr>');
        for(var j = 0; j < width; j++) {
            var col = j;
            var cellId = 'cell' + row + '-' + col;
            $('#' + rowId).append('<td id="' + cellId + '" class="cell"></tr>');
            $('#' + cellId).css('background-color', 'black');
            $('#' + cellId).html('');
        }
    }
}

// Next のセル作成
function createNextCells() {
    $('#next_table').html('');
    for(var row = 0; row < nextHeight; row++) {
        var rowId = 'next_row' + row;
        $('#next_table').append('<tr id="' + rowId + '" class="line"></tr>');

        for(var col = 0; col < nextWidth; col++) {
            var cellId = 'next_cell' + row + '-' + col;
            $('#' + rowId).append('<td id="' + cellId + '" class="cell"></tr>');
            $('#' + cellId).css('background-color', 'black');
        }
    }
}

// 次のブロックセット
function setNextBlock() {
    var index = Math.floor(blocks.length * Math.random())
    var block = blocks[index];
    var color = colorMap[block.name];
    var shape = block.shapes[0];

    nextBlock = block;

    for(var row = 0; row < nextHeight; row++) {
        for(col = 0; col < nextWidth; col++) {
            var id = 'next_cell' + row + '-' + col;
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
    fallingBlock.block = nextBlock;
    fallingBlock.coordinate = [middleLeftCol, 0];
    fallingBlock.shapeIndex = 0;
    setNextBlock();
}

// 重なり判定
function isOverlapping(block, shapeIndex, x, y) {
    var overlapping = false;

    var shape = block.shapes[shapeIndex];
    for(var i = 0; i < blockSize; i++) {
        var row = y + i;
        for(var j = 0; j < blockSize; j++) {
            var col = x + j;

            if(shape[i][j] == 1) {
                if(row >= cells.length) {
                    overlapping = true;
                }
                else if(col < 0 || col >= width) {
                    overlapping = true;
                }
                else if(cells[row][col] !== '') {
                    overlapping = true;
                }
            }
        }
    }
    return overlapping;
}

// 描画
function draw() {
    for(var row = blockSize; row < height + blockSize; row++) {
        for(var col = 0; col < width; col++) {
            var name = cells[row][col];
            var color = 'black';
            if(name !== '') {
                color = colorMap[name];
            }
            var cellId = 'cell' + row + '-' + col;
            $('#' + cellId).css('background-color', color);
        }
    }

    var block = fallingBlock.block;
    var shape = block.shapes[fallingBlock.shapeIndex];
    var color = colorMap[block.name];
    for(var i = 0; i < blockSize; i++) {
        var row = fallingBlock.coordinate[1] + i;
        for(var j = 0; j < blockSize; j++) {
            var col = fallingBlock.coordinate[0] + j;
            if(shape[i][j] == 1) {
                var cellId = 'cell' + row + '-' + col;
                $('#' + cellId).css('background-color', color);
            }
        }
    }
}

// メッセージ
function addScore(count) {
    if(count > 0) {
        draw();
        lines += count;
        if(count === 1) {
            $('#message').html('Single!');
            score = score + 40;
        }
        else if(count === 2) {
            $('#message').html('Double!!');
            score = score + 100;
        }
        else if(count === 3) {
            $('#message').html('Triple!!!');
            score = score + 300;
        }
        else if(count === 4) {
            $('#message').html('Tetris!!!!');
            score = score + 1200;
        }

        var newLevel = (lines - (lines % 5)) / 5 + 1;
        if(newLevel > level) {
            level = newLevel;
            fallingInterval = Math.floor(fallingInterval * 0.9);
        }
        setScore();
    }
    else {
        $('#message').html('');
    }    
}

// セルの確認
function checkCells() {
    var count = 0;
    for(var row = 0; row < height + blockSize; row++) {
        var flag = true;
        for(var col = 0; col < width; col++) {
            if(cells[row][col] === '') {
                flag = false;
            }
        }

        if(flag) {
            count++;
            for(var col = 0; col < width; col++) {
                cells[row][col] = '';
            }
        }
    }
    addScore(count);
}

// セルの並べ替え
function arrangeCells() {
    var line = height + blockSize - 1;
    for(var row = height + blockSize - 1; row >= 0; row--) {
        var isBlank = true;
        for(var col = 0; col < width; col++) {
            if(cells[row][col] !== '') {
                isBlank = false;
            }
        }
        if(!isBlank) {
            if(row < line) {
                for(var col = 0; col < width; col++) {
                    cells[line][col] = cells[row][col];
                    cells[row][col] = '';
                }
            }
            line--;
        }
    }
}

// 続行可能判定
function canContinue() {
    var result = true;

    var shape = fallingBlock.block.shapes[fallingBlock.shapeIndex];

    for(var i = 0; i < blockSize; i++) {
        var row = i;
        for(var j = 0; j < blockSize; j++) {
            var col = middleLeftCol + j;
            if(shape[i][j] === 1 && cells[row][col] !== '') {
                result = false;
            }
        }
    }

    return result;    
}

// ブロック確定
function commit() {
    clearInterval(timerId);

    var block = fallingBlock.block;
    var shape = block.shapes[fallingBlock.shapeIndex];
    for(var i = 0; i < blockSize; i++) {
        var row = fallingBlock.coordinate[1] + i;
        for(var j = 0; j < blockSize; j++) {
            var col = fallingBlock.coordinate[0] + j;
            if(shape[i][j] == 1) {
                cells[row][col] = block.name;
            }
        }
    }

    changeBlock();
    checkCells();
    arrangeCells();

    if(canContinue()) {
        timerId = setInterval(proceed, fallingInterval);
    }
    else {
        finish();
    }
}

// 処理を進める
function proceed() {
    var block = fallingBlock.block;
    var shapeIndex = fallingBlock.shapeIndex;
    var x = fallingBlock.coordinate[0];
    var y = fallingBlock.coordinate[1];

    if(isOverlapping(block, shapeIndex, x, y + 1)) {
        commit();
    }
    else {
        var row = fallingBlock.coordinate[1];
        fallingBlock.coordinate[1] = row + 1;
        draw();
    }
}

// ゲームオーバー
function finish() {
    $('#message').html('Game Over!!!');
    for(var row = blockSize; row < height + blockSize; row++) {
        for(col = 0; col < width; col++) {
            if(cells[row][col] !== '') {
                var cellId = 'cell' + row + '-' + col;
                $('#' + cellId).css('background-color', 'grey');
            }
        }
    }
}

// 左へ移動
function moveLeft() {
    var block = fallingBlock.block;
    var shapeIndex = fallingBlock.shapeIndex;
    var x = fallingBlock.coordinate[0];
    var y = fallingBlock.coordinate[1];

    if(!isOverlapping(block, shapeIndex, x - 1, y)) {
        fallingBlock.coordinate[0] = x - 1;
        draw();
    }
}

// 右へ移動
function moveRight() {
    var block = fallingBlock.block;
    var shapeIndex = fallingBlock.shapeIndex;
    var x = fallingBlock.coordinate[0];
    var y = fallingBlock.coordinate[1];

    if(!isOverlapping(block, shapeIndex, x + 1, y)) {
        fallingBlock.coordinate[0] = x + 1;
        draw();
    }
}

// 回転
function rotate() {
    var block = fallingBlock.block;
    var shapeIndex = fallingBlock.shapeIndex;
    var nextShapeIndex = (shapeIndex + 1) % 4;

    var x = -1;
    var y = -1;
    var gap1 = 1000;
    var gap2 = 1000;
    for(var i = -2; i <= 2; i++) {
        for(var j = -2; j <= 2; j++) {
            var currentX = fallingBlock.coordinate[0] + j;
            var currentY = fallingBlock.coordinate[1] + i;
            if(!isOverlapping(block, nextShapeIndex, currentX, currentY)) {
                var currentGap1 = Math.abs(i) + Math.abs(j);
                var currentGap2 = Math.abs(i - j);
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
        fallingBlock.shapeIndex = nextShapeIndex;
        fallingBlock.coordinate[0] = x;
        fallingBlock.coordinate[1] = y;
        draw();
    }
}

// ブロックを落とす
function drop() {
    var block = fallingBlock.block;
    var shapeIndex = fallingBlock.shapeIndex;
    var x = fallingBlock.coordinate[0];
    var y = fallingBlock.coordinate[1];
    var distance = 0;

    while(!isOverlapping(block, shapeIndex, x, y + 1)) {
        y += 1;
        distance += 1;
    }

    if(distance > 0) {
        fallingBlock.coordinate[1] = y;
    }
    score = score + distance;
    setScore();
    draw();

    commit();
}


// 開始ボタンクリック
function onClickStart() {
    var name = $('#start_button').html();
    if(name === 'Start') {
        changeBlock();        
        timerId = setInterval(proceed, fallingInterval);
        $('#start_button').html('Reset');
    }
    else if(name === 'Reset') {
        clearInterval(timerId);
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


