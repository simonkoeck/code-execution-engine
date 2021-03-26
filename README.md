# Code-Execution-Engine

A simple and secure Code-Execution-Engine in Javascript

## Table of Contents

[Installation](#installation)

[Usage](#usage)

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

<a name="contributing"/>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

<a name="license"/>

## License

[MIT](https://choosealicense.com/licenses/mit/)
