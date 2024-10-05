const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Harry Potter", author: "J.K Rowling" }
];

// Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

// Create a new book
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Title and author required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book by ID
app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === bookId);

    if(!book){
        return res.status(404).json({message: "Book not found"});
    }

    if(title) book.title = title;
    if(author) book.author = author;

    res.json(book);
});

// Delete a book by ID
app.delete('/api/books/:id', (req,res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if(bookIndex === -1){
        return res.status(404).json({message: "Book not found"});
    }

    books.splice(bookIndex, 1);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
