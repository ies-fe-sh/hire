import { Defer, defer } from './defer'

export class ConcurrencyResult<T> implements AsyncIterator<T, void, void> {
  private readonly values: T[] = []
  private readonly defersQueue: Defer<T>[] = []
  private rejectReason: unknown | null = null

  private isDone = false

  done() {
    this.isDone = true
  }

  reject(e: unknown) {
    if (this.defersQueue.length) {
      this.defersQueue.shift()!.reject(e)
    } else {
      this.rejectReason = e
    }
  }

  yield(value: T) {
    if (this.defersQueue.length) {
      this.defersQueue.shift()!.resolve(value)
    } else {
      this.values.push(value)
    }
  }

  async next() {
    if (this.rejectReason) {
      throw this.rejectReason
    }

    if (this.isDone && !this.values.length && !this.defersQueue.length) {
      return {
        done: true as const,
        value: void 0,
      }
    }
    if (this.values.length) {
      return {
        done: false as const,
        value: this.values.shift()!,
      }
    }
    const d = defer<T>()
    this.defersQueue.push(d)
    const value = await d.promise

    return {
      done: false as const,
      value,
    }
  }

  [Symbol.asyncIterator] = () => {
    return this
  }
}
