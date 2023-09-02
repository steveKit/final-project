"use strict";

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    const userId = new ObjectId(id);

    try {
        await client.connect();        
        const db = client.db('aloner');    
        const user = await db.collection('users').findOne({ _id: userId });

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

module.exports = {
    getUser
};