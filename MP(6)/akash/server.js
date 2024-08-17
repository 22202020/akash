// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5500;
//http://127.0.0.1:5500/
// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'donate_food_app';

// Route to serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

// Route to handle form submission
app.post('/submit_form', async (req, res) => {
    try {
        const client = new MongoClient(url);

        // Connect to MongoDB
        await client.connect();

        // Access specific database
        const db = client.db(dbName);

        // Access specific collection
        const collection = db.collection('donations');

        // Insert form data into MongoDB
        await collection.insertOne(req.body);

        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        client.close(); // Close MongoDB connection
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
