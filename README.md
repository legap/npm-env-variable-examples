# npm-env-variable-examples

This example demonstrates the behavior of npm when reading an environment variable that is defined in different locations.

The documentation about [npm config](https://docs.npmjs.com/cli/v7/using-npm/config) states the following:

> ### Environment Variables
>
> Any environment variables that start with `npm_config_` will be
> interpreted as a configuration parameter.  For example, putting
> `npm_config_foo=bar` in your environment will set the `foo`
> configuration parameter to `bar`.  Any environment configurations that
> are not given a value will be given the value of `true`.  Config
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

