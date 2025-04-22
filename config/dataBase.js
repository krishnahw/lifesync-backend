import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'mysql',
    dialectOptions :{
        ssl: {
            rejctUnauthorized : true,
        },
    },
});

export default sequelize;