const express = require("express");
const connectDB = require("./config/db");
require('./config/dotenv.config'); // Load environment variables
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const taskRoutes = require('./routes/taskRoutes');
const noteRoutes = require('./routes/noteRoutes');

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
