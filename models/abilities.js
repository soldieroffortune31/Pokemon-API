'use strict';
const {
  Model
} = require('sequelize');
const pokemon_abilities = require('./pokemon_abilities');
module.exports = (sequelize, DataTypes) => {
  class abilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      abilities.hasMany(models.pokemon_abilities, {
        as: "pokemon_abilities",
        foreignKey: "ability_id",
        sourceKey: "ability_id"
      })
    }
  }
  abilities.init({
    ability_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(225)
    },
    url: {
        allowNull: false,
        type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'abilities',
    tableName: 'abilities',
    paranoid: true  
  });
  return abilities;
};