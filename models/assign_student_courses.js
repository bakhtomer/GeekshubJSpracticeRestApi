'use strict';
const {
    Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class assign_student_courses extends Model {

        static associate(models) {
            // define association here
            assign_student_courses.belongsTo(models.course, {    //target id as fk in source
                foreignKey: "course_id",
                constraints: true,
                as:"courses"
            })
                assign_student_courses.belongsTo(models.student, {
                    foreignKey: "student_id",
                    onDelete: "cascade",
                    onUpdate: "cascade",
                    as:"students"
                })
        }
        toJSON() {
          return { ...this.get(),id:undefined }
        }
    };
    assign_student_courses.init({}, {
        sequelize,
        modelName: 'assign_student_courses', timestamps: true
    });
    return assign_student_courses;
}