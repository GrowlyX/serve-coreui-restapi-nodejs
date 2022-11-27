const express = require('express')
const app = express()

const rateLimit = require('express-rate-limit')
const path = require('path')

const {findAllSensorData, loadMongo} = require("./database");
const {loadConfig} = require("./config");

const run = () => {
    const config = loadConfig()
    loadMongo()

    const port = config.webserver.port

    // Configure rate limiter (if enabled)
    if (config.webserver.rateLimit) {
        const limiter = rateLimit({
            windowMs: 60 * 1000,
            max: config.webserver.limit,
            message: {
                error: 'You have exceeded the requests allowed in 1 minute! Please try again soon.'
            },
            headers: true,
        })

        const rateLimiter = (req, res, next) => {
            if (req.endpoint.startsWith("/api")) {
                // apply rate limiter middleware
                limiter(req, res, next);
            }
        }

        app.use(rateLimiter);
    }

    // Configure API routes
    app.get('/api/sensors', (req, res) => {
        findAllSensorData(
            (docs) => { res.send(docs) }
        )
    })

    // Configure serve React
    app.use(express.static(path.join(__dirname, 'build')));

    // Listen on wildcard `/*` endpoints, react router
    // will handle everything else
    app.get('/*', function (req, res) {
        // Serve built React content
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    console.log(`listening on ${port}`)
    app.listen(port)
}

module.exports = {
    run
}
