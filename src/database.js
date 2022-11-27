const fs = require("fs")
const {MongoClient} = require('mongodb');
const {configPath} = require("./config");

const config = JSON.parse(
    fs.readFileSync(configPath).toString()
)

const client = new MongoClient(
    "mongodb://localhost:27017/"
)
let collection

client
    .connect()
    .then(() => {
        const db = client.db(config.database.dbname);
        collection = db.collection(config.database.collection);
    }, (err) => {
        console.log("Failed to connect to MongoDB: " + err)
    })

const getSensorDataNoRestrictions = (callback) => {
    collection.findOne({})
        .then((docs) => {
            if (docs == null) {
                callback({
                    "status": 204,
                    "error": "No data found! [1]"
                })
                return
            }

            if (docs.length !== 0) {
                if (callback)
                    callback(docs);
            } else {
                if (callback)
                    callback({
                        "status": 200,
                        "error": "No data found!"
                    })
            }
        })
}

module.exports = {
    getSensorDataNoRestrictions
}
