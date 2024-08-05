const {Model,DataTypes} = require("sequelize")
const sequelize = require("../config/database")
const Book = require("./book")
const Student = require("./student")

class Library extends Model{}

Library.init({
    "startDate" : {
        type : DataTypes.DATE,
        allowNull : false
    },
    "endDate" : {
        type : DataTypes.DATE
    }
},{
    sequelize,
    modelName : "Library",
    tableName : "library"
})

Student.hasMany(Library)
Library.belongsTo(Student)
Book.hasMany(Library)
Library.belongsTo(Book)

module.exports = Library