module.exports = function (source) {
    console.log(this.query.name)
    return source.replace("wangjian", this.query.name)
}