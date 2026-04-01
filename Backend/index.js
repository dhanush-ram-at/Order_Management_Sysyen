const express = require("express");
const cors = require("cors");
const app = express();

const { jsonParser, urlencodedParser } = require("./middlewares/bodyParser");
const errorHandler = require("./middlewares/errorHandler");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

// Allow requests from the React dev server
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(jsonParser);           // handles Content-Type: application/json
app.use(urlencodedParser);     // handles Content-Type: application/form data


app.get("/", (req, res) => {
  res.send("OMS backend is running"); 
});

// Auth routes  →  /api/v1/auth/register  |  /api/v1/auth/login  |  /api/v1/auth/refresh
app.use("/api/v1/auth", authRoutes);

// Order routes  →  /api/v1/orders  |  /api/v1/orders/:id
app.use("/api/v1/orders", orderRoutes);

// Serve uploaded files  →  http://localhost:5000/uploads/_filename_
app.use("/uploads", express.static("uploads/order"));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
