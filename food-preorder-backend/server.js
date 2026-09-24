import config from "./src/config/env.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = config.port;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
