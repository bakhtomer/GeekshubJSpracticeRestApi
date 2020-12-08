'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assign_teacher_courses', {
      course_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model:{
            tableName:'courses'
          },
          field: 'id'
        },
        fields:['course_id']
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,

        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: {
            tableName: 'teachers'
          },
          field: 'id'
        },
        fields:['teacher_id']
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
  /*   .then(() => {
      queryInterface.addConstraint('assign_teacher_courses', {
        name: "teacher_course_fk1",
        type: 'FOREIGN KEY',
        references: {
            table: 'courses',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        fields: ['course_id']
      });
    })
    .then(() => {
      queryInterface.addConstraint('assign_teacher_courses', {
        name: "teacher_course_fk2",
        type: 'foreign key',
        references: {
          table: 'teachers',
          field: 'id'
        },
        onDelete: 'set Null',
        onUpdate: 'cascade',
        fields: ['teacher_id']
      });
    })
    .then(() => {
      queryInterface.addIndex('assign_teacher_courses', ['teacher_id'], {
        name:'teacher_id_indx',
        // unique: true,
        // type:'index'
      })
    })
  // */
   
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assign_teacher_courses');
  }
};