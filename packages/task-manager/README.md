# Task Manager

A simple task manager vite app

## Run

Run the preview app with a production build using the `pnpm preview` command *from the root folder*.

For development you can use `pnpm dev`.

## Build

To build it simply run `pnpm build` *from the root folder* which will build alls packages or `pnpm build:app` to build this app only.

## Test
You can run the test from the root folder using the following command:

```bash
pnpm --filter @lateral/task-manager test
```

You can also watch for changes:

```bash
pnpm --filter @lateral/task-manager test:watch
```

Alternativelly, you can also `cd` into this folder and run `pnpm test` or `pnpm test:watch`:

```bash
cd packages/task-manager
```

```bash
pnpm test
```

```bash
pnpm test:watch