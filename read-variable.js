const os = require('os')

console.log(`================================================================================`)
console.log(`Platform: ${os.platform()}-${os.arch()}`)
console.log(`================================================================================`)
console.log(`variables matching our key`)
console.log(`--------------------------------------------------------------------------------`)
logMatchingVariableKeys('MY_CUSTOM_VARIABLE')
console.log(`--------------------------------------------------------------------------------`)

const getEnvLower = getEnv('my_custom_variable')
const getEnvUpper = getEnv('MY_CUSTOM_VARIABLE')

let structuredTableData = [
    {
        variable: 'MY_CUSTOM_VARIABLE',
        lowercase: process.env.my_custom_variable,
        uppercase: process.env.MY_CUSTOM_VARIABLE,
        getEnvLower: getEnvLower,
        getEnvUpper: getEnvUpper
    },
    {
        variable: 'npm_config_MY_CUSTOM_VARIABLE',
        lowercase: process.env.npm_config_my_custom_variable,
        uppercase: process.env.npm_config_MY_CUSTOM_VARIABLE,
        getEnvLower: getEnvLower,
        getEnvUpper: getEnvUpper
    },
    {
        variable: 'npm_package_config_MY_CUSTOM_VARIABLE',
        lowercase: process.env.npm_package_config_my_custom_variable,
        uppercase: process.env.npm_package_config_MY_CUSTOM_VARIABLE,
        getEnvLower: getEnvLower,
        getEnvUpper: getEnvUpper
    }
]
console.table(structuredTableData)


function logMatchingVariableKeys(keyToMatch) {
    let env = process.env
    for (let key in env) {
        if (key.endsWith(keyToMatch.toUpperCase()) || key.endsWith(keyToMatch.toLowerCase())) {
            console.log(`${key}=${env[key]}`)
        }
    }
}

function getEnv(varName) {

    const configVarName = `npm_config_${varName}`
    const packageConfigVarName = `npm_package_config_${varName}`

    let result

    if (process.env.hasOwnProperty(varName)) {
        console.log(`Using ${varName} from environment variable`)
        result = process.env[varName]
    } else if (process.env.hasOwnProperty(configVarName)) {
        console.log(`Using ${varName} from npm config`)
        result = process.env[configVarName]
    } else if (process.env.hasOwnProperty(packageConfigVarName)) {
        console.log(`Using ${varName} from package.json config`)
        result = process.env[packageConfigVarName]
    }
    return result
}
