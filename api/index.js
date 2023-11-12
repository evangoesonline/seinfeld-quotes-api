// Import necessary modules
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();

// Create an Express application
const app = express();
const port = 3001; // You can use any port you prefer

// Middleware to enable CORS
app.use(cors());

// MongoDB connection URL and database name
const url = process.env.MONGODB_URI;
const dbName = 'quotes';
const collectionName = 'quote-main';

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to get data from the MongoDB collection
app.get('/api/quotes', async (req, res) => {
    try {
        // Connect to MongoDB
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();

        // Access the quotes collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Query the collection for all documents
        const quotes = await collection.find({}).toArray();

        // Close the connection
        await client.close();

        // Send the quotes as a JSON response
        res.json(quotes);
    } catch (error) {
        console.error('Error retrieving quotes:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

