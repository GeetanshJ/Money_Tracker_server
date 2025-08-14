import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./db.js";

export const user = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    profile_id:{
        type:DataTypes.INTEGER
    },

    vip:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    tablename:"users",
    timestamps:false
})