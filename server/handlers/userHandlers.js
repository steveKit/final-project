"use strict";
require("dotenv").config();
const axios = require("axios");
const { MongoClient, ObjectId } = require("mongodb");
const {
    MONGO_URI,
} = process.env;

const { getPopularTimes, getBusynessNow } = require("../scripts/populartimesScripts");

const { GOOGLE_URI } = process.env;

//mongodb
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const usersCollection = client.db('aloner').collection('users');

const getUser = async (req, res) => {
    const { id } = req.params;
    const userId = new ObjectId(id);

    try {
        await client.connect();            
        const user = await usersCollection.findOne({ _id: userId });

        if (user) {
            res.status(200).json({ status: 200, data: user });
        } else {
            res.status(404).json({ status: 404, message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({ status:500, message: error.message });
    } finally {
        client.close();
    }
};

const getUserHikes = async (req, res) => {
    const { hikeArray } = req.body;

    if (!hikeArray) {
        return res.status(400).json({ status: 400, message: "Hike id required."});
    };

    try {
        const hikeDetails = await Promise.all(hikeArray.map( async (hike) => {

            const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                params: {
                    place_id: hike,
                    key: GOOGLE_URI,
                },
                
            });
            const hikeDetails = response.data.result;

            return {
                name: hikeDetails.name,
                address: hikeDetails.vicinity,
                rating: hikeDetails.rating,
                ratingQuant: hikeDetails.user_ratings_total,
                reviews: hikeDetails.reviews,
                photos: hikeDetails.photos,
                place_id: hikeDetails.place_id,
                location: hikeDetails.geometry.location,
            };
        }));

        if (hikeDetails) {
            const addPhotos = await Promise.all(hikeDetails.map( async (hike) => {
                const photoRef = hike.photos ? hike.photos[0].photo_reference : 'AUacShi6l6hVIvY3H0UKdqfmnhEA6Mzfc12xVuj8sCnsNv2WKuMWpROIy4owHNHTLIeAs_OzvgD-BZjo8igxiaGF8vlPttIV8fEVnggbSqUx1OrIljzMHVu9-QB3twDBT230DSOobQAhjAATVoEnCB7-MHg2LljmX1pRdBi5D7BbSo8_Qgi7';
                const response = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                    params: {
                        maxwidth: 600,
                        photo_reference: photoRef,
                        key: GOOGLE_URI,
                    },
                });
                const hikePhotoUrl = response.request.res.responseUrl;
                const { photos, ...hikeWithoutPhotos } = hike;
                
                return {
                    ...hikeWithoutPhotos,
                    photoURL: hikePhotoUrl,
                };
            }));

            if (addPhotos) {

                const addData = await Promise.all(addPhotos.map( async (hike) => {

                    const populartimes = getPopularTimes();
                    const busyness = getBusynessNow();
                    
                    return {
                        ...hike,
                        busyness: busyness,
                        populartimes: populartimes,
                    };
                }));
                res.status(200).json({ status: 200, data: addData });
            } else {
                res.status(404).json({ ststus: 404, message: "Error appending hike photo." });
            }
        
        } else {
            res.status(404).json({ ststus: 404, message: "Error retrieving hike details." });
        }
        
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
};

const addUserHike = async (req, res) => {
    const { id, hikeId } = req.params;
    const userId = new ObjectId(id);

    try {
        await client.connect();           
        const user = await usersCollection.findOne({ _id: userId });

        if (user) {
            const updateUserHikes = user.userHikes ? user.userHikes : new Array;

            if (!updateUserHikes.includes(hikeId)) {
                updateUserHikes.push(hikeId);
                const addHike = await usersCollection.updateOne(
                    { _id: userId },
                    { $set: { userHikes: updateUserHikes } }
                );
                
                if (addHike.modifiedCount === 1) {
                    res.status(201).json({ status: 201, message: "User hike added successfully" });
                } else {
                    throw new Error('Failed to add user hike');
                }
            } else {
                res.status(400).json({ status: 400, message: "Hike already in user hikes" });
            }
                        
        } else {
            res.status(404).json({ status: 404, message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({ status:500, message: error.message });
    } finally {
        client.close();
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userId = new ObjectId(id);

    try {
        await client.connect();
        const result = await usersCollection.deleteOne({ _id: userId });

        if (result.deletedCount === 1) {
            res.status(200).json({ status: 200, message: "User deleted successfully" });
        } else {
            res.status(404).json({ status: 404, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    } finally {
        client.close();
    }
};

const deleteUserHike = async (req, res) => {
    const { id, hikeId } = req.params;
    const userId = new ObjectId(id);

    try {
        await client.connect();           
        const user = await usersCollection.findOne({ _id: userId });

        if (user) {
            if (user.userHikes) {
                const updateUserHikes = user.userHikes.filter(hike => hike !== hikeId);
                
                const removeHike = await usersCollection.updateOne(
                    { _id: userId },
                    { $set: { userHikes: updateUserHikes } }
                );
                
                if (removeHike.modifiedCount === 1) {
                    res.status(200).json({ status: 200, message: "User hike deleted successfully" });
                } else {
                    throw new Error('Failed to delete user hike');
                } 
            } else {
                res.status(404).json({ status: 404, message: "Hike not found" });
            }                        
        } else {
            res.status(404).json({ status: 404, message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({ status:500, message: error.message });
    } finally {
        client.close();
    }
};

module.exports = {
    getUser,
    getUserHikes,
    addUserHike,
    deleteUser,
    deleteUserHike
};