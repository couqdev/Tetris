const canvas = document.getElementById('TetrisGame');
// So hang trong Board
const row = 15;
// So cot trong Board
const col = 20;
// Do lon cua mot o vuong
const unit = 30;
// So cot cua Table
const colTable = 6;
// chinh chieu cao cua the canvas
canvas.height = (row) * unit;
// Chinh chieu dai cua the canvas  = so cot cau Board cong voi so cot cua Table cong them 1 la khoang cach giua Table va Boardd
canvas.width = (col) * unit;
const ctx = canvas.getContext('2d');

// Mang chua cac hinh dang cua Brick
const bricks = [
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7]
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7]
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7]
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7]
        ]
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7]
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7]
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1]
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7]
        ]
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1]
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7]
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7]
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7]
        ]
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7]
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7]
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7]
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7]
        ]
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7]
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7]
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1]
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7]
        ]
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7]
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7]
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7]
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7]
        ]
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7]
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7]
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7]
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1]
        ]
    ]
];
// Mang chua cac mau sac cua cac Brick co index trung voi index trong mang bricks
const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red', 'black', 'brown'];
const background_id = 7;
const fenceColor = 8;

// Bang de hien thi
class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.matrix = this.matrixBoard();
        this.score = 0;
        this.playMusic = true;
        this.over = false;
        this.play = false;
        this.musicOver = new Audio('sound/Nhac-chuong-game-over.mp3');
        this.musicComplete = new Audio('sound/cash-register-sound-effect_1.mp3');
        this.musicUp = new Audio('sound/pop_1.mp3');
    }

    // Tao ra mang hai chieu co kich thuoc la 20 dong va 10 cot va duoc luu gia tri la 7
    matrixBoard() {
        return Array.from({length: row}, () => Array(col).fill(background_id));
    }
    checkRowFinished(row) {
        // duyet theo cot
        for (let x = 0; x < this.matrix[0].length; x++) {
            // Neu tai vi tri y = row va x bang background thi co nghia hang do chua duoc lap day
            if (this.matrix[row][x] === background_id) {
                return false;
            }
        }
        return true;
    }
    // Lay cac hang chua duoc lap day
    getRowUnFinished() {
        // Tao ra mot mang hai chieu 20 dong 10 cot co gia tri background_id
        const newMatrix = Array.from({length: row}, () => Array(col).fill(background_id));
        // r = row = 20; co nghia la chen vao vi tri cuoi cung trong matrix len dan
        let r = row;
        // Duyet matrix tu duoi len tren (duyet theo hang)
        for (let y = this.matrix.length - 1; y >= 0; y--) {
            // Neu hang do chua duoc lap kin
            if (!this.checkRowFinished(y)) {
                // -- de gia tri index giam dan(19 la gia tri bat dau)
                r--;
                // Duyet theo cot
                for (let x = 0; x < this.matrix[0].length; x++) {
                    // Gan gia tri cua matrix vao matrix moi
                    newMatrix[r][x] = this.matrix[y][x];
                }
            }
        }
        return newMatrix;
    }
    // Tinh so dong da lap kin
    countRowFinished() {
        // So dong cua board game la 20
        let count = row;
        // Duyet theo hang
        for (let y = 0; y < this.matrix.length; y++) {
            // Neu hang do chua duoc lap kin
            if (!this.checkRowFinished(y)) {
                // thi giam di 1
                count--;
            }
        }
        return count;
    }
    // ve Board bang cach ve cac o vuong theo tao do cua mang matrixBoard
    drawBoard() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[0].length; x++) {
                this.drawSquare(x, y, this.matrix[y][x]);
            }
        }
    }

    // Ve cac o vuong voi input gom x la vi tri trong chieu X va y la vi tri trong chieu Y va nhan vao index mau sac de ve theo mau sac do
    drawSquare(x, y, id_color) {
        this.ctx.fillStyle = colors[id_color];
        // Ve hinh chu nhat voi vi tri x, y co do dai bang nhau
        this.ctx.fillRect(x * unit, y * unit, unit, unit);
        this.ctx.strokeStyle = 'white';
        // Ve vien hinh chu nhat voi vi tri x, y co do dai bang nhau
        this.ctx.strokeRect(x * unit, y * unit, unit, unit);
    }
    // Xu ly hoan thanh hang(Khi hang do duoc xep kin)
    finishedTheRow() {
        // So luong hang da hoan thanh
        const quantityRowComplete = this.countRowFinished();
        // Set lai matrix cua Board
        this.matrix = this.getRowUnFinished();
        // Diem them khi hoan thanh so hang trong cac khoang sau
        let bonus = 0;
        // Neu hoan thanh tu 2 den 3 hang thi diem cong them 5 so voi so hang
        if (quantityRowComplete <= 3 && quantityRowComplete >= 2) {
            bonus = 5 * quantityRowComplete;
        }
        // Neu hoan thanh tu 4 den 6 hang thi diem cong them 10 so voi so hang
        if (quantityRowComplete >= 4) {
            bonus = 10 * quantityRowComplete;
        }
        // Neu so luong hang hoan thanh lon hon khong
        if (quantityRowComplete > 0) {
            // play nhac complete
           if(this.playMusic){
               this.musicComplete.play();
           }
        }
        // Cong so diem vao so diem da co
        this.score += (quantityRowComplete * 10) + bonus;
        // Hien thi diem so ra man hinh
        document.getElementById('score').innerHTML = this.score;
    }

}

