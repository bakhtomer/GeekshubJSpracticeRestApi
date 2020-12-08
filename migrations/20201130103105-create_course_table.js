'use strict';

module.exports = {
  up: async (queryInterface, DataTypes, UUIDV4) => {

    await queryInterface.createTable('courses', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
      },
      status:
      {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }

    })
  },

  down: async (queryInterface, DataTypes) => {

    await queryInterface.dropTable('courses')

  }
};
