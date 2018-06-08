[![Build Status](https://travis-ci.org/emmenko/jest-runner-shellcheck.svg?branch=master)](https://travis-ci.org/emmenko/jest-runner-shellcheck)
[![npm version](https://badge.fury.io/js/jest-runner-shellcheck.svg)](https://badge.fury.io/js/jest-runner-shellcheck)

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <img width="150" height="150" src="https://bashlogo.com/img/logo/svg/full_colored_dark.svg">
  <a href="https://facebook.github.io/jest/">
    <img width="150" height="150" vspace="" hspace="25" src="https://user-images.githubusercontent.com/2440089/37489554-6f776bd2-286e-11e8-862f-cb6c398cf752.png">
  </a>
  <h1>jest-runner-shellcheck</h1>
  <p>Shellcheck Linter runner for Jest</p>
</div>

## Usage

This library is a [jest-runner](https://facebook.github.io/jest/docs/en/configuration.html#runner-string) for the [`shellcheck`](https://github.com/koalaman/shellcheck) library.

### Install

Install `jest`_(it needs Jest 21+)_ and `jest-runner-shellcheck`

```bash
yarn add --dev jest jest-runner-shellcheck

# or with NPM

npm install --save-dev jest jest-runner-shellcheck
```

### Add it to your Jest config

#### Standalone

In your `package.json`

```json
{
  "jest": {
    "runner": "jest-runner-shellcheck",
    "displayName": "lint:shell",
    "moduleFileExtensions": ["sh", "bash"],
    "testMatch": ["<rootDir>/src/**/*.sh"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: "jest-runner-shellcheck",
  displayName: "shell lint",
  moduleFileExtensions: ["sh", "bash"],
  testMatch: ["<rootDir>/src/**/*.sh"]
};
```

Please update `testMatch` to match your project folder structure

#### Alongside other runners

It is recommended to use the [`projects`](https://facebook.github.io/jest/docs/en/configuration.html#projects-array-string-projectconfig) configuration option to run multiple Jest runners simultaneously.

If you are using Jest <22.0.5, you can use multiple Jest configuration files and supply the paths to those files in the `projects` option. For example:

```js
// jest-test.config.js
module.exports = {
  // your Jest test options
  displayName: "test"
};

// jest-shellcheck.config.js
module.exports = {
  // your jest-runner-shellcheck options
  runner: "jest-runner-shellcheck",
  displayName: "shell lint",
  moduleFileExtensions: ["sh", "bash"],
  testMatch: ["<rootDir>/src/**/*.sh"]
};
```

In your `package.json`:

```json
{
  "jest": {
    "projects": [
      "<rootDir>/jest-test.config.js",
      "<rootDir>/jest-shellcheck.config.js"
    ]
  }
}
```

Or in `jest.config.js`:

```js
module.exports = {
  projects: [
    "<rootDir>/jest-test.config.js",
    "<rootDir>/jest-shellcheck.config.js"
  ]
};
```

If you are using Jest >=22.0.5, you can supply an array of project configuration objects instead. In your `package.json`:

```json
{
  "jest": {
    "projects": [
      {
        "displayName": "test"
      },
      {
        "runner": "jest-runner-shellcheck",
        "displayName": "lint:shell",
        "moduleFileExtensions": ["sh", "bash"],
        "testMatch": ["<rootDir>/src/**/*.sh"]
      }
    ]
  }
}
```

Or in `jest.config.js`:

```js
module.exports = {
  projects: [
    {
      displayName: "test"
    },
    {
      runner: "jest-runner-shellcheck",
      displayName: "shell lint",
      moduleFileExtensions: ["sh", "bash"],
      testMatch: ["<rootDir>/src/**/*.sh"]
    }
  ]
};
```

### Run Jest

```bash
yarn test
```

## Options

This project uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig), so you can provide config via:

- a `jest-runner-shellcheck` property in your `package.json`
- a `jest-runner-shellcheck.config.js` JS file
- a `.jest-runner-shellcheckrc` JSON file

In `package.json`

```json
{
  "jest-runner-shellcheck": {
    "cliOptions": {
      // Options here
    }
  }
}
```

or in `jest-runner-shellcheck.config.js`

```js
module.exports = {
  cliOptions: {
    // Options here
  }
};
```

### cliOptions

The listed options are the ones provided by the `shellcheck` CLI.

| option          | default      | values                    | example                      |
| --------------- | ------------ | ------------------------- | ---------------------------- |
| checkSourced    | `false`      | `false|true`              | `"checkSourced": true`       |
| color           | `null`       | `auto|always|never`       | `"color": "auto"`            |
| exclude         | `null`       |                           | `"exclude": "CODE1,CODE2.."` |
| format          | `checkstyle` | `checkstyle|gcc|json|tty` | `"format": "json"`           |
| shell           | `sh`         | `sh|bash|dash|ksh`        | `"shell": "bash"`            |
| externalSources | `false`      | `false|true`              | `"externalSources": "true"`  |
