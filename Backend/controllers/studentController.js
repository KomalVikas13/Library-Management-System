const multer = require("multer");
const path = require("path");
const Student = require("../models/student");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, `uploads/`);
    },
    filename: (req, file, cd) => {
        cd(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

class StudentController {
    async addStudent(req, res) {
        try {
            // Validate files and body
            if (!req.files || !req.files.image || !req.files.video) {
                return res.status(400).send("Image and video files are required.");
            }

            req.body.image = req.files.image[0].path;
            req.body.video = req.files.video[0].path;

            const student = await Student.create(req.body);
            res.status(201).json(student);
        } catch (error) {
            console.error("Error adding student:", error);
            res.status(400).json({message:error.message});
        }
    }

    uploadlimit() {
        return upload.fields([
            { name: "image", maxCount: 1 },
            { name: "video", maxCount: 1 }
        ]);
    }

    async getStudent(req, res) {
        try {
            const students = await Student.findAll();
            res.status(200).json(students);
        } catch (error) {
            console.error("Error fetching students:", error);
            res.status(400).json({message:error.message});
        }
    }

    async getStudentById(req, res) {
        try {
            const student = await Student.findByPk(req.params.id);
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({message :'Student not found'});
            }
        } catch (error) {
            console.error("Error finding student:", error);
            res.status(500).json({message : error.message});
        }
    }

    async updateStudent(req, res) {
        try {
            // Initialize an object to hold the update fields
            const updateFields = { ...req.body };
    
            // Check if files exist and update file paths if present
            if (req.files) {
                if (req.files.image) {
                    updateFields.image = req.files.image[0].path;
                }
                if (req.files.video) {
                    updateFields.video = req.files.video[0].path;
                }
            }
    
            // Perform the update operation
            const response = await Student.update(updateFields, {
                where: { id: req.params.id }
            });
    
            // Check if update was successful
            res.status(202).json(response)
        } catch (error) {
            console.error("Error updating student:", error);
            res.status(400).json({message : error.message});
        }
    }

    async deleteStudent(req, res) {
        try {
            const deleted = await Student.destroy({
                where: { id: req.params.id }
            });

            if (deleted) {
                res.status(200).json({message : "Student record deleted"});
            } else {
                res.status(404).json({message : "Student record not found"});
            }
        } catch (error) {
            console.error("Error deleting student:", error);
            res.status(400).json({message : error.message});
        }
    }
}

module.exports = new StudentController();
