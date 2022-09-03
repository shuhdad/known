function replaceSpace(s) {
    s= s.replace(/\s/g,"%20")
   
    // for (let i = 0; i < s.length; i++) {
    //     if(s[i] == " "){
    //     }
    // }
    return s;
}
let s = replaceSpace("We are happy.")
console.log('s: ', s);