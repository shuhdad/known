const fs = require("fs");
const path = require("path")
let data = fs.readFileSync(path.resolve(__dirname, "./data.json"), {
    encoding: "utf-8"
});
let obj = JSON.parse(data).data;

let all = []
all = all.concat(Object.keys(obj.classList))
all =all.concat(obj.unuse_classList)
fs.writeFileSync(path.resolve(__dirname,"./wri.json"),JSON.stringify(all))
let b = 2;