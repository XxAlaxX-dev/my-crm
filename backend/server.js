const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("./config/dotenv.config"); // Load environment variables
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { seedAdminUser } = require("./utils/seedAdmin");
const path = require("path");
const app = express();

// Connect to the database
connectDB().then(async () => {
  // Seed the admin user after successful database connection
  await seedAdminUser();
});

// CORS: Allow the correct origin
const allowedOrigins = ["http://localhost:5173"]; // Replace with your frontend origin if necessary

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Constants
const PORT = process.env.PORT || 4000;

// Define routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully!",
    status: "success",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(
    `The server is running successfully on http://localhost:${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
