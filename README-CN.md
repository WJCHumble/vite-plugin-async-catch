## vite-plugin-async-catch

一个可以自动为 `async` 函数注入 `try catch` 代码的 Vite 插件。Inspried by [async-catch-loader](https://github.com/yeyan1996/async-catch-loader).

支持在以下类型的项目中使用:

- vue3
- vue2
- react
- vannila js

## 使用

安装:

```bash
npm i vite-plugin-async-catch -D
```

添加插件到 `vite.config.ts`(或者 `vite.config.js`)。

在 Vue3 项目中:

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AsyncCatch from "../../src/index";

export default defineConfig({
  plugins: [
    vue(),
    AsyncCatch({
      catchCode: `console.error(e)`,
    }),
  ],
});
```

在 Vue2 项目中:

```javascript
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import AsyncCatch from "../../src/index";

export default defineConfig({
  plugins: [
    createVuePlugin(),
    AsyncCatch({
      catchCode: `console.error(e)`,
    }),
  ],
});
```

在 React 项目中:

```typescript
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import AsyncCatch from "../../src/index";

export default defineConfig({
  plugins: [
    reactRefresh(),
    AsyncCatch({
      catchCode: `console.error(e)`,
    }),
  ],
});
```

## Options

`Options` 的类型定义:

```typescript
interface Options {
  catchCode: string;
  identifier?: string;
  finnallyCode?: any;
}
```

其中，每个参数的意义:

| 名称         | 介绍                    | 类型   | 默认值           |
| ------------ | ----------------------- | ------ | ---------------- |
| catchCode    | 在 catch 代码块中使用   | string | console.error(e) |
| identifier   | catch 代码块的错误参数  | string | e                |
| finnallyCode | 在 finally 代码块中使用 | string | null             |
