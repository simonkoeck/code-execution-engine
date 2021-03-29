[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://GitHub.com/simonkoeck/code-execution-engine/graphs/commit-activity) [![GitHub license](https://img.shields.io/github/license/simonkoeck/code-execution-engine?style=for-the-badge)](https://github.com/simonkoeck/code-execution-engine/blob/master/LICENSE) ![npm](https://img.shields.io/npm/dw/code-execution-engine?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/simonkoeck/code-execution-engine?style=for-the-badge)

# Code-Execution-Engine

A fast and secure Code-Execution-Engine in Javascript.

❗This package is not secure by default. Visit [Security](#security) for production projects.❗

## Table of Contents

[Installation](#installation)

[Usage](#usage)

[Supported Languages](#supported-languages)

[Security](#security)

[LXC](#lxc)

[Contributing](#contributing)

[License](#license)

<a name="installation"/>

## Installation

Use the package manager [npm](https://www.npmjs.com) to install Code-Execution-Engine.

```bash
$ npm install code-execution-engine
```

<a name="usage"/>

## Usage

```javascript
const cee = require("code-execution-engine");

cee
  .execute("print('Hello World')", cee.languages.PYTHON3)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

### execute(_input_, _language_) → Promise&lt;String&gt;

Returns the result (stdout) of the executed code. If stderr is not empty, an exception will be thrown with the content of stderr.

_input_: string – The code you want to execute.

_language_: cee.Language – Pass the language the code is written in, for example `cee.languages.PYTHON3`. [Supported Lanuages](#supported-languages)

<a name="supported-languages"/>

## Supported Languages

|   Windows    |    Linux     |
| :----------: | :----------: |
|  `Python3`   |  `Python3`   |
| `Javascript` | `Javascript` |
|    `Ruby`    |    `Ruby`    |
|     `Go`     |     `Go`     |
|   `Batch`    |    `Bash`    |
|              |     `C`      |
|              |    `C++`     |
|              |    `Java`    |

More supported languages coming soon.

<a name="security"/>

## Security

IMPORTANT: There are no security modules available for windows!

```javascript
const cee = require("code-execution-engine");

const executor = new cee.LXC("[NAME OF YOUR LXC-CONTAINER]");

// Run this line after the installation of the container
executor.init();

executor
  .execute("echo 'Im in a secure environment!'", cee.languages.BASH)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

To use LXC, follow the instructions below to setup LXC.

<a name="lxc"/>

## LXC

LXC are Linux containers, that run the code in a different and secure environment. To use them, you need to install them first. LXC are only available on Linux-Systems.

To use this package with LXC, you need to install an unprivileged container.

**Follow these instructions: [linuxcontainers.org](https://linuxcontainers.org/lxc/getting-started/#creating-unprivileged-containers-as-a-user)**

<a name="contributing"/>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

<a name="license"/>

## License

[MIT](https://choosealicense.com/licenses/mit/)
