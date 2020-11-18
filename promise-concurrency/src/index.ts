import { ConcurrencyResult } from './concurrency-result'

export type Task<T> = () => Promise<T>

export class PromiseConcurrencyController<T> {
  activeCount = 0
  pendingCount = 0

  constructor(public readonly size: number) {}

  run(...tasks: Task<T>[]): ConcurrencyResult<T> {}

  async stop(): Promise<void> {}

  resume() {}
}
