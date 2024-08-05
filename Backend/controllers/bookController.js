const Book = require("../models/book");

class BookController {
    static async getBooks(req, res) {
        try {
            const books = await Book.findAll();
            res.status(200).json(books);
        } catch (error) {
            res.status(400).json({message : error.message});
        }
    }

    static async getBookById(req, res) {
        try {
            const book = await Book.findByPk(req.params.id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({message : "Book not found"});
            }
        } catch (error) {
            res.status(500).json({message : "Error finding book: " + error});
        }
    }

    static async addBook(req, res) {
        try {
            const book = await Book.create(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({message : "Error: " + error});
        }
    }

    static async updateBook(req, res) {
        try {
            const [updated] = await Book.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedBook = await Book.findByPk(req.params.id);
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ message: "Record not updated..." });
            }
        } catch (error) {
            res.status(400).json({message : "Error: " + error});
        }
    }

    static async deleteBook(req, res) {
        try {
            const deleted = await Book.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(200).json({ message: "Record deleted..." });
            } else {
                res.status(404).json({ message: "Record not found..." });
            }
        } catch (error) {
            res.status(400).json({message : "Error: " + error});
        }
    }
}

module.exports = BookController;
