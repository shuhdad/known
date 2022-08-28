let fn = ()=>{
    console.log(this.name)
}
let fn2 = function(){
    console.log(this.name)
}
let obj = {
    name:"wang"
}

fn.call(obj)
fn2.call(obj)