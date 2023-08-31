"use strict";

// const Populartimes = require("@christophern/populartimesjs").Populartimes;
const axios = require("axios");
require("dotenv").config();
const { GOOGLE_URI } = process.env;

const getHikes = async (req, res) => {
    const { searchTerm, radius } = req.query;

    if (!searchTerm || !radius) {
        return res.status(400).json({ status: 400, message: "Missing search params"});
    };

    try {
        const searchResults = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: searchTerm,
                key: GOOGLE_URI,
            },
        });

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

        if (results) {
            
            res.status(200).json({ status: 200, data: hikesArray });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
};

const getPopularTimes = async (req, res) => {
    // const { hikeId } = req.query;
    // const populartimes = new Populartimes();

    // // populartimes.fullWeek('ChIJaUTPy8HM1IkRzjt3iNsMFGI').then((data) => {
    // //     console.log('🚀', data);
    // // });
    // try {
    //     const hikePoptimes = await populartimes.fullWeek(hikeId);

    //     console.log(hikePoptimes);
    //     if (hikePoptimes) {
    //         res.status(200).json({ status: 200, data: hikePoptimes });
    //     }
    // } catch (err) {
    //     res.status(404).json({ status: 404, message: err.message });
    // }
};

module.exports = {
    getHikes,
    getPopularTimes
} 