# unabashed

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/skulls-dot-codes/unabashed?style=flat-square)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/unabashed?style=flat-square)
![GitHub Sponsors](https://img.shields.io/github/sponsors/skulls-dot-codes?style=flat-square)
![GitHub](https://img.shields.io/github/license/endevr-io/wsl-api?style=flat-square)

Launch (almost) any application or browser tab from a JSON file. This is a wrapper for `sindresorhus/open`.

# Install

```shell
npm install -D unabashed
```

# Usage

By default unabashed looks for a `unabashed.json` file in the same directory as the command is run in.

```shell
unabashed
```

If you need to use a custom file name then you can add an optional argument as the filename.

> Note: the file must be in the same folder as the command is run and must **not** contain a relative or full path.

```shell
unabashed open.json
```

# JSON

The JSON file must meet certain criteria from unabashed it's dependencies. If you need help then please refer to the source code of unabashed or the `sindresorhus/open` readme.

> Note: The JSON file **must** be an array of items to open

## Application

Open applications or run commands with the `app` type. You can pass additional arguments to open the application or run the command

```json
...
{
    "type": "app",
    "path": "wt",
    "options": {
      "arguments": [
        "-d",
        "path\\to\\laravel\\homestead",
        "cmd",
        "/k",
        "vagrant up && vagrant ssh"
      ]
    }
  },
...
```

## Browser

Open browser links in tabs with the `browser` type and an array of `urls`. If no options are included then the links will open in your default browser.

> Note: this might not work for all browsers and when specifying a certain browser then the only options are `chrome`, `edge`, and `firefox`. This is a limitation of `sindresorhus/open`

```json
...
{
  "type": "browser",
  "options": {
    "app": {
      "name": "firefox",
      "arguments": [
        "-private"
      ]
    }
  },
  "urls": [
    "https://github.com/skulls-dot-codes/unabashed"
  ]
},
...
```

## File

Open a file with the `file` type. The file opens with whatever the default application is to view/edit it.

```json
...
{
  "type": "file",
  "path": "unabashed.png"
},
...
```