const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/search', bookController.searchBooks);
router.get('/category/:category', bookController.filterByCategory);
router.get('/sort/:criteria', bookController.sortBooks);
router.get('/top', bookController.getTopRated);
router.get('/', bookController.getPaginatedBooks);

module.exports = router;
