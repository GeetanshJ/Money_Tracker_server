import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("money_tracker","root","root",{
    logging:false,
    host:"localhost",
    dialect:"mysql",
    pool:{
        acquire:10000,
        idle:5000
    },
})

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
