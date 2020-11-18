# Promise 任务并发控制器

## 需求描述

1. [`PromiseConcurrencyController`](./src/index.ts) 构造函数接受一个 `number` 类型的参数，作为并发数量。
2. 实例上有一个 `run` 方法，接受一组返回 `Promise` 的函数，多次调用 `run` 方法时传入的函数将以传入的顺序执行，同一个 `PromiseConcurrencyController` 实例不管调用多少次 `run` 方法，传入的任务都需要按照构造**函数中定义的并发数量运行**。
3. `run` 方法返回 `ConcurrencyResult` 实例，它实现了 `AsyncIterator<T, void, void>` 接口，也就是说它可以用 `for ... await` 语句进行迭代。[`ConcurrencyResult`](./src/concurrency-result.ts) 类我们已经帮你实现，并且有相应的测试代码: [`concurrency-result.spec.ts`](./src/__tests__/concurrency-result.spec.ts), 你可以在当前目录下执行 `yarn test` 查看测试结果。
4. `stop` 方法可以暂停控制器，这个方法返回一个 `Promise`, 等待当前正在执行的所有 `Promise` **resolve/reject** 之后返回的 `Promise` 被 `resolve`，该方法返回的 `Promise` 只有可能被 `resolve` 不会被 `reject`。如果已经被暂停则直接 `resolve` 返回的 `Promise`。
5. `resume` 方法可以继续控制器的执行，用于控制器被 `stop` 之后恢复执行。
6. 可以通过实例上的 `activeCount` 与 `pendingCount` 获得正在运行的任务个数以及等待个数。

## 评判标准

- 完成需求
- 补充 `PromiseConcurrencyController` 的单元测试
- 工程化 (CI/CD/Lint 等)
- 代码风格
