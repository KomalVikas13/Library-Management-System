const {Model,DataTypes} = require("sequelize")
const sequelize  = require("../config/database")

class Book extends Model{}

Book.init({
    "name" : {
        type : DataTypes.STRING,
        allowNull : false
    },
    "author" : {
        type : DataTypes.STRING,
        allowNull : false
    },
    "publication" : {
        type : DataTypes.STRING,
        allowNull : false
    },
    "date" : {
        type : DataTypes.DATE,
        allowNull : false
    }
},
{
    sequelize,
    modelName : "Book",
    tableName : "books"
})


module.exports = Book