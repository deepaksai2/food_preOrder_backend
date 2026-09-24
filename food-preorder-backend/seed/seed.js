import "../src/config/env.js";
import bcrypt from "bcryptjs";
import connectDB from "../src/config/db.js";
import User from "../src/models/User.js";
import MenuItem from "../src/models/MenuItem.js";

const seed = async () => {
  try {
    await connectDB();

    const adminPassword = await bcrypt.hash("Admin@123", 12);
    const studentPassword = await bcrypt.hash("Student@123", 12);

    await User.findOneAndUpdate(
      { email: "admin@cafeteria.com" },
      {
        name: "Cafeteria Admin",
        email: "admin@cafeteria.com",
        password: adminPassword,
        role: "ADMIN"
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await User.findOneAndUpdate(
      { email: "student@college.com" },
      {
        name: "Demo Student",
        email: "student@college.com",
        password: studentPassword,
        role: "USER"
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await MenuItem.deleteMany({});

    await MenuItem.insertMany([
      { name: "Idly", category: "Breakfast", price: 30, isAvailable: true },
      { name: "Dosa", category: "Breakfast", price: 50, isAvailable: true },
      { name: "Veg Biryani", category: "Lunch", price: 80, isAvailable: true },
      { name: "Chicken Rice", category: "Lunch", price: 120, isAvailable: true },
      { name: "Samosa", category: "Snacks", price: 20, isAvailable: true },
      { name: "Tea", category: "Beverages", price: 15, isAvailable: true },
      { name: "Juice", category: "Beverages", price: 30, isAvailable: false }
    ]);

    console.log("Seed completed successfully");
    console.log("ADMIN: admin@cafeteria.com / Admin@123");
    console.log("USER : student@college.com / Student@123");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
