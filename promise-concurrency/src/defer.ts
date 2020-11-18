export interface Defer<T> {
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  promise: Promise<T>
}

export function defer<T>(): Defer<T> {
  let resolve: Defer<T>['resolve']
  let reject: Defer<T>['reject']
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { resolve: resolve!, reject: reject!, promise }
}
