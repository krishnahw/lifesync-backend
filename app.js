import dotenv from "dotenv";
dotenv.config();





import express from "express";
import cors from "cors";
import db from './config/db.js';
import dataRouter from './routers/dataRouters.js'; 
import sequelize from "./config/dataBase.js";
import User from "./models/User.js";
import Information from "./models/informtion.js";




const app = express();

//middleware

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', dataRouter); 

app.listen(process.env.PORT, () => {
  try {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log("error", error);
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to Railway ✅');
    return sequelize.sync(); // This will auto-create the tables if not exists
  })
  .then(() => {
    console.log('Tables created and models synced! 🚀');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
