const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const errorReport = ``;
const core = require("@babel/core")
const loadUtil = require("loader-utils")
//实现一个函数包装器
//检查所有的function，是否最外层被trycatch包裹
//如果未包裹，则包裹，并将异常上报，且抛出
const reportLoader = function (content) {
    
    let params = loadUtil.getOptions(this)
    const ast = parser.parse(content, {
        sourceType: "module"
    });
    console.log('11nodes>>>>: ');

    let catchNode = parser.parse(params.catchClause).program.body;
    console.log('22nodes>>>>: ');

    traverse(ast, {
        BlockStatement: (path) => {
    console.log('33nodes>>>>: ');
            let parentPath = path.parentPath
            if (types.isFunctionDeclaration(parentPath.node)) {
                let nodes = path.node.body;

                if (nodes.length != 1 || !types.isTryStatement(nodes[0])) {
                    let tryCatchAst = types.tryStatement(
                        types.blockStatement(nodes),
                        types.catchClause(
                            types.identifier(params.identifier),
                            types.blockStatement(catchNode)
                        )
                    )
                    path.replaceWithMultiple([tryCatchAst])
                }
            }
        }
    })
    let rst = core.transformFromAstSync(ast, null).code
    console.log('rst: ', rst);
    return rst
}
module.exports = reportLoader