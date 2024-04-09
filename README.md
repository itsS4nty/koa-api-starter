# koa-api-starter
A CLI to automatically clone the [Koa API Scaffold](https://github.com/itsS4nty/koa-api-scaffold) or the [Koa API Scaffold with TS](https://github.com/itsS4nty/koa-api-scaffold-ts).

## Usage

### Basic Command Structure

```bash
npx koa-api-starter [options]
```

### Options

- `-t, --typescript`: Use TypeScript template. (Default: `false`)
- `-d, --directory`: Specify the name of the directory to create.
- `--add-deps`: Provide an array of extra dependencies you want to install. (Default: `[]`)
- `--add-dev-deps`: Provide an array of extra development dependencies you want to install. (Default: `[]`)

### Examples

1. Create a KOA Api in a specified directory:

   ```bash
   npx koa-api-starter --directory my-koa-api
   ```
2. Create a KOA Api with TypeScript in a specified directory:

   ```bash
   npx koa-api-starter --typescript --directory my-koa-api
   ```
3. Adding Extra Dependencies:

   ```bash
   npx koa-api-starter --directory my-koa-api --add-deps mongoose axios
   ```
4. Adding Extra Dev Dependencies

   ```bash
   npx koa-api-starter --directory my-koa-api --add-dev-deps @types/mongoose
   ```