"use strict";

const axios = require("axios");
require("dotenv").config();
const { GOOGLE_URI, WEATHER_KEY } = process.env;

const { getPopularTimes, getBusynessNow } = require("../scripts/populartimesScripts");

const getHikes = async (req, res) => {
    const { searchTerm, radius } = req.query;

    if (!searchTerm || !radius) {
        return res.status(400).json({ status: 400, message: "Location & radius required"});
    };

    try {
        //get geo coordinates
        const searchResults = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
            params: {
                fields: 'geometry,place_id',
                input: `${searchTerm}`,
                inputtype: 'textquery',
                key: GOOGLE_URI,
            },
        });

        if (searchResults.data.candidates.length > 0) {
            const searchOriginId = searchResults.data.candidates[0].place_id;
            const { lat, lng } = searchResults.data.candidates[0].geometry.location;           
            const radiusInMeters = radius * 1000;
            
            //get hikes within radius
            const hikeResults = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${lat},${lng}`,
                    radius: radiusInMeters,
                    keyword: 'hike',
                    key: GOOGLE_URI,
                },
            });
            
            const { results } = hikeResults.data;

            if (results.length > 0) {
                const hikesArray = await Promise.all(results.map( async (hike) => {

                    //get ref photo from google
                    const photoRef = hike.photos ? hike.photos[0].photo_reference : 'AUacShi6l6hVIvY3H0UKdqfmnhEA6Mzfc12xVuj8sCnsNv2WKuMWpROIy4owHNHTLIeAs_OzvgD-BZjo8igxiaGF8vlPttIV8fEVnggbSqUx1OrIljzMHVu9-QB3twDBT230DSOobQAhjAATVoEnCB7-MHg2LljmX1pRdBi5D7BbSo8_Qgi7';
                    const hikePhotoURLRef = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                        params: {
                            maxwidth: 400,
                            photo_reference: photoRef,
                            key: GOOGLE_URI,
                        },
                    });

                    //get distance & drive time to hike
                    const distanceToTrailHead = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                        params: {
                            destinations: `place_id:${hike.place_id}`,
                            origins: `place_id:${searchOriginId}`,
                            key: GOOGLE_URI,
                        },
                    });

                    const driveTimeToHike = distanceToTrailHead.data.rows[0].elements[0].duration.text;
                    const hikePhotoURL = hikePhotoURLRef.request.res.responseUrl;
                    const populartimes = getPopularTimes();
                    const busyness = getBusynessNow();
                        
                    return ({
                        name: hike.name,
                        address: hike.vicinity,
                        rating: hike.rating,
                        ratingQuant: hike.user_ratings_total,
                        photoURL: hikePhotoURL,
                        place_id: hike.place_id,
                        location: hike.geometry.location, 
                        driveTimeToHike: driveTimeToHike,
                        populartimes: populartimes,
                        busyness: busyness,              
                    })                     
                }));

                res.status(200).json({ status: 200, data: hikesArray });  
            } else {
                res.status(404).json({ status: 404, message: `No hikes found.`})
            }
        } else {
            res.status(404).json({ status: 404, message: "Search location not found."})
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
};

const getWeather = async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ status: 400, message: "Both lat and lng required."});
    }

    try {
        const forecast = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: WEATHER_KEY,
                q: `${lat},${lng}`,
                days: 7,
                aqi: 'yes',
                alerts: 'yes',
            },
        });

        const forecastObj = forecast.data;

        if (forecastObj.hasOwnProperty("location")) {
            delete forecastObj.location;
        }

        if (forecastObj.alerts.alert.length === 0) {
            delete forecastObj.alerts;
        };

        if (forecast.status === 200) {
            res.status(200).json({ status: 200, data: forecast.data });
        } else if (forecast.status === 400) {
            res.status(400).json({ status: 400, message: forecast.message });
        }
    } catch (err) {
        res.status(err.response.status).json({ status: err.response.status, message: err.response.statusText });
    }
};

module.exports = {
    getHikes,
    getWeather
} 