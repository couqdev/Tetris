const canvas = document.getElementById('TetrisGame');
// So hang trong Board
const row = 20;
// So cot trong Board
const col = 10;
// Do lon cua mot o vuong
const unit = 30;
// So cot cua Table
const colTable = 6;
// chinh chieu cao cua the canvas
canvas.height = (row) * unit;
// Chinh chieu dai cua the canvas  = so cot cau Board cong voi so cot cua Table cong them 1 la khoang cach giua Table va Boardd
canvas.width = (col + colTable + 1) * unit;
const ctx = canvas.getContext('2d');

// Mang chua cac hinh dang cua Brick
const bricks = [
    [
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
    ],
    [
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    ],
    [
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ]
    ],
    [
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
    ],
    [
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ]
    ],
    [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ],
    [
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ]
    ],
    [
        [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ]
    ]
];
// Mang chua cac mau sac cua cac Brick co index trung voi index trong mang bricks
const colors = ['black', 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red', 'grey','brown'];
const background_id = 0;
const item = 7;

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
        this.musicTeleport = new Audio('sound/pop_1.mp3');
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

class Brick {
    constructor(id) {
        this.id = id;
        this.layout = bricks[id];
        this.direction = 0;
        this.x = 3;
        this.y = -3;
    }

    // Ve khoi gach
    drawBrick() {
        // Duyet theo hang
        for (let y = 0; y < this.layout[this.direction].length; y++) {
            // Duyet theo cot
            for (let x = 0; x < this.layout[this.direction][0].length; x++) {
                // Chi ve cac o co du lieu la khac voi backgroud_id => chi ve dung khoi gach khong ve het matrix
                if (this.layout[this.direction][y][x] !== background_id) {
                    // Ve cac o vuong tuong ung voi vi tri x, y va mua sac cua brick theo id
                    board.drawSquare(x + this.x, y + this.y, this.id + 1);
                }
            }
        }
    }

    // Xoa khoi gach
    clearBrick() {
        // Duyet theo hang
        for (let y = 0; y < this.layout[this.direction].length; y++) {
            // Duyet theo cot
            for (let x = 0; x < this.layout[this.direction][0].length; x++) {
                // Chi chon cac o co du lieu la khac voi backgroud_id => chi ve dung khoi gach khong ve het matrix
                if (this.layout[this.direction][y][x] !== background_id) {
                    // Ve lai cac o vuong co vi tri x, y tuong ung va co mau den de an khoi gach
                    board.drawSquare(x + this.x, y + this.y, background_id);
                }
            }
        }
    }

    // Kiem tra khoi gach co di chuyen duoc khong
    // Input: nextRow la vi tri y trong tuong lai, nextCol la vi tri x trong tuong lai, nextLayout la layout duoc xoay trong tuong lai
    checkMove(nextRow, nextCol, nextLayout) {
        // Duyet nextLayout theo hang
        for (let y = 0; y < nextLayout.length; y++) {
            // Duyet nextLayout theo cot
            for (let x = 0; x < nextLayout[0].length; x++) {
                // Xet truong hop brick da hoan toan di qua tuong tren cung
                if (nextLayout[y][x] !== background_id && nextRow >= 0) {
                    // x+ nextCol >= col se kiem tra xem tai vi tri do no da qua tuong ben phai hay chua
                    // x+ nextCol < 0 se kiem tra xem tai vi tri do no da qua tuong ben trai hay chua
                    // y + nextRow >= 0 se kiem tra xem tai vi tri do no da qua tuong ben duoi hay chua
                    // (board.matrix[y + nextRow][x + nextCol] !== background_id) se kiem tra xem tai vi tri do co bi trung voi cac brick da duoc luu vao trong matrix hay chua
                    // tranh truong hop no di xuyen qua cac brick khac
                    if ((x + nextCol >= col) || (x + nextCol < 0) || (y + nextRow >= row) || (board.matrix[y + nextRow][x + nextCol] !== background_id)) {
                        return false;
                    }
                }
                // Xet truong hop brick chua hoan toan qua tuong ben tren
                //
                if (nextLayout[y][x] !== background_id && nextRow < 0) {
                    // Truong hop nextRow + y <0 la truong hop vi tri y cua brick van o ngoai Board nen khong can duyet
                    if (nextRow + y >= 0) {
                        if ((board.matrix[y + nextRow][x + nextCol] !== background_id)) {
                            return false;
                        }
                    }
                    // x+ nextCol >= col se kiem tra xem tai vi tri do no da qua tuong ben phai hay chua
                    // x+ nextCol < 0 se kiem tra xem tai vi tri do no da qua tuong ben trai hay chua
                    // y + nextRow >= 0 se kiem tra xem tai vi tri do no da qua tuong ben duoi hay chua
                    if ((x + nextCol >= col) || (y + nextRow >= row) || (x + nextCol < 0)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    // Xu ly over cho game
    over() {
        // kiem tra xem vi tri hien tai cua brick + vi tri bat dau trong layout neu be hon bang khong thi game over
        // (Nghia la khoi gach da cham tuong phia tren)
        if (this.y + this.getRowPositionBrick() <= 0) {
            board.over = true;
            board.play = false;
            // Hien thi khi game over
            document.getElementById('over').innerHTML = 'Game Over!!!!';
            // Dung nhac nen
            document.getElementById('demo').pause();
            // Play nhac over game
            if(board.playMusic){
                board.musicOver.play();
            }
            // Tra ve true neu nhu game over
            return true;
        }
        return false;
    }
    // Vi vi tri y cua brick trong layout se la [0][0] va nhieu layout co hang dau tien la trong nen can lay vi tri cua no tai hang bat dau cua Brick
    // Lay ra hang bat dau cua Brick
    getRowPositionBrick() {
        for (let y = 0; y < this.layout[this.direction].length; y++) {
            for (let x = 0; x < this.layout[this.direction][0].length; x++) {
                if (this.layout[this.direction][y][x] !== background_id) {
                    return y;
                }
            }
        }
    }

    // Ham nay duoc goi khi khoi gach khong the di chuyen xuong duoi duoc nua
    // Hoan thanh di chuyen Brick xuong nghia la Brick do da cham dat
    // Xu ly GameOver va Xu ly luu brick vao trong matrix cua Board
    completeMoveDown() {

        // Item dac biet se hoan thanh 3 dong, dong tren no dong cua no, va dong duoi no
        // Cho vi tri bat dau cua dong tren no
        let y = (this.y + this.getRowPositionBrick()) - 1;
        // Kiem tra neu no la item dac biet
        if (this.id === item) {
            // Vong lap nay xet 3 lan
            for (let i = y; i < y + 3; i++) {
                // vong lap nay xet theo cot
                for (let x = 0; x < board.matrix[0].length; x++) {
                    // Kiem tra chi trong board game vi khi item o vi tri cuoi cung(nen khong duyet dong duoi no) hoac tren cung thi se khong xoa dong tren no
                    if (i >= 0 && i <= 19) {
                        // Neu no trong thi cap nhat bang id cua item dac biet
                        if (board.matrix[i][x] === background_id) {
                            board.matrix[i][x] = this.id + 1;
                        }
                    }
                }
            }
        }
        // Neu khoi gach chua cham tuong ben tren thi luu vi tri cua no
        // Duyet theo hang
        for (let y = 0; y < this.layout[this.direction].length; y++) {
            // Duyet theo cot
            for (let x = 0; x < this.layout[this.direction][0].length; x++) {
                // Chi duyet cac o co chua du lieu khac background_id nghia la no chi duyet cac o cua Brick
                if (this.layout[this.direction][y][x] !== background_id) {
                    // cap nhat vao matrix cua Board vi tri cua Brick
                    board.matrix[y + this.y][x + this.x] = this.id + 1;
                }
            }
        }
    }

    moveLeft() {
        // Kiem tra di chuyen sang trai input nextRow se giu nguyen, nextCol se - 1 vi di chuyen sang trai, nextLayout van giu nguyen vi khoi gach khong duoc xoay
        if (this.checkMove(this.y, this.x - 1, this.layout[this.direction])) {
            // kiem tra di chuyen cho phep di chuyen
            // Xoa khoi gach
            this.clearBrick();
            // giam x di 1
            this.x--;
            // ve lai khoi gach
            this.drawBrick();
        }
    }

    moveRight() {
        // Kiem tra di chuyen sang phai input nextRow se giu nguyen, nextCol se + 1 vi di chuyen sang phai, nextLayout van giu nguyen vi khoi gach khong duoc xoay
        if (this.checkMove(this.y, this.x + 1, this.layout[this.direction])) {
            // kiem tra di chuyen cho phep di chuyen
            // Xoa khoi gach
            this.clearBrick();
            // tang x len 1
            this.x++;
            // ve lai khoi gach
            this.drawBrick();
        }
    }

    moveDown() {
        // Kiem tra xem vi tri cua brick da den 5 hay chua neu co tao ra mot vi tri random cho no roi dich chuyen no den do
        if (this.y+this.getRowPositionBrick() === 5) {
            while (1 === 1) {
                // Random vi tri x, y co x tu 0->19, co dong tu 5 tro xuong
                let x = (Math.floor(Math.random() * 10) % col);
                let y = (Math.floor(Math.random() * 10) % (row-5));
                // Check vi tri den co di chuyend duoc hay khong
                if (this.checkMove(y +5+ this.getRowPositionBrick(), x, this.layout[this.direction])) {
                    // Neu duoc di chueyn no den vi tri moi
                    this.clearBrick();
                    this.x = x;
                    this.y = y +5+ this.getRowPositionBrick();
                    this.drawBrick();
                    if(board.playMusic){
                        board.musicTeleport.play();
                    }
                    break;
                }
            }
        }
        // Kiem tra di chuyen xuong duoi input nextRow +1 vi di chuyen xuong, nextCol se giu nguyen, nextLayout van giu nguyen vi khoi gach khong duoc xoay
        if (this.checkMove(this.y + 1, this.x, this.layout[this.direction])) {
            // kiem tra di chuyen cho phep di chuyen
            // Xoa khoi gach
            this.clearBrick();
            // tang y len 1
            this.y++;
            // Ve lai khoi gach
            this.drawBrick();
            // Neu khoi gach co the di chuyen xuong thi ket thuc phuong thuc
            return;
        }
        // Kiem tra brick da cham den tuong ben tren hay chua
        if (!this.over()) {
            // Neu khong di chuyen duoc nghia la khoi gach da dap dat
            // Neu khong di chuyen duoc thi kiem tra xem khoi gach co cham tuong ben tren hay khong neu khong thi cap nhat vao matrix cua Board
            this.completeMoveDown();
            // Goi ham xu ly hang da duoc xep kin
            board.finishedTheRow();
            // Ve lai Board de hien thi du lieu moi nhat
            board.drawBoard();
        }

        // kiem tra xem brick1 co trung voi brick2 khong neu co set no ve mac dinh
        if (brick1.id === brick2.id && brick1.direction === brick1.direction && brick1.x === brick2.x && brick1.y === brick2.y) {
            brick1.direction = 0;
            brick1.x = 3;
            brick1.y = -3;
        }
        // Goi ham de gan brick da duoc random truoc do de hien thi ra brick moi
        assignBrick();
    }

    rotate() {
        // Kiem tra di chuyen xuong duoi input nextRow giu nguyen, nextCol se giu nguyen, nextLayout duoc xoay nen + them 1 va %4 de lay gua tri tu 0 den 3
        if (this.checkMove(this.y, this.x, this.layout[(this.direction + 1) % 4])) {
            // kiem tra di chuyen cho phep di chuyen
            // Xoa khoi gach
            this.clearBrick();
            // Thay doi chieu cua khoi gach
            this.direction = (this.direction + 1) % 4;
            // Ve lai khoi gach
            this.drawBrick();
        }
    }
}

// Dung de hien thi brick chuan bi roi
class Table {
    constructor(ctx) {
        this.ctx = ctx;
        this.matrixTable = this.createTable();
    }
    // Tao ra mot matrix co so cot la 6 hang la 6
    createTable() {
        return Array.from({length: colTable}, () => Array(colTable).fill(background_id));
    }

    // Ve ra Table de hien thi brick trong tuong lai
    drawTable() {
        for (let row = 0; row < this.matrixTable.length; row++) {
            for (let col = 0; col < this.matrixTable[0].length; col++) {
                this.drawSquare(col + 11, row, this.matrixTable[row][col]);
            }
        }
    }
    // Ve o vuong
    drawSquare(x, y, idColor) {
        this.ctx.fillStyle = colors[idColor];
        this.ctx.fillRect(x * unit, y * unit, unit, unit);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(x * unit, y * unit, unit, unit);
    }

    // ve Brick trong matrix cua Table
    drawBrick(brick) {
        // Duyet theo hang
        for (let row = 0; row < brick.layout[brick.direction].length; row++) {
            // Duyet theo cot
            for (let col = 0; col < brick.layout[brick.direction][0].length; col++) {
                if (brick.layout[brick.direction][row][col] !== background_id) {
                    table.matrixTable[row + 4 + brick.y][col - 2 + brick.x] = brick.id + 1;
                }
            }
        }
        // Cap nhat lai table
        this.drawTable();
    }

    // Xoa table
    clearBrick() {
        this.matrixTable = this.createTable();
    }
}

// Khoi tao Board
const board = new Board(ctx);
board.drawBoard();
// Khoi tao Table
const table = new Table(ctx);
table.drawTable();
// Random ra mot brick
// Hai bien khai bao Brick
let brick1;
let brick2;
let countItem = 0;


// Tang so lan xuat hien cua item dac biet
function randomBrick() {
    countItem++;
    // Den brick thu 7 thi se tao ra brick dac biet
    if (countItem === 7) {
        brick1 = new Brick(item);
        countItem = 0;
    } else {
        brick1 = new Brick((Math.floor(Math.random() * 10) % bricks.length));
    }
}

// Gan brick
function assignBrick() {
    brick2 = brick1;
}
// Su kien play game
document.getElementById('play').addEventListener('click', () => {
    // Hien thi thong bao khi bat dau choi gam
    document.getElementById('over').innerHTML = 'Game On!!!';
    if(board.playMusic){
        document.getElementById('demo').play();
    }
    // Khi game chua duoc choi
    if (!board.play) {
        // Lam sach Table
        table.clearBrick();
        // Reset
        board.over = false;
        board.score = 0;
        document.getElementById('score').innerHTML = board.score;
        board.matrix = board.matrixBoard();
        board.drawBoard();
        // Cap nhat trang thai dang choi
        board.play = true;
        // Random ra mot brick
        randomBrick();
        // hien thi len Table cho nguoi choi biet brick sap roi
        table.drawBrick(brick1);
        // gan cho brick2
        assignBrick();
        // Brick se di chuyen xuong trong 1 giay
        const refresh = setInterval(() => {
            if (!board.over) {
                //Di chuyen xuong
                brick2.moveDown();
                // Khi ma brick da di qua tuong ben tren
                if (brick2.getRowPositionBrick() + brick2.y === 0) {
                    // Tao moi brick
                    randomBrick();
                    //Xoa brick tuong lai cu o table
                    table.clearBrick();
                    // Ve lai brick moit trong table
                    table.drawBrick(brick1);
                }
            } else {
                clearInterval(refresh);
            }
        }, 700);
    }
});
// Xu ly su kien reload lai game
document.getElementById('reload').addEventListener('click', () => {
    document.getElementById('over').innerHTML = '';
    if(board.play){
        if(!board.over){
            board.over = true;
            board.play = false;
            table.clearBrick();
            board.matrix = board.matrixBoard();
            board.score = 0;
            document.getElementById('score').innerHTML = 0;
            brick2.clearBrick();
            board.drawBoard();
            table.clearBrick();
            table.drawTable();
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
// Xu ly su kien ban phim
document.onkeydown = function (e) {
    if (board.play) {
        switch (e.keyCode) {
            case 37:
                brick2.moveLeft();
                break;
            case 39:
                brick2.moveRight();
                break;
            case 38:
                brick2.rotate();
                break;
            case 40:
                brick2.moveDown();

                if (brick2.getRowPositionBrick() + brick2.y === 0) {
                    randomBrick();
                    table.clearBrick();
                    table.drawBrick(brick1);
                }
                break;
            default:
                break;
        }
    }
}