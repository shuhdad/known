let arr = ['A','E','C','B'];
arr = arr.sort((a,b)=>{
    if (a < b) return -1;  
    if (a > b) return 1;  
    return 0
})
console.log('arr: ', arr);