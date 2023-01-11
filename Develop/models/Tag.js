const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js').default;

class Tag extends Model {}

Tag.init(
  {
    // define columns

    // To create an ID field with auto incrementing primary key and no null values

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,  

  },
    tag_name: {
    type: DataTypes.STRING,
  },
},

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
