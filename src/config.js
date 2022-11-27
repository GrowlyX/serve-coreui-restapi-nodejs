const fs = require("fs")
const configPath = "config.example.json"

let config

const generateConfig = (callback) => {
    // check if config already exists, if it does, cancel.
    try {
        if (fs.existsSync(configPath)) {
            config = JSON.parse(
                fs
                    .readFileSync(configPath)
                    .toString()
            )

            //exists
            if (callback)
                callback()
            return
        }

        // declare default values
        const defaultValues = {
            "database": {
                "host": "localhost",
                "port": "27017",
                "username": "admin",
                "password": "",
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

        config = JSON.parse(
            fs
                .readFileSync(configPath)
                .toString()
        )

        if (callback)
            callback()
    } catch (err) {

    }
}

module.exports = {
    generateConfig, configPath, config
}
