# Design System

Atomic design components that can be reused accross multiple projects.

## Build

To build it simply run `pnpm build` *from the root folder* which will build alls packages or `pnpm build:ds` to build this package only.

## Test
You can run the test from the root folder using the following command:

```bash
pnpm --filter @lateral/design-system test
```

You can also watch for changes:

```bash
pnpm --filter @lateral/design-system test:watch
```

Alternativelly, you can also `cd` into this folder and run `pnpm test` or `pnpm test:watch`:

```bash
cd packages/design-system
```

```bash
pnpm test
```

```bash
pnpm test:watch
```