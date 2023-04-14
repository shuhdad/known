const _ = require("lodash")
let arr = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36],
];


function divide2DArray(source, divideX, divideY) {
    //将指定区域进行X*Y等分
    let dividedArea = new Array(divideX * divideY);
    // calcPixels
    let y_chunks = _.chunk(source, Math.floor(source.length / divideY));
    for (let i = 0; i < y_chunks.length; i++) {
        let y_chunk = y_chunks[i];
        for (let j = 0; j < y_chunk.length; j++) {
            let row_Info = y_chunk[j];
            let x_chunks = _.chunk(row_Info, Math.floor(row_Info.length / divideX))
            x_chunks.forEach((x_chunk, k) => {
                let currentIndex = divideX * i + k;
                dividedArea[currentIndex] = [
                    ...dividedArea[currentIndex] || [],
                    ...x_chunk
                ];
            })
        }
    }
    return dividedArea;
}
let res = divide2DArray(arr, 3, 3)
console.log('res: ', res);
