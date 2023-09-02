'use strict';

const express = require('express');
const morgan = require('morgan');

const PORT = 8000;

const { getHikes, getWeather } = require("./handlers/locationDataHandlers");
const { getUser } = require("./handlers/userHandlers");

express()
    .use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, HEAD, GET, PUT, POST, DELETE'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('./server/assets'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

    //locationData endpoints
    .get("/api/get-hikes", getHikes)
    .get("/api/get-weather", getWeather)

    //user enpoints
    .get("/api/get-user/:id", getUser)

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));
