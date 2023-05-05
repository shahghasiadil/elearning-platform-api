const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to mydatabase");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed");
    process.exit(0);
  });
});
