const fs = require('fs')
const express = require('express')
const app = express()
const rateLimit = require('express-rate-limit')
const {configPath} = require("./config");
const path = require('path')
const {getSensorDataNoRestrictions} = require("./database");

const config = JSON.parse(
    fs
        .readFileSync(configPath)
        .toString()
)

const run = () => {
    const limiter = rateLimit({
        windowMs: 60 * 1000,
        max: config.webserver.limit,
        message: {
            error: 'You have exceeded the requests in 1 min limit! Please try again soon.'
        },
        headers: true,
    })

    const rateLimiter = (req, res, next) => {
        // apply rate limiter middleware
        limiter(req, res, next);
    }

    // Configure rate limiter
    const port = config.webserver.port
    app.use(rateLimiter);

    // Configure serve React
    app.use(express.static(path.join(__dirname, 'build')));

    // Listen on wildcard `/*` endpoints, react router
    // will handle everything else
    app.get('/*', function (req, res) {
        // Serve built React content
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    // Configure API routes
    app.get('/api/sensors', (req, res) => {
        getSensorDataNoRestrictions((docs) => {
            res.send(docs)
        })
    })

    console.log(`listening on ${port}`)
    app.listen(port)
}

module.exports = {
    run
}
