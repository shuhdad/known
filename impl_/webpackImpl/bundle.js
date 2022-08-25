const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const path = require("path")
const babel = require("@babel/core")
const fs = require("fs")
function moduleAnalyser(filename) {
    const content = fs.readFileSync(path.resolve(__dirname, filename), "utf-8")
    const ast = parser.parse(content, {
        sourceType: "module"
    })
    const dependencies = {}
    traverse(ast, {
        ImportDeclaration: function ({ node }) {
            const dirname = path.dirname(filename);
            dependencies[node.source.value] = './' + path.join(dirname, node.source.value)
        },
    });
    const code = babel.transformFromAstSync(ast, null, {
        presets: ["@babel/preset-env"]
    }).code
    return {
        filename,
        dependencies,
        code
    }
}

function makeDependenciesGraph(entry) {
    let graphArray = []
    const entryModule = moduleAnalyser(entry)
    graphArray.push(entryModule);
    for (let i = 0; i < graphArray.length; i++) {
        let dependencies = graphArray[i].dependencies;
        for (const key in dependencies) {
            graphArray.push(moduleAnalyser(dependencies[key]))
        }
    }
    const graph = {}
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })
    return graph;
}

function generateCode(entry) {
    const graph = makeDependenciesGraph(entry)
    return `
    (function(graph){
        function require(module){
            function localRequire(relativePath){
               return require(graph[module].dependencies[relativePath])
            }
            var exports = {};
            (function(require,exports,code){
                eval(code)
            })(localRequire,exports,graph[module].code)
            return exports;
        }
        require('${entry}')
    })(${JSON.stringify(graph)})
    `
}

const code = generateCode("./src/index.js") 
console.log('code: ', code);