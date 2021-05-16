export function isNeedResolveFile(id: string): boolean {
  const index: number = id.indexOf('?')
  const currFileExt: string = id.split('.')[1]
  const resolveFileExt: Array<string> = ['ts', 'tsx', 'js', 'vue']
  if (currFileExt && resolveFileExt.includes(currFileExt)) return true
  // @ts-ignore
  const query: Record<string, any> = Object.fromEntries(new URLSearchParams(id.slice(index)))
  if (index > 1 && currFileExt === 'vue' && query.type === 'script')
    return true

  return false
}
