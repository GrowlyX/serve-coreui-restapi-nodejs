const web = require("./web")
const config = require("./config")

console.log("starting...")
config.generateConfig(() => { web.run() })



