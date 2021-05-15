export interface Options {
  catchCode: (identifier: string) => string
  identifier: string
  finnallyCode: any
  include: Array<string>
}
