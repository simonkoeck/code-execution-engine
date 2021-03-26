[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/simonkoeck/code-execution-engine/graphs/commit-activity) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/simonkoeck) [![GitHub license](https://img.shields.io/github/license/simonkoeck/code-execution-engine)](https://github.com/simonkoeck/code-execution-engine/blob/master/LICENSE) [![GitHub contributors](https://img.shields.io/github/contributors/simonkoeck/code-execution-engine)](https://GitHub.com/simonkoeck/code-execution-engine)

# Code-Execution-Engine

A simple and secure Code-Execution-Engine in Javascript.

## Table of Contents

[Installation](#installation)

[Usage](#usage)

[Supported Languages](#supported-languages)

[Security](#security)

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

<a name="supported-languages"/>

## Supported Languages

- Python3
- Javascript
- Ruby

<a name="security"/>

## Security

IMPORTANT: There are no security modules available for windows!

```javascript
const cee = require("code-execution-engine");

const options = {
  security: {
    enabled: true, // defaults to false
    uselxc: true, // enhanced security, but you need to install it first
    timeout: 10, // 10 seconds timeout
  },
};

cee.execute("print('Hi!')", cee.languages.PYTHON3, options);
```

#### LXC

LXC are Linux containers, that run the code in a different and secure environment. To use them, you need to install them first. LXC are only available on Linux-Systems.

<a name="contributing"/>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

<a name="license"/>

## License

[MIT](https://choosealicense.com/licenses/mit/)
