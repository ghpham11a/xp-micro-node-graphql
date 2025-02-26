import mongoose from 'mongoose';

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testdb");
    console.log("Connected to MongoDB");

    // ... start your Express/GraphQL server here ...
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
}

startServer();