# Handling environment variables with npm

## Table of content

- [Introduction](#introduction)
- [Experiments](#experiments)
    - [Passing a variable from the command line](#passing a variable from the command line)
    - [Passing a variable from npmrc](#passing a variable from npmrc)
    - [Passing a variable from package.json](#passing a variable from package.json)

## Introduction

This example demonstrates the behavior of npm when reading an environment variable that is defined at different
locations.

The documentation about [npm config](https://docs.npmjs.com/cli/v8/using-npm/config) states the following:

> ### Environment Variables
>
> Any environment variables that start with `npm_config_` will be
> interpreted as a configuration parameter. For example, putting
> `npm_config_foo=bar` in your environment will set the `foo`
> configuration parameter to `bar`. Any environment configurations that
> are not given a value will be given the value of `true`. Config
> values are case-insensitive, so `NPM_CONFIG_FOO=bar` will work the
> same. However, please note that inside [npm-scripts](/misc/scripts)
> npm will set it's own environment variables and Node will prefer
> those lowercase versions over any uppercase ones that you might set.
> For details see [this issue](https://github.com/npm/npm/issues/14528).
>
> ### npmrc Files
>
> The four relevant files are:
>
> * per-project configuration file (`/path/to/my/project/.npmrc`)
> * per-user configuration file (defaults to `$HOME/.npmrc`; configurable via CLI
    >   option `--userconfig` or environment variable `$NPM_CONF_USERCONFIG`)
> * global configuration file (defaults to `$PREFIX/etc/npmrc`; configurable via
    >   CLI option `--globalconfig` or environment variable `$NPM_CONF_GLOBALCONFIG`)
> * npm's built-in configuration file (`/path/to/npm/npmrc`)

## Experiments

This project contains a simple setup with different environment variable constellations. Some experiments and their
result are described bellow.

### Passing a variable from the command line

In this experiment we simply pass the environment variable from the command line, one time in lower and the other time
in upper case.

#### Command line lowercase

```
my_custom_variable=cli npm run verify
```

This results in the following variable states:

|                variable                 | lowercase | uppercase | getEnvLower | getEnvUpper |
|-----------------------------------------|-----------|-----------|-------------|-------------|
|          'MY_CUSTOM_VARIABLE'           |   'cli'   | undefined |    'cli'    |  undefined  |
|     'npm_config_MY_CUSTOM_VARIABLE'     | undefined | undefined |    'cli'    |  undefined  |
| 'npm_package_config_MY_CUSTOM_VARIABLE' | undefined | undefined |    'cli'    |  undefined  |

The table contains the following rows:

- variable   :  name as referenced for process.env, i.e. `process.env.MY_CUSTOM_VARIABLE`
- lowercase  : value when reading the env key in lowercase, i.e. `process.env.my_custom_variable`
- uppercase  : value when reading the env key in uppercase, i.e. `process.env.MY_CUSTOM_VARIABLE`
- getEnvLower: value when calling the method getEnv with key in lowercase, i.e. `getEnv('my_custom_variable')`
- getEnvUpper: value when calling the method getEnv with key in uppercase, i.e. `getEnv('MY_CUSTOM_VARIABLE')`

#### Command line uppercase

```
MY_CUSTOM_VARIABLE=cli npm run verify
```

|                variable                 | lowercase | uppercase | getEnvLower | getEnvUpper |
|-----------------------------------------|-----------|-----------|-------------|-------------|
|          'MY_CUSTOM_VARIABLE'           | undefined |   'cli'   |  undefined  |    'cli'    |
|     'npm_config_MY_CUSTOM_VARIABLE'     | undefined | undefined |  undefined  |    'cli'    |
| 'npm_package_config_MY_CUSTOM_VARIABLE' | undefined | undefined |  undefined  |    'cli'    |

### Passing a variable from npmrc

Here we set the env variable in the `.npmrc` file and run `npm run verify`.

#### npmrc lowercase

content of .npmrc:

```
my_custom_variable=npmrc
```

|                variable                 | lowercase | uppercase | getEnvLower | getEnvUpper |
|-----------------------------------------|-----------|-----------|-------------|-------------|
|          'MY_CUSTOM_VARIABLE'           | undefined | undefined |   'npmrc'   |  undefined  |
|     'npm_config_MY_CUSTOM_VARIABLE'     |  'npmrc'  | undefined |   'npmrc'   |  undefined  |
| 'npm_package_config_MY_CUSTOM_VARIABLE' | undefined | undefined |   'npmrc'   |  undefined  |

#### npmrc uppercase

content of .npmrc:

```
MY_CUSTOM_VARIABLE=npmrc
```

|                variable                 | lowercase | uppercase | getEnvLower | getEnvUpper |
|-----------------------------------------|-----------|-----------|-------------|-------------|
|          'MY_CUSTOM_VARIABLE'           | undefined | undefined |   'npmrc'   |  undefined  |
|     'npm_config_MY_CUSTOM_VARIABLE'     |  'npmrc'  | undefined |   'npmrc'   |  undefined  |
| 'npm_package_config_MY_CUSTOM_VARIABLE' | undefined | undefined |   'npmrc'   |  undefined  |

This result is interesting. Even when setting `MY_CUSTOM_VARIABLE=npmrc` in uppercase it appears with the lowercase key.
The experiment was made on a linux box. This has to do with the remark
about [how npm handles env variables inside scripts](https://docs.npmjs.com/cli/v8/using-npm/config#environment-variables)
and the linked [issue](https://github.com/npm/npm/issues/14528).

### Passing a variable from package.json

Here, we include a config object in the package.json as described in
the [package.json doc](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#config).

#### package.json lowercase

```
  "config": {
    "my_custom_variable": "package"
  }
```

|                variable                 | lowercase | uppercase | getEnvLower | getEnvUpper |
|-----------------------------------------|-----------|-----------|-------------|-------------|
|          'MY_CUSTOM_VARIABLE'           | undefined | undefined |  'package'  |  undefined  |
|     'npm_config_MY_CUSTOM_VARIABLE'     | undefined | undefined |  'package'  |  undefined  |
| 'npm_package_config_MY_CUSTOM_VARIABLE' | 'package' | undefined |  'package'  |  undefined  |

#### package.json uppercase

```
  "config": {
    "MY_CUSTOM_VARIABLE": "package"
  }
```

|                variable                 | lowercase | uppercase | getEnvLower | getEnvUpper |
|-----------------------------------------|-----------|-----------|-------------|-------------|
|          'MY_CUSTOM_VARIABLE'           | undefined | undefined |  undefined  |  'package'  |
|     'npm_config_MY_CUSTOM_VARIABLE'     | undefined | undefined |  undefined  |  'package'  |
| 'npm_package_config_MY_CUSTOM_VARIABLE' | undefined | 'package' |  undefined  |  'package'  |