class Gun {
    constructor() {
        this.layout = [1];
        this.y = 0;
        this.x = 10;
    }
    // Luu vao gun vao trong matrix board
    saveMatrixBoard() {
        for (let x = 0; x < this.layout.length; x++) {
            board.matrix[this.y + 0][this.x + x] = fenceColor;
        }
    }
    // Di chuyen sang trai
    moveLeft() {
        // kiem tra no co di qua tuong ben trai hay khong
        if (this.x - 1 >= 0) {
            // Xoa gun trong matrix board
            this.clearMatrixBoard();
            // Giam gia tri vi tri x
            this.x--;
            // Luu vao trong matrix board
            this.saveMatrixBoard();
            // Ve lai board game
            board.drawBoard();
        }
    }

    moveRight() {
        if (this.x + 1 < col) {
            this.clearMatrixBoard();
            this.x++;
            this.saveMatrixBoard();
            board.drawBoard();
        }
    }
    // Xoa gun trong matrix board
    clearMatrixBoard() {
        // Chay vong lap theo cot
        for (let x = 0; x < this.layout.length; x++) {
            // cap nhat lai bang gia tri background_id
            board.matrix[this.y + 0][this.x + x] = background_id;
        }
    }
    // Ham nay dung de day mot khoi xuong duoi cung
    shoot() {
        // Chay vong lap theo dong
        // Bat dau tu dong thu 2 vi dong dau tien la gun
        for (let y = 1; y < board.matrix.length; y++) {
            // Neu vi tri trong matrix board khac background
            if (board.matrix[y][this.x] !== background_id) {
                // thi se ve o hang phia tren no vi no se luu xuoong duoi cung cua board game
                board.matrix[y-1][this.x] = fenceColor;
                this.clearMatrixBoard();
                board.finishedTheRow();
                this.saveMatrixBoard();
                board.drawBoard();
                return;
            }
            // Kiem tra xem no co phai hang cuoi cung va trong hay khong hay khong
            // Boi vi voi dieu kien phia tren thi khi no la hang cuoi cung thi khong con hnag phia duoi de xet nua
            if(y === board.matrix.length-1 && board.matrix[y][this.x]=== background_id){
                // Neu no la hang cuoi cung thi cap nhat thang no
                board.matrix[y][this.x] = fenceColor;
                this.clearMatrixBoard();
                board.finishedTheRow();
                this.saveMatrixBoard();
                board.drawBoard();
                return;
            }
        }

    }
}

