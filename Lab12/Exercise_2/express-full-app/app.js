const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.render('index'));
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
