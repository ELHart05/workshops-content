const express = require('express');
const path = require('path');
require('dotenv').config();

const cards = require("./data/cards");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        res.render('index', { cards });
    } catch (error) {
        res.status(500).send("Error getting Clash Royale cards.");
    }
});

app.get('/details', async (req, res) => {
    res.render('details', req.query);
});

app.listen(process.env.PORT ?? 3000, () => {
    console.log('server started');
});
