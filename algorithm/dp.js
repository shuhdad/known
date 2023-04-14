/**
 * 动态规划获取最优解=>挖最多黄金
 * @param {*} w 工人数量
 * @param {*} n 金矿的数量
 * @param {*} p 金矿需要人工的数量数组
 * @param {*} g 金矿含有黄金数量的数组
 * @returns 
 */
function getBestGoldMiningV1(w, n, p, g) {
    if (w == 0 || n == 0) {
        return 0
    }
    if (w < p[n - 1]) {
        return getBestGoldMiningV1(w, n - 1, p, g);
    }
    return Math.max(getBestGoldMiningV1(w, n - 1, p, g),
        getBestGoldMiningV1(w - p[n - 1], n - 1, p, g) + g[n - 1]
    )
}

//二维数组优化存储已经算出的最优值
function getBestGoldMiningV2(w, p, g) {
    let rst = new Array(g.length + 1).fill(new Array(w + 1).fill(0))
    for (let i = 1; i <= g.length; i++) {
        for (let j = w; j >= 1; j--) {
            if (j < p[i - 1]) {
                rst[i][j] = rst[i - 1][j];
            } else {
                rst[i][j] = Math.max(rst[i - 1][j],
                    rst[i - 1][j - p[i - 1]] + g[i - 1])
            }
        }
    }
    return rst[g.length][w];
}

//一维数组存储已经算出的最优值
function getBestGoldMiningV3(w, p, g) {
    let rst = new Array(w + 1).fill(0);
    rst[0] = 0
    for (let i = 1; i <= g.length; i++) {
        for (let j = w; j >= 1; j--) {
            if (j >= p[i - 1]) {
                rst[j] = Math.max(rst[j], (rst[j - p[i - 1]] + g[i - 1]))
            }
        }
    }
    return rst[w]
}
let w = 10
let p = [5, 5, 3, 4, 3]
let g = [400, 500, 200, 300, 350];
let best1 = getBestGoldMiningV1(w, 5, p, g);
console.log('best1: ', best1);
let best2 = getBestGoldMiningV2(w, p, g);
console.log('best: ', best2);