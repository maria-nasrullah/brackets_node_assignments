//adding dependencies
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

//importing database
const { connectDB } = require("./config/database");

//port assignment
const PORT = 3000;

//creating app
const app = express();

//importing routes
const userRouter = require("./api/routes/users.routes");

//database connection
connectDB();

//getting data
app.use(express.json({ extended: false }));

//using routes
app.use("/users", userRouter);

//creating server
const server = http.createServer(app);

/*  HANDLING CORS */
app.options("", cors()); // enable pre-flight request for ALL requests
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

/*  HANDLING CORS */
app.options("", cors()); // enable pre-flight request for ALL requests
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src *");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  next();
});

//listening server
server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
