# koa-api-starter
A CLI to automatically clone the [Koa API Scaffold](https://github.com/itsS4nty/koa-server-scaffold) or the [Koa API Scaffold with TS](https://github.com/itsS4nty/koa-server-scaffold-ts).

## Usage

After installing, you can create a new Koa API project by using the `koa-api-starter` command followed by a set of options to customize your project setup.

### Basic Command Structure

```bash
koa-api-starter [options]
```

### Options

- `-t, --typescript`: Use TypeScript template. (Default: `false`)
- `-d, --directory`: Specify the name of the directory to create.
- `--add-deps`: Provide an array of extra dependencies you want to install. (Default: `[]`)
- `--add-dev-deps`: Provide an array of extra development dependencies you want to install. (Default: `[]`)

### Examples

1. Create a KOA Api in a specified directory:

   ```bash
   koa-api-starter --directory my-koa-api
   ```
2. Create a KOA Api with TypeScript in a specified directory:

   ```bash
   koa-api-starter --typescript --directory my-koa-api
   ```
3. Adding Extra Dependencies:

   ```bash
   koa-api-starter --directory my-koa-api --add-deps mongoose axios
   ```
4. Adding Extra Dev Dependencies

   ```bash
   koa-api-starter --directory my-koa-api --add-dev-deps @types/mongoose
   ```