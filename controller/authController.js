import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//register

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO users (username, email, password) VALUES(?, ?, ?)`;
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error registering user", error: err });
    res
      .status(201)
      .json({ message: "User register sucessfully", userId: result });
  });
};

//login

export const login = async (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err)
      return res
        .status(500)
        .json({
          message: "Error occurred while accessing the database",
          error: err,
        });


    if (results.length === 0)
      return res.status(401).json({ message: "No user found" });

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(bcrypt.compare(password,user.password ))
      if (!isMatch)
        return res.status(401).json({ message: "wrong password" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      console.error("Error comparing password:", error);
      return res
        .status(500)
        .json({ message: "Error comparing password", error });
    }
  });
};
