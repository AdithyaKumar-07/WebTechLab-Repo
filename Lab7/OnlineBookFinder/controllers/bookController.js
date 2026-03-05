const Book = require('../models/Book');

// 1. Search by Title (Regex)
exports.searchBooks = async (req, res) => {
    try {
        const books = await Book.find({ 
            title: { $regex: req.query.title, $options: "i" } 
        });
        res.json(books);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. Filter by Category
exports.filterByCategory = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.category });
        res.json(books);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 3. Sort by Price or Rating
exports.sortBooks = async (req, res) => {
    try {
        const criteria = req.params.criteria; // 'price' or 'rating'
        const order = criteria === 'price' ? 1 : -1; // Price Asc, Rating Desc
        const books = await Book.find().sort({ [criteria]: order });
        res.json(books);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 4. Top Rated Books
exports.getTopRated = async (req, res) => {
    try {
        const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
        res.json(books);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 5. Pagination
exports.getPaginatedBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const books = await Book.find().skip(skip).limit(limit);
        res.json(books);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
