class A{
    name
    age
    get join(){
       return this.name  + '-' +this.age
    }
}

let a1 = new A();
a1.name = 'wang'
a1.age = 10;

console.log(JSON.stringify(a1));

let a2  = {... a1} ;
console.log('a2: ', a2);
a2.age = 20;
console.log(a2.join);

