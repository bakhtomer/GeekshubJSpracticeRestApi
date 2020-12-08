'use strict';
const {
    Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class assign_teacher_courses extends Model {

        static associate(models) {
            // define association here
            assign_teacher_courses.belongsTo(models.course, {    //target id as fk in source
                foreignKey: "course_id",
                constraints: true,
                as:"courses"
            }),
                assign_teacher_courses.belongsTo(models.teacher, {
                    foreignKey: "teacher_id",
                    onDelete: "cascade",
                    onUpdate: "cascade",
                    as:"teachers"
                })
        }
        toJSON() {
          return { ...this.get(),id:undefined }
        }
    };
    assign_teacher_courses.init({}, {
        sequelize,
        modelName: 'assign_teacher_courses', timestamps: true
    });
    return assign_teacher_courses;
}