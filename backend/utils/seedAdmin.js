const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: "Admin" });

    if (adminExists) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // Replace with a secure password
    const adminUser = new User({
      name: "Admin",
      email: "admin@gmail.com", // Replace with a valid email
      password: hashedPassword,
      role: "Admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

module.exports = { seedAdminUser };
