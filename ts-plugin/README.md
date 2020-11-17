# 简单的 `TypeScript transform plugin`

## 背景介绍
在大型单页应用中, 我们会经常使用 `dynamic import` 语法对应用进行 chunk 切分和异步加载。

但是在 `webpack` 的 `dev` 模式下, `dynamic import` 非常的多余并且会让构建变得异常缓慢，所以我们需要一个简单的 `TypeScript transform plugin` 将所有 `dynamic import` 语句替换成同步 `import` 的方式。

比如:

```ts
import { useState, useEffect }, React from 'react'

export function AsyncLogin() {
  const [Login, setLogin] = useState()
  const Login = useEffect(() => {
    import('./login').then(({ LoginComponent }) => {
      setLogin(() => LoginComponent)
    })
  }, [])

  if (!Login) {
    return <Loading />
  }
  return <Login />
}
```

 ↓ ↓ ↓ ↓ ↓ ↓

```ts
import { useState, useEffect }, React from 'react'
import * as __SOME_UNIQUE_NAME__ from './login'

export function AsyncLogin() {
  const [Login, setLogin] = useState()
  const Login = useEffect(() => {
    Promise.resolve(__SOME_UNIQUE_NAME__).then(({ LoginComponent }) => {
      setLogin(() => LoginComponent)
    })
  }, [])

  if (!Login) {
    return <Loading />
  }
  return <Login />
}
```

## 参考资料

- https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
- https://astexplorer.net/
- https://zhuanlan.zhihu.com/p/30360931
- https://github.com/Brooooooklyn/ts-import-plugin
- https://github.com/LeetCode-OpenSource/emotion-ts-plugin
- https://github.com/Igorbek/typescript-plugin-styled-components
