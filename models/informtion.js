import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
import User from "./User.js";

const Information = sequelize.define('Information',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model:User,
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
    },image_url:{
        type: DataTypes.STRING(500),
    },mood:{
        type: DataTypes.STRING(100),
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{
    tableName: 'information',
    timestamps: false,
});

Information.belongsTo(User, { foreignKey: 'user_id' });
export default Information;