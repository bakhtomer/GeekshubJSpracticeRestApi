'use strict';

module.exports = {
  up: async (queryInterface, Sequelize, UUIDV4) => {
  
    await queryInterface.createTable('teachers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },

      name: {
        type: Sequelize.STRING,
        allowNull: null
      },
      status: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('teachers')
  }
};
