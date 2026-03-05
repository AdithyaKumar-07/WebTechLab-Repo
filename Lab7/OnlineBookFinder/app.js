const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.static('public')); // Serve frontend files

mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection error:", err));

app.use('/books', bookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
