require("dotenv").config();
//adding dependencies
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//socket importing

//importing database
const { connectDB } = require("./config/database");

//port assignment
const PORT = 3990;

//creating app
const app = express();

//importing routes
const userRouter = require("./api/routes/users.routes");
const twilioRouter = require("./api/routes/twilio.routes");
const appointmentRouter = require("./api/routes/appointments.routes");
const patientRouter = require("./api/routes/patients.routes");
const analyticRouter = require("./api/routes/analytics.routes");
const { listenEvents } = require("./socket");
// const socket = require("./socket");

//database connection
connectDB();

//getting data
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

//using cookie
app.use(cookieParser());

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

//using routes
//testing route
app.get("/", (req, res) => {
  res.status("200").json({
    msg: "server connected",
  });
});

app.use("/users", userRouter);

app.use("/twilio", twilioRouter);

app.use("/appointment", appointmentRouter);

app.use("/patients", patientRouter);

app.use("/analytics", analyticRouter);

//creating server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

listenEvents(io);

//listening server
server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
