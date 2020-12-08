// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.changeColumn('assign_teacher_courses', 'course_id', {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       onDelete: 'cascade',
//       onUpdate: 'cascade',
//       references: {
//         model:
//         {
//           tableName: 'courses',
//         },
//         field: 'id'
//       },
//       fields: ['course_id']
//     })
//       .then(async () => {
//         await queryInterface.changeColumn('assign_teacher_courses', 'teacher_id', {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           primaryKey: true,
//           onDelete: 'cascade',
//           onUpdate: 'cascade',
//           references: {
//             model: {
//               tableName: 'teachers'
//             },
//             field: 'id'
//           },
//           fields: ['teacher_id']
//         })
//       })
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.changeColumn('assign_teacher_courses', 'course_id', {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       onDelete: 'cascade',
//       onUpdate: 'cascade',
//       references: {
//         model: 'courses',
//         key: 'id'
//       },
//       fields: ['course_id']
//     })
//       .then(async () => {
//         await queryInterface.changeColumn('assign_teacher_courses', 'teacher_id', {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           primaryKey: true,
//           onDelete: 'cascade',
//           onUpdate: 'cascade',
//           references: {
//             model: 'teachers',
//             key: 'id'
//           },
//           fields: ['teacher_id']
//         })
//       })
//   }
// };
