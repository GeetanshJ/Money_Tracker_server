import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./db.js";

export const transactions = sequelize.define('Transactions',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },

    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'users',
            key:'id'
        },
        allowNull:false
    },

    description:{
        type:DataTypes.STRING,
        allowNull:false
    },

    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    debit:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tablename:"transactions",
    timestamps:false
})