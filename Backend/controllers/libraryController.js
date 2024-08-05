const Library = require("../models/library");
const Book = require("../models/book");
const Student = require("../models/student");

class LibraryController {
    static async getLibrary(req, res) {
        try {
            const library = await Library.findAll({
                include: [
                    {
                        model: Student
                    },
                    {
                        model: Book
                    }
                ]
            });
            res.status(200).json(library);
        } catch (error) {
            res.status(400).json({ message : "Error: " + error});
        }
    }
    static async getLibraryById(req, res) {
        try {
            const library = await Library.findByPk(req.params.id);
            if (library) {
                res.status(200).json(library);
            } else {
                res.status(404).json({message : "Library not found"});
            }
        } catch (error) {
            res.status(500).json({message : "Error finding library: " + error});
        }
    }
    static async addLibrary(req, res) {
        try {
            const library = await Library.create(req.body);
            res.status(201).json(library);
        } catch (error) {
            res.status(400).json({message : "Error: " + error});
        }
    }

    static async updateLibrary(req, res) {
        try {
            const [updated] = await Library.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedLibrary = await Library.findByPk(req.params.id, {
                    include: [
                        {
                            model: Student
                        },
                        {
                            model: Book
                        }
                    ]
                });
                res.status(200).json(updatedLibrary);
            } else {
                res.status(404).json({ message: "Record not updated..." });
            }
        } catch (error) {
            res.status(400).json({ message : "Error: " + error});
        }
    }

    static async deleteLibrary(req, res) {
        try {
            const deleted = await Library.destroy({
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

module.exports = LibraryController;
