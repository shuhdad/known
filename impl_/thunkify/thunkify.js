const fs = require('fs');
const path = require('path');
function thunkify(fn) {
    return function () {
        let args = Array.prototype.slice.call(arguments)
        return function (callback) {
            args.push(callback);
            fn.apply(this, args)
        }
    }
}

let readThunk = thunkify(fs.readFile)
readThunk(path.resolve(__dirname, "./book.txt"), {
    encoding: "utf-8"
})(function (err, str) {
    console.log(str)
})

