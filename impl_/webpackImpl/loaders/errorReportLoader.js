const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const errorReport = `report(error)`;
const core = require("@babel/core")
const reportLoader = function (content) {
    const ast = parser.parse(content);
    let catchNode = parser.parse(errorReport).program.body;
    traverse(ast, {
        FunctionDeclaration: (path) => {
            let body = path.node.body;
            if (types.isBlockStatement(body)) {
                let tryCatchAst = types.tryStatement(
                    body,
                    types.catchClause(
                        types.identifier("e"),
                        types.blockStatement(catchNode)
                    )
                )
                path.replaceWithMultiple([tryCatchAst])
            }
        }
    })
    let rst = core.transformFromAstSync(ast, null).code
    console.log('rst: ', rst);
    return rst
}


module.exports = reportLoader