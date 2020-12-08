'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assign_student_courses', {
      //making both the fk as composite primary id
     
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: {
            tableName: 'courses',
          },
          field: 'id'
        },
        fields: ['course_id']
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: {
            tableName: 'students',
          },
          field: 'id'
        },
        fields: ['student_id']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    //  .then(() => {
    //     queryInterface.addIndex('assign_student_courses', ['student_id', 'course_id'], {
    //       name: 'composite_fields_primary',
    //       // unique: true,
    //       type: 'PRIMARY'
    //     })
    //   });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assign_student_courses');
  }
};