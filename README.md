## vite-plugin-async-catch

<a href="https://www.npmjs.com/package/vite-plugin-async-catch" target="_blank">
<img src="https://img.shields.io/npm/v/vite-plugin-async-catch"/>
</a>

[English](https://github.com/WJCHumble/vite-plugin-async-catch/blob/main/README.md) | [中文](https://github.com/WJCHumble/vite-plugin-async-catch/blob/main/README-CN.md)

A vite plugin that can auto inject try catch code for async function. Inspried by [async-catch-loader](https://github.com/yeyan1996/async-catch-loader).

Support use in:

- vue3
- vue2
- react
- vannilla js

## Usage

Install:

```bash
npm i vite-plugin-async-catch -D
```

Add the plugin to the `vite.config.ts`(or `vite.config.js`).

In Vue3 project:

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AsyncCatch from "vite-plugin-async-catch";

export default defineConfig({
  plugins: [
    vue(),
    AsyncCatch({
      catchCode: `console.error(e)`,
    }),
  ],
});
```

In Vue2 project:

```javascript
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import AsyncCatch from "vite-plugin-async-catch";

export default defineConfig({
  plugins: [
    createVuePlugin(),
    AsyncCatch({
      catchCode: `console.error(e)`,
    }),
  ],
});
```

In React project:

```typescript
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import AsyncCatch from "vite-plugin-async-catch";

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

The `Options` type definition:

```typescript
interface Options {
  catchCode: string;
  identifier?: string;
  finnallyCode?: any;
}
```

The meaning of each paramter:

| name         | introduce                         | type   | default          |
| ------------ | --------------------------------- | ------ | ---------------- |
| catchCode    | use in the catch block            | string | console.error(e) |
| identifier   | the error argument of catch block | string | e                |
| finnallyCode | use in the finally block          | string | null             |
