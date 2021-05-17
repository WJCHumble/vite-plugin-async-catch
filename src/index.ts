import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { NodePath } from 'babel__traverse'
import {
  Node,
  Statement,
  BlockStatement,
  isFunctionDeclaration,
  isArrowFunctionExpression,
  isFunctionExpression,
  isObjectMethod,
  isClassMethod,
  AwaitExpression,
  isTryStatement,
  tryStatement,
  isBlockStatement,
  catchClause,
  identifier,
  blockStatement,
} from '@babel/types'
import { transformFromAstSync } from '@babel/core'
import { Plugin } from 'vite'
import { Options } from './types'
import { isNeedResolveFile } from './utils'

const DEFAUTL_OPTIONS: Options = {
  catchCode: 'console.error(e)',
  identifier: 'e',
  finnallyCode: null,
}

function isAsyncFuncNode(node: Node): boolean {
  return isFunctionDeclaration(node, {
    async: true,
  })
  || isArrowFunctionExpression(node, {
    async: true,
  })
  || isFunctionExpression(node, {
    async: true,
  })
  || isObjectMethod(node, {
    async: true,
  })
  || isClassMethod(node, {
    async: true,
  })
}

export default function vitePluginAsyncCatch(options: Options = {} as Options): Plugin {
  // init options
  options = {
    ...DEFAUTL_OPTIONS,
    ...options,
  }
  // get catch code
  const catchStatement: Array<Statement> = parse(options.catchCode).program.body
  const finallyStatement: Array<Statement> = options.finnallyCode && parse(options.finnallyCode).program.body

  return {
    name: 'vite-plugin-async-catch',
    transform(code: any, id: string) {
      // filter no need resolve file
      if (!isNeedResolveFile(id))
        return code

      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['dynamicImport'],
      })
      // inject try catch code
      traverse(ast, {
        AwaitExpression(path: NodePath<AwaitExpression>) {
          // return already have try catch code
          if (path.findParent((path: NodePath) => isTryStatement(path.node))) return
          // find the NodePath of outermost
          const blockParentPath: NodePath = path.findParent((path: NodePath) => isBlockStatement(path.node) && isAsyncFuncNode(path.parentPath.node)) as NodePath
          // create a try catch AST
          const tryCatchAst: Node = tryStatement(
            blockParentPath.node as BlockStatement,
            catchClause(
              identifier(options.identifier as string),
              blockStatement(catchStatement),
            ),
            finallyStatement && blockStatement(finallyStatement),
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
