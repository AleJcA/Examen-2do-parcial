const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Producto = sequelize.define('Producto',{

    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    nombre:{
        type: DataTypes.STRING
    },

    descripcion:{
        type: DataTypes.TEXT
    },

    precio:{
        type: DataTypes.DECIMAL
    },

    estado:{
        type: DataTypes.STRING
    },

    categoria:{
        type: DataTypes.STRING
    },

    url_fotografia:{
        type: DataTypes.TEXT
    }

},{
    tableName:'Producto',
    timestamps:false
});

module.exports = Producto;