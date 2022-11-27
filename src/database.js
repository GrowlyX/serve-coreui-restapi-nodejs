const {MongoClient} = require('mongodb');
const {config} = require("./config");

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

const findAllSensorData = (callback) => {
    collection.findOne({})
        .then((docs) => {
            if (docs == null || docs.length === 0) {
                callback({
                    "status": 204,
                    "error": "No data found!"
                })
                return
            }

            if (callback)
                callback(docs);
        })
}

module.exports = {
    findAllSensorData
}
