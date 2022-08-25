const CopyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin")
module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: './loaders/replaceLoader',
                    options: {
                        word: "will"
                    }
                }
            }
        ]

    },
    plugins: [
        new CopyrightWebpackPlugin({
            name: "will"
        })
    ]
}