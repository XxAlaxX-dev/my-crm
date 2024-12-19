const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require('./config/dotenv.config'); // Charger les variables d'environnement
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const taskRoutes = require('./routes/taskRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Connexion à la base de données
connectDB();

// CORS : autoriser l'origine correcte
const allowedOrigins = ['http://localhost:5173'];  // Remplacez par l'origine de votre frontend si nécessaire

app.use(cors({
  origin: (origin, callback) => {
    // Autoriser les requêtes provenant des origines définies
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
}));
app.use(express.json()); // Ajoutez ce middleware pour parser les corps JSON

// Configuration des constantes
const PORT = process.env.PORT || 4000;

// Définition des routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully!",
    status: "success",
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(
    `The server is running successfully on http://localhost:${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
