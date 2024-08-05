const express = require("express");
const cors = require("cors")
const path = require('path');
const sequelize = require("./config/database");
// const bodyParser = require("body-parser");cd
const StudentController = require("./controllers/studentController");
const BookController = require("./controllers/bookController");
const LibraryController = require("./controllers/libraryController");

const port = 8080;
const app = express();

app.use(cors({origin:"*"}))

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Student routes
app.get("/getStudents", StudentController.getStudent);
app.get("/getStudentById/:id",StudentController.getStudentById)
app.post("/addStudent",StudentController.uploadlimit(), StudentController.addStudent); // Apply Multer middleware here
app.put("/updateStudent/:id", StudentController.uploadlimit(), StudentController.updateStudent);
app.delete("/deleteStudent/:id", StudentController.deleteStudent);

// Book routes
app.get("/getBooks", BookController.getBooks);
app.get("/getBookById/:id",BookController.getBookById)
app.post("/addBook", BookController.addBook);
app.put("/updateBook/:id", BookController.updateBook);
app.delete("/deleteBook/:id", BookController.deleteBook);

// Library routes
app.get("/getLibrary", LibraryController.getLibrary);
app.get("/getLibraryById/:id",LibraryController.getLibraryById)
app.post("/addLibrary", LibraryController.addLibrary);
app.put("/updateLibrary/:id", LibraryController.updateLibrary);
app.delete("/deleteLibrary/:id", LibraryController.deleteLibrary);

sequelize.authenticate().then(()=>{
    console.log("database connected..")
}).catch(error=>{
    console.log(error)
})
// Database synchronization
sequelize.sync({ alter: true }).then(() => {
    console.log("Database schema updated...");
}).catch(error => {
    console.log("Error: " + error);
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
