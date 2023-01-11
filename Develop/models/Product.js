// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection').default;

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // This column is defined as an integer and is set as the primary key for the table. It also has the autoIncrement flag set to true, which means that the value for this column will automatically be incremented for each new row that is inserted into the table.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },

  // defined as a string and is set to not allow null values.
    product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  //This column is defined as a decimal, it also set to not allow null values, and it has a validation function of    isDecimal to check whether or not the value inputed is decimal or not.
    price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,

      },
          },

  //This column is defined as an integer, it also set to not allow null values, and it has a validation function of isNumeric to check whether or not the value inputed is numeric or not.
    stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      isNumeric: true,
    },
},
    
  //This column is defined as an integer, it also set to not allow null values, and it has a validation function of isNumeric to check whether or not the value inputed is numeric or not.
  
    category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'category',
      key: 'id',
    },
  },
},

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
