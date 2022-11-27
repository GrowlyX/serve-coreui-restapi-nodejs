const fs = require("fs")
const configPath = "config.json"

const loadConfig = () => {
    return JSON.parse(
        fs
            .readFileSync(configPath)
            .toString()
    )
}

const generateConfig = (callback) => {
    // check if config already exists, if it does, cancel.
    try {
        if (fs.existsSync(configPath)) {
            //exists
            if (callback)
                callback()
            return
        }

        // declare default values
        const defaultValues = {
            "database": {
                "uri": "mongodb://localhost:27017/",
                "dbname": "sensors",
                "collection": "realtime"
            },
            "webserver": {
                "port": "80",
                "limit": 60,
                "rateLimit": false
            }
        }

        // write them
        fs.writeFileSync(
            configPath, JSON.stringify(defaultValues, null, 4)
        )

        if (callback)
            callback()
    } catch (err) {

    }
}

module.exports = {
    generateConfig, configPath, loadConfig
}
