const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const url = process.env.MONGODB_URI;
const dbName = 'quotes';
const collectionName = 'quote-main';

app.use(express.json());

app.get('/api/quotes', async (req, res) => {
    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Get the selected character from the query parameter
        const selectedCharacter = req.query.author;

        // Create a filter based on the selected character
        const filter = selectedCharacter ? { author: selectedCharacter } : {};

        const quotes = await collection.find(filter).toArray();

        await client.close();

        res.json(quotes);
    } catch (error) {
        console.error('Error retrieving quotes:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Define a route to serve index.html as the default file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
