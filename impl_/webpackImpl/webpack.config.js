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
                    loader: './loaders/errorReportLoader',
                    options: {
                        word: "will",
                        identifier: "error",
                        catchClause: `window.report(error)`
                    },
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