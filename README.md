## vite-plugin-async-catch

A vite plugin that can auto inject try catch code for async function. Inspried by [async-catch-loader](https://github.com/yeyan1996/async-catch-loader).

Support use in:

- vue3
- vue2
- react
- vannila js

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

In Vue2 project:

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

In React project:

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

The `Options` definition:

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
