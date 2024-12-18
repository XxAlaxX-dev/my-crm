const express = require("express");
const dotenv = require("dotenv");

const app = express();

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();
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
