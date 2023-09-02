"use strict";
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const cloudinary = require('cloudinary').v2;
const {
    MONGO_URI,
    CLOUDINARY_KEY,
    CLOUDINARY_SECRET,
    CLOUDINARY_NAME
} = process.env;

const { getPopularTimes, getBusynessNow } = require("../scripts/populartimesScripts");

//mongodb
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const usersCollection = client.db('aloner').collection('users');

//cloudinary
cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_KEY, 
    api_secret: CLOUDINARY_SECRET 
});

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

const getUserHike = async (req, res) => {
    const { id } = req.params;
    const userId = new ObjectId(id);

    try {
        await client.connect();            
        const user = await usersCollection.findOne({ _id: userId });

        if (user) {
            if (user.userHikes && user.userHikes.length > 0) {
                const userHikesResults = user.userHikes.map((hike) => {
                    const populartimesData = getPopularTimes();
                    const busynessData = getBusynessNow();

                    return {
                        ...hike,
                        populartimes: populartimesData,
                        busyness: busynessData,
                    };
                });
                
                res.status(200).json({ status: 200, data: userHikesResults });
            } else {
                res.status(404).json({ status: 404, message: "User hikes not found" });
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

const addUserHike = async (req, res) => {
    const { id, newHike } = req.body;
    const userId = new ObjectId(id);

    try {
        await client.connect();           
        const user = await usersCollection.findOne({ _id: userId });

        if (user) {
            const updateUserHikes = user.userHikes ? user.userHikes : new Array;
            updateUserHikes.push(newHike);
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
            res.status(404).json({ status: 404, message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({ status:500, message: error.message });
    } finally {
        client.close();
    }
};

//placeholder - test
const addUserPhoto = async (req, res) => {
    const { id } = req.params;
    const userId = new ObjectId(id);

    try {
        const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'Loner-profile-photos',
            public_id: id,
        });
    
        const imageUrl = uploadedImage.secure_url;

        await client.connect();
        const result = await usersCollection.updateOne(
            { _id: userId },
            { $set: { profilePhoto: imageUrl } }
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({ status: 200, message: "Profile photo updated successfully" });
        } else {
            res.status(404).json({ status: 404, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
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

const deleteFavHike = async (req, res) => {
    const { id, hikeId } = req.params;
    const userId = new ObjectId(id);

    try {
        await client.connect();           
        const user = await usersCollection.findOne({ _id: userId });

        if (user) {
            if (user.userHikes) {
                const updateUserHikes = user.userHikes.filter(hike => hike.place_id !== hikeId);

                const removeHike = await usersCollection.updateOne(
                    { _id: userId },
                    { $set: { userHikes: updateUserHikes } }
                );

                if (removeHike.modifiedCount === 1) {
                    res.status(200).json({ status: 200, message: "User hike deleted successfully" });
                } else {
                    throw new Error('Failed to add user hike');
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
    getUserHike,
    addUserHike,
    addUserPhoto,
    deleteUser,
    deleteFavHike
};