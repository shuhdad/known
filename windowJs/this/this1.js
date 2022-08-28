var length = 10;
const fn = function () {
    console.log(this.length + 1);
}
var obj1 = {
    length: 5,
    test1: function () {
        return fn()
    }
}
obj1.test2 = fn;
obj1.test1.call()
obj1.test1()
obj1.test2.call()
obj1.test2()