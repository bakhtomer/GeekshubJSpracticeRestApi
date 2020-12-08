'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {

    static associate(models) {
      // define association here
      student.belongsToMany(models.course, {    //target id as fk in source
        through: models.assign_student_courses,
        as: "courses",
        foreignKey: "course_id",
        onDelete: 'cascade',
        onUpdate: 'cascade',
        constraints: false
      }),
      student.hasMany(models.assign_student_courses,{
        foreignKey:'student_id',
        onDelete:'cascade',
        onUpdate:'cascade',
        constraints:false,
        as:"students"
      })
    }
    toJSON() {
      return { ...this.get() }
    }
  };
  student.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    //tableName:""  you can add table name here
    modelName: 'student',  //,timestamp:true/false    can be added here
  });
  return student;
};