
// //至此，subType继承了superType的构造函数内属性
// //原型对象上的属性还没有得到继承

// SubType.prototype = new SuperType()
// //至此，原型对象上的属性得到了继承
// //但是存在一个属性在实例本身与原型对象上重复拥有

// SubType.prototype.constructor = SubType

// SubType.prototype.sayAge = function () {
//     console.log(`I'm ${this.age} years old.`)
// }


// let sub1 = new SubType("wang", 29)
// sub1.colors.push("yellow")
// sub1.numbers.push("4")
// console.log('sub1.name: ', sub1.name);
// console.log('sub1.colors: ', sub1.colors);
// console.log('sub1.numbers: ', sub1.numbers);
// console.log('sub1.age: ', sub1.age);
// sub1.sayName();
// sub1.sayAge();
// console.log("-------------------------")
// let sub2 = new SubType("zhang", 27)
// console.log('sub2.name: ', sub2.name);
// console.log('sub2.colors: ', sub2.colors);
// console.log('sub2.numbers: ', sub2.numbers);
// console.log('sub2.age: ', sub2.age);
// sub2.sayName();
// sub2.sayAge();

// console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
// function object(o) {
//     let fn = function () { }
//     fn.prototype = o;
//     return new fn();
// }

// // let source = {
// //     name: "Nicholas",
// //     friends: ["Sheldy", "Court", "Van"]
// // }

// // let per1 = Object.create(source, {
// //     address: {
// //         enumerable: true,
// //         value: "liuan"
// //     }
// // });
// // per1.name = "p1";
// // per1.friends.push("Will")
// // let per2 = Object.create(source);

// // per2.name = "p2"