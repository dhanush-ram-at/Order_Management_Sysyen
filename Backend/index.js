const express = require("express");
const cors = require("cors");
const app = express();

const API_ROUTES = require("./constants/apiRoutes");
const { jsonParser, urlencodedParser } = require("./middlewares/bodyParser");
const errorHandler = require("./middlewares/errorHandler");
const orderRoutes  = require("./routes/orderRoutes");
require("dotenv").config();


// to allow only the specific localhost
app.use( cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(jsonParser);
app.use(urlencodedParser);

// to check the server is working or not
app.get("/", (req, res) => {
  res.send("OMS backend is running");
});

// /api/v1/orders
app.use(API_ROUTES.BASE, orderRoutes);


// show uploaded files in browser
// http://localhost:5000/uploads/1774527550775.png
app.use(
  API_ROUTES.UPLOADS.base,
  express.static(API_ROUTES.UPLOADS.folder)
);


//error handler
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});