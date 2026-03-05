use('bookstore'); // Database name

db.books.insertMany([
  { "title": "JavaScript Essentials", "author": "John Smith", "category": "Programming", "price": 450, "rating": 4.5, "year": 2023 },
  { "title": "Node.js Guide", "author": "Jane Doe", "category": "Programming", "price": 550, "rating": 4.8, "year": 2022 },
  { "title": "Learning MongoDB", "author": "Bob Wilson", "category": "Database", "price": 400, "rating": 3.9, "year": 2021 },
  { "title": "React for Beginners", "author": "Alice Brown", "category": "Programming", "price": 600, "rating": 4.7, "year": 2023 },
  { "title": "UI/UX Basics", "author": "Chris Evans", "category": "Design", "price": 300, "rating": 4.2, "year": 2020 }
]);
