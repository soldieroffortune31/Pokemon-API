'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sprites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sprites.belongsTo(models.pokemon, {
        as: "pokemon",
        foreignKey: "pokemon_id",
        targetKey: "pokemon_id"
      })
    }
  }
  sprites.init({
    sprite_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    pokemon_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    back_default: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    back_female: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    back_shiny: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    back_shiny_female: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    front_default: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    front_female: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    front_shiny: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    front_shiny_female: {
      allowNull: true,
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'sprites',
    tableName: 'sprites',
    paranoid: true  
  });
  return sprites;
};