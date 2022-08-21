
// global.name = "haha"
// function test(){
//     console.log(this.name,"this.name in test")
// }
// test();
// setTimeout(()=>{
//     console.log(this.name,"this.name in timer")
//     test()
// },1000)

global.count = "1"
console.log(module.exports == this);

console.log("this-outside",this.name)

function test(){
    console.log("this1-internal",this.name)
}
test();


module.exports = {
    name :"wang"
}