const express = require("express");
const connectDB = require("./config/db");
require('./config/dotenv.config'); // Load environment variables

const app = express();

// Connect to database
connectDB();


// Configuration des constantes
const PORT = process.env.PORT || 4000;

// Définition des routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully!",
    status: "success",
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(
    `The server is running successfully on http://localhost:${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
