function exist(board, word) {
    let h = board.length - 1;
    let w = board[0].length - 1

    for (let i = 0; i <= h; i++) {
        for (let j = 0; j <= w; j++) {
            let visited = new Array(board.length).fill().
                map(x => new Array(board[0].length)
                    .fill(false));
            let flag = perCheck(board, word, i, j, 0, visited)
            if (flag) {
                return true;
            }
        }
    }
    return false;
}

function perCheck(board, word, i, j, k, visited) {
    let h = board.length - 1;
    let w = board[0].length - 1
    let result = false;
    if (board[i][j] != word[k]) {
        return false
    } else if (k == word.length - 1) {
        return true
    }
    visited[i][j] = true;
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (let di = 0; di < directions.length; di++) {
        const direction = directions[di];
        let newi = i + direction[0];
        let newj = j + direction[1];
        if (newi >= 0 && newi <= h && newj >= 0 && newj <= w && !visited[newi][newj]) {
            let flag = perCheck(board, word, newi, newj, k + 1, visited);
            if (flag) {
                return true;
            }
        }
    }
    visited[i][j] = false;
    return result;
}

let board = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"]
], word = "ABCCED";

let rst = exist(board, word)
console.log('rst: ', rst);





















// var exist = function (board, word) {
//     const h = board.length, w = board[0].length;
//     const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
//     const visited = new Array(h).fill().map(x => new Array(w).fill(false));
//     console.log('visited: ', visited);
//     const check = (i, j, s, k) => {
//         if (board[i][j] != s.charAt(k)) {
//             return false;
//         } else if (k == s.length - 1) {
//             return true;
//         }
//         visited[i][j] = true;
//         let result = false;
//         for (const [dx, dy] of directions) {
//             let newi = i + dx, newj = j + dy;
//             if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
//                 if (!visited[newi][newj]) {
//                     const flag = check(newi, newj, s, k + 1);
//                     if (flag) {
//                         result = true;
//                         break;
//                     }
//                 }
//             }
//         }
//         visited[i][j] = false;
//         return result;
//     }

//     for (let i = 0; i < h; i++) {
//         for (let j = 0; j < w; j++) {
//             const flag = check(i, j, word, 0);
//             if (flag) {
//                 return true;
//             }
//         }
//     }
//     return false;
// };

