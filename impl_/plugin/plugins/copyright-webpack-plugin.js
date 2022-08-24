class CopyrightWebpackPlugin {
    constructor(options) {
        console.log(options)
    }

    apply(compiler) {
        compiler.hooks.compile.tap("CopyrightWebpackPlugin", (compilation) => {
            console.log(compilation.assets)
        })

        compiler.hooks.emit.tapAsync("CopyrightWebpackPlugin", (compilation, cb) => {
            compilation.assets['copyright.txt'] = {
                source: function () {
                    return 'copyright by will'
                },
                size: function () {
                    return 17
                }
            }
            cb();
        })
    }
}

module.exports = CopyrightWebpackPlugin;