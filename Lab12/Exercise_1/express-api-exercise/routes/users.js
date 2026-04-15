const express = require('express');
const router = express.Router();

let users = [
    { id: 1, name: 'Adithya' },
    { id: 2, name: 'Nikhitha' }
];
router.get('/', (req, res) => {
    res.json(users);
});
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    res.json(user);
});
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');

    user.name = req.body.name;
    res.json(user);
});
router.delete('/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
