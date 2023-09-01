"use strict";

const axios = require("axios");
require("dotenv").config();
const { GOOGLE_URI } = process.env;

const {
    lowestWeights,
    lowWeights,
    midWeights,
    highWeights,
    variableMidDayWeights,
    hourWeights
} = require("../data/populartimesWeightArrays");

const getHikes = async (req, res) => {
    const { searchTerm, radius } = req.query;

    if (!searchTerm || !radius) {
        return res.status(400).json({ status: 400, message: "Both searchTerm and searchRadius required"});
    };

    try {
        const searchResults = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: searchTerm,
                key: GOOGLE_URI,
            },
        });

        if (searchResults) {
            const { lat, lng } = searchResults.data.results[0].geometry.location;
            const radiusInMeters = radius * 1000;
            
            const hikeResults = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${lat},${lng}`,
                    radius: radiusInMeters,
                    keyword: 'hike',
                    key: GOOGLE_URI,
                },
            });

            if (hikeResults) {
                const { results } = hikeResults.data;

                const hikesArray = results.map(hike => {
                    const photoRef = hike.photos[0].photo_reference;

                    return {
                        name: hike.name,
                        address: hike.vicinity,
                        rating: hike.rating,
                        ratingQuant: hike.user_ratings_total,
                        photoURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_URI}`,
                        place_id: hike.place_id,
                        location: hike.geometry.location,
                    }
                });           
                res.status(200).json({ status: 200, data: hikesArray });
            } else {
                res.status(404).json({ status: 404, message: `No hikes found within ${radius}km of ${searchTerm}`})
            }
        } else {
            res.status(404).json({ status: 404, message: "Search location not found"})
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
};

const getPopularTimes = async (req, res) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const populartimesData = [];

    const todayIndex = new Date().getDay();

    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayIndex = (todayIndex + i - 1) % 7;
        const day = daysOfWeek[dayIndex];

        const hourlyData = hourWeights.map(weight => Math.floor(Math.random() * weight));

        populartimesData.push({
            name: day,
            data: hourlyData,
        });
    }

    if (populartimesData.length > 0) {
        res.status(200).json({ status:200, data: populartimesData });
    } else {
        res.status(404).json({ status:404, message: "Populartimes data not found" });

    }
    
};

const getBusynessNow = async (req, res) => {
    const currentDate = new Date();
    const timeNow = currentDate.getHours();

    if (timeNow && timeNow < hourWeights.length) {
        const currentPopularity = Math.floor(Math.random() * hourWeights[timeNow]);
        res.status(200).json({ status: 200, data: currentPopularity });
    } else {
        res.status(404).json({ status: 404, message: "couldn't find current usage data" });
    }
};

const getWeather = async (req, res) => {

};

module.exports = {
    getHikes,
    getPopularTimes,
    getBusynessNow,
    getWeather
} 