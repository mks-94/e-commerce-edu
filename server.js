const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const { sendError } = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(express.json());

app.enable("trust proxy");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRoutes);

//Error Handler
app.use((err, req, res, next) => {
  sendError(err, res);
});

//DB connection
const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!!");
  });

//Server connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
