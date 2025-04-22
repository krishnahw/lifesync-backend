import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err =>{
    console.log("DB Name:", process.env.DB_NAME);

    if(err) console.log("Error", err);
    else console.log("conneted to data base");
    
    
});

export default db;