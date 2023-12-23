const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const s3Routes = require("./src/routes/s3Routes");
const thirdPartyRoutes = require("./src/routes/thirdPartyRoutes");

const connectToDatabase = require("./src/database/db");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/auth", authRoutes);
app.use("/api", blogRoutes);
app.use("/s3", s3Routes);
app.use("/third-party-api", thirdPartyRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
