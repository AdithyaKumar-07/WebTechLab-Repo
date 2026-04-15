const express = require('express');
const router = express.Router();

let users = [{ id: 1, name: "Adithya" }, { id: 2, name: "Nikhitha" }];

router.use((req, res, next) => {
    console.log('User API accessed...');
    next();
});
router.get('/', (req, res) => res.json(users));
router.post('/', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;
