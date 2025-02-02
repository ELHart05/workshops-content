const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.get('*', (req, res) => {
    res.status(404).json({message: 'Page not found'});
});

mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((err) => {
    console.log(err);
})
