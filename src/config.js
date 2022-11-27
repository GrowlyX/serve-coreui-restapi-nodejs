const fs = require("fs")
const configPath = "config.example.json"

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
        const config = {
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
            configPath, JSON.stringify(config, null, 4)
        )

        if (callback)
            callback()
    } catch (err) {

    }
}

module.exports = {
    generateConfig, configPath
}
