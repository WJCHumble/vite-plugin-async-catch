import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { NodePath } from 'babel__traverse'
import t, { Node, Statement, BlockStatement } from '@babel/types'
import { transformFromAstSync } from '@babel/core'
import { Plugin } from 'vite'
import { Options } from './types'

const DEFAUTL_OPTIONS: Options = {
  catchCode: identifier => `console.error(${identifier})`,
  identifier: 'e',
  finnallyCode: null,
  include: [".ts", ".tsx", ".js", ".vue"]
}

function isAsyncFuncNode(node: Node): boolean {
  return t.isFunctionDeclaration(node, {
    async: true,
  })
  || t.isArrowFunctionExpression(node, {
    async: true,
  })
  || t.isFunctionExpression(node, {
    async: true,
  })
  || t.isObjectMethod(node, {
    async: true,
  })
  || t.isClassMethod(node, {
    async: true,
  })
}

export default function vitePluginAsyncCatch(options: Options = {} as Options): Plugin {
  // init options
  options = {
    ...DEFAUTL_OPTIONS,
    ...options,
  }
  // filter no need file
  if (options.) {}
  // get catch code
  const catchCode: string = options.catchCode(options.identifier)

  const catchStatement: Array<Statement> = parse(catchCode).program.body
  const finallyStatement: Array<Statement> = options.finnallyCode && parse(options.finnallyCode).program.body

  return {
    name: 'vite-plugin-async-catch',
    transform(code: any, id: string) {
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['dynamicImport'],
      })
      // inject try catch code
      traverse(ast, {
        AwaitExpression(path: NodePath<t.AwaitExpression>) {
          // return already have try catch code
          if (path.findParent((path: NodePath) => t.isTryStatement(path.node))) return
          // find the NodePath of outermost
          const blockParentPath: NodePath = path.findParent((path: NodePath) => t.isBlockStatement(path.node) && isAsyncFuncNode(path.parentPath.node)) as NodePath
          // create a try catch AST
          const tryCatchAst: Node = t.tryStatement(
            blockParentPath.node as BlockStatement,
            t.catchClause(
              t.identifier(options.identifier),
              t.blockStatement(catchStatement),
            ),
            finallyStatement && t.blockStatement(finallyStatement),
          )
          // replace the async function's body
          blockParentPath.replaceWithMultiple([tryCatchAst])
        },
      })

      code = transformFromAstSync(ast, '', {
        configFile: false,
      })!.code
      return code
    },
  }
}
