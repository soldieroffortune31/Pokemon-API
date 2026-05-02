'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pokemon_abilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pokemon_abilities.belongsTo(models.pokemon, {
        as: "pokemon",
        foreignKey: "pokemon_id",
        targetKey: "pokemon_id"
      })
      
      pokemon_abilities.belongsTo(models.abilities, {
        as: "ability",
        foreignKey: "ability_id",
        targetKey: "ability_id"
      })
    }
  }
  pokemon_abilities.init({
    pokemonability_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    pokemon_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ability_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    is_hidden: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    slot: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'pokemon_abilities',
    tableName: 'pokemon_abilities',
    paranoid: true  
  });
  return pokemon_abilities;
};