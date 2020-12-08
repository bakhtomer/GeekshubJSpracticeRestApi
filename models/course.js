'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {

    static associate(models) {
      course.belongsToMany(models.teacher, {   //PUTTING TARGET ID IN COURSES
        through: models.assign_teacher_courses,
        foreignKey: 'teacher_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        as: "teachers",
        constraints: true
      }),course.hasMany(models.assign_teacher_courses,{
        foreignKey:'course_id',
        as:'courses_',
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        }),
      course.belongsToMany(models.student, {      //PUTTING STUDENT ID IN COURSES
        through: models.assign_student_courses,
        as: 'students',
        foreignKey: "student_id",
        onDelete: 'cascade',
        onUpdate: 'cascade',
        constraints: true
      })
      course.hasMany(models.assign_student_courses,{
        foreignKey:'course_id',
        as:"course_s",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        })
      
        

    }
    toJSON() {    //use to hide id from frontEnd
      return { ...this.get() }
    }
  };
  course.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
      // defaultValue:UUIDV4
    },
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};