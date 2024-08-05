const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/database")

class Student extends Model{}

Student.init({
    "name" : {
        type : DataTypes.STRING,
        allowNull : false
    },
    "class" : {
        type : DataTypes.STRING,
        allowNull : false
    },
    "image" : {
        type : DataTypes.STRING,
        allowNull : false
    },
    "video" : {
        type : DataTypes.STRING,
        allowNull : false
    }
},
{
    sequelize,
    modelName : "Student",
    tableName : "students"
}
)


module.exports = Student