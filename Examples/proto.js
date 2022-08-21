//生成一个对象：__proto__指向传入对象的原型对象prototype
function create(o) {
    let fun = function () { }
    fun.prototype = o;
    return new fun();
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "black"]
}

function SubType(name, age) {
    //这里继承构成函数内属性，毋庸置疑
    SuperType.call(this, name);
    this.age = age
}

SuperType.prototype.sayName = function () {
    console.log(`Hi ,my name is ${this.name}`);
}
SuperType.prototype.numbers = [1, 2, 3]

//这里继承原型对象的操作，为何要通过create内部的func中转一下
//方法一：
let prototype = create(SuperType.prototype);
prototype.constructor = SubType;
SubType.prototype = prototype;

// //如果不用以上中转方式，用这个，实验结果一致
// //方法二：
// 结论：该方法直接将Sub与Super的原型对象指向同一个对象，
// 修改子类会影响到父类
// SubType.prototype = SuperType.prototype;

let sub1 = new SubType();
