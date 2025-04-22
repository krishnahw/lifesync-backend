# LifeSync Backend

This is the backend for the LifeSync application. It handles user registration, login, mood tracking, and image uploads using MySQL and Cloudinary.

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL (hosted on Railway)
- Sequelize ORM
- Cloudinary for image uploads
- JWT + bcrypt for authentication

## 📁 Project Structure


## 🚀 How to Run Locally

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file:
    ```env
    DATABASE_URL=your-mysql-url
    CLOUD_NAME=your-cloudinary-cloud-name
    API_KEY=your-cloudinary-api-key
    API_SECRET=your-cloudinary-secret
    JWT_SECRET=your-jwt-secret
    ```

4. Run the server:
   ```bash
   nodemon app.js
