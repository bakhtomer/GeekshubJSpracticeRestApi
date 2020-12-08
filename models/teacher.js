'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacher extends Model {

    static associate(models) {
      // FOR M:N type
      teacher.belongsToMany(models.course, {    //target id as fk in source
      through: models.assign_teacher_courses,
      as: 'courses',  
      foreignKey: 'course_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        constraints: false,
        // underscored: true
      }),
      teacher.hasMany(models.assign_teacher_courses,{
        foreignKey:'teacher_id',
        onDelete:'cascade',
        onUpdate:'cascade',
        constraints:false,
        as:"teachers"
      })

    }
    // toJSON() {
    //   return { ...this.get(), id: undefined }
    // }
  };
  teacher.init({

    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   allowNull: false,
    //   autoIncrement: true
    // },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'teacher' //,timestamps:false  incase if you dont want onCreate and onUpdate
  });

  return teacher;
};