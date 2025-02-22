require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Use environment variable for MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
    console.log("mongodb Data",data.Collection)
  })
  .catch((err) => {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1); // Exit process to avoid running with an invalid DB connection
  });

// Use environment variable for PORT
const PORT = process.env.PORT || 5000;

app.use("/posts", postRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

