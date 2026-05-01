'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  pokemon.init({
    pokemon_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(225)
    },
    height: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    weight: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    base_experience: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    image: {
        allowNull: false,
        type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'pokemon',
    tableName: 'pokemons',
    paranoid: true  
  });
  return pokemon;
};