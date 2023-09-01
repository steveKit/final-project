'use strict';

const express = require('express');
const morgan = require('morgan');

const PORT = 8000;

const { getHikes, getPopularTimes, getBusynessNow, getWeather } = require("./handlers/locationDataHandlers");

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
    .get("/api/populartimes", getPopularTimes)
    .get("/api/get-busyness-now", getBusynessNow)
    .get("/get-weather", getWeather)


    .listen(PORT, () => console.info(`Listening on port ${PORT}`));
