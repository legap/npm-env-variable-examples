const os = require('os')

console.log(`================================================================================`)
console.log(`Platform: ${os.platform()}-${os.arch()}`)
console.log(`================================================================================`)
console.log(`variables matching our key`)
console.log(`--------------------------------------------------------------------------------`)
logMatchingVariableKeys('CYPRESS_VERIFY_TIMEOUT')
console.log(`--------------------------------------------------------------------------------`)

const getEnvLower = getEnv('cypress_verify_timeout')
const getEnvUpper = getEnv('CYPRESS_VERIFY_TIMEOUT')

let structuredTableData = [
    {
        variable: 'CYPRESS_VERIFY_TIMEOUT',
        lowercase: process.env.cypress_verify_timeout,
        uppercase: process.env.CYPRESS_VERIFY_TIMEOUT,
        getEnvLower: getEnvLower,
        getEnvUpper: getEnvUpper
    },
    {
        variable: 'npm_config_CYPRESS_VERIFY_TIMEOUT',
        lowercase: process.env.npm_config_cypress_verify_timeout,
        uppercase: process.env.npm_config_CYPRESS_VERIFY_TIMEOUT,
        getEnvLower: getEnvLower,
        getEnvUpper: getEnvUpper
    },
    {
        variable: 'npm_package_config_CYPRESS_VERIFY_TIMEOUT',
        lowercase: process.env.npm_package_config_cypress_verify_timeout,
        uppercase: process.env.npm_package_config_CYPRESS_VERIFY_TIMEOUT,
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