// Dung de hien thi brick chuan bi roi
// Khoi tao Board
const board = new Board(ctx);
board.drawBoard();
// Random ra mot brick
// Hai bien khai bao Brick
let countTime = 0;
b = new Gun();
b.saveMatrixBoard();
// Gan brick

document.getElementById('play').addEventListener('click', () => {
    // Hien thi thong bao khi bat dau choi gam
    document.getElementById('over').innerHTML = 'Game On!!!';
    if(board.playMusic){
        document.getElementById('demo').play();
    }
    // Khi game chua duoc choi
    if (!board.play) {
        // Reset
        board.over = false;
        board.score = 0;
        document.getElementById('score').innerHTML = board.score;
        board.matrix = board.matrixBoard();
        board.drawBoard();
        // Cap nhat trang thai dang choi
        board.play = true;

        // Brick se di chuyen xuong trong 1 giay
        const refresh = setInterval(() => {
            if (!board.over) {
                b.saveMatrixBoard();
                board.drawBoard();
                countTime++;
                if (countTime === 5) {
                    // Tao ra mot hang random duoi cung Board game sau 3 giay
                    const randomRow = Array.from({length: 1}, () => Array(col).fill(Math.floor(Math.random() * 10) % bricks.length));
                    for (let i = 0; i <= 5; i++) {
                        randomRow[0][Math.floor(Math.random() * 10) % col * 2] = background_id;
                    }
                    const hight = Array.from({length: row - 1}, () => Array(col).fill(background_id));

                    for (let y = 1; y < board.matrix.length; y++) {
                        for (let x = 0; x < board.matrix[0].length; x++) {
                            hight[y - 1][x] = board.matrix[y][x];
                        }
                    }
                    for (let x = 0; x < board.matrix[0].length; x++) {
                        hight[0][x] = board.matrix[0][x];
                    }
                    board.matrix = [...hight, ...randomRow];

                    board.drawBoard();
                    // Neu dong thu 2 cua board game co chua it nhat gia tri khac background_id thi game over
                    // Boi vi dong dau tien chua gun nen khong xet
                    for (let x = 0; x < board.matrix[0].length; x++) {
                        if (board.matrix[1][x] !== background_id) {
                            board.over = true;
                            board.play = false;
                            // Hien thi khi game over
                            document.getElementById('over').innerHTML = 'Game Over!!!!';
                            document.getElementById('demo').pause();
                           if(board.playMusic){
                               board.musicOver.play();
                           }
                        }
                    }
                   if(board.playMusic){
                       board.musicUp.play();
                   }
                    countTime = 0;
                }
                console.table(board.matrix);
                //Di chuyen xuong
                // brick2.moveDown();
                // Khi ma brick da di qua tuong ben tren
            } else {
                clearInterval(refresh);
            }
        }, 1000);
    }
});
// Su kien cho nut reload
document.getElementById('reload').addEventListener('click', () => {
    document.getElementById('over').innerHTML = '';
    if(board.play){
        if(!board.over){
            board.over = true;
            board.play = false;
            board.matrix = board.matrixBoard();
            board.score = 0;
            document.getElementById('score').innerHTML = 0;
            board.drawBoard();
            document.getElementById('demo').pause();
        }
    }
});
// Su kien cho nut bat nhac
document.getElementById('playAudio').addEventListener('click', () => {
    if (board.play) {
        if (!board.over) {
            document.getElementById('demo').play();
            board.playMusic = true;
        }
    }
});
// Nut dung am thanh
document.getElementById('pauseAudio').addEventListener('click', () => {
    if (board.play) {
        if (!board.over) {
            document.getElementById('demo').pause();
            board.playMusic = false;
        }
    }
});
// Xu ly su kien tu ban phim
document.onkeydown = function (e) {
    if (board.play) {
        switch (e.keyCode) {
            case 37:
                b.moveLeft();
                break;
            case 39:
                b.moveRight();
                break;
            case 40:
                b.shoot();
                break;
            default:
                break;
        }
    }
}