'use strict';
module.exports = {
  up: async (queryInterface, DataTypes,UUIDV4) => {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4
      },
      name: {
        type: DataTypes.STRING
        ,allowNull:false
      },
      isactive: {
        type: DataTypes.BOOLEAN,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('students');
  }
};