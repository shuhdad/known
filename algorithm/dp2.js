function longestPalindromeSubseq(s) {
    let n = s.length;
    let dp = new Array(n).fill(0).map(x => new Array(n).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {
            if (s[i] == s[j]) {
                dp[i][j] = 2 + dp[i + 1][j - 1]
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[0][n - 1]
}
let rst = longestPalindromeSubseq("bbdbcdb")
console.log('rst: ', rst);







// var longestPalindromeSubseq = function (s) {
//     const n = s.length;
//     const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
//     for (let i = n - 1; i >= 0; i--) {
//         dp[i][i] = 1;
//         const c1 = s[i];
//         for (let j = i + 1; j < n; j++) {
//             const c2 = s[j];
//             if (c1 === c2) {
//                 dp[i][j] = dp[i + 1][j - 1] + 2;
//             } else {
//                 dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
//             }
//         }
//     }
//     console.log(dp)
//     return dp[0][n - 1];
// };
// function longestPalindromeSubseqV2(s) {
//     let n = s.length
//     let dp = new Array(n).fill(0).map(x => new Array(n).fill(0));
//     for (let i = n - 1; i >= 0; i--) {
//         dp[i][i] = 1;
//         for (let j = i + 1; j <= n - 1; j++) {
//             if (s[i] == s[j]) {
//                 dp[i][j] = 2 + dp[i + 1][j - 1]
//             } else {
//                 dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
//             }
//         }
//     }
//     return dp[0][n - 1]
// }

// let s = "bbbab"

// let rst = longestPalindromeSubseqV2(s)
// console.log('rst: ', rst);


