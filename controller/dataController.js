import db from "../config/db.js";
import DataModel from "../models/dataModel.js";
import upload from "../models/multer.js";

export const addData = (req, res) => {
  const { title, description, mood } = req.body;
  const image = req.file.path;
  const userId = req.user.id;
  const cleanDescription = description.replace(/\t/g, ''); 


  console.log("File:", req.file);
  console.log("Body:", req.body);

  const newData = new DataModel(userId, title, cleanDescription, image, mood);

  const sql =
    "INSERT INTO information (user_id, title, description,  image_url, mood) VALUES (?,?, ?, ?, ?)";
  db.query(
    sql,
    [newData.userId, newData.title, cleanDescription, newData.image, newData.mood],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error", error: err });
      res.status(201).json({ message: "Data saved", id: result.insertId });
    }
  );
};

export const getData = (req, res) => {
  const sql = "SELECT * FROM information";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error", error: err });
    res.status(200).json(results);
  });
};

// user data

export const getUserData = (req, res) => {
  const selectedDate = req.query.date;
  const userId = req.user.id;

  let query = "";
  let values = [];

  if (selectedDate) {
    query =
      "SELECT * FROM information WHERE user_id = ? AND DATE(createdAt) = ? ORDER BY createdAt DESC";
    values = [userId, selectedDate];
  } else {
    query =
      "SELECT * FROM information WHERE user_id = ? ORDER BY createdAt DESC LIMIT 10";
    values = [userId];
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json(result);
  });
};
