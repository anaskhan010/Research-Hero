// libss
var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

// routes
var organizationRoutes = require("./routes/organization/organizationRoutes.js");
var authRoutes = require("./routes/auth/authRoutes.js");
var scheduleRoutes = require("./routes/schedules/scheduleRoutes.js");
var medicineRoutes = require("./routes/medication/medicineRoutes.js");
var patientVideoRoutes = require("./routes/patientVideos/patientVideoRoutes.js");
var roleRoutes = require("./routes/role/roleRoutes.js");
var surveyRoutes = require("./routes/survey/surveyRoutes.js");
var notiificationMiddleware = require("./middleware/notificationMIddleware.js");
const notificationRoutes = require("./routes/notification/notificationRoutes");
// config
dotenv.config({ path: "./config/Config.env" });
notiificationMiddleware.init();
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: "HJSDHDSLDLSDJSL",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static("public"));

app.use("/organization", organizationRoutes);
app.use("/auth", authRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/medicine", medicineRoutes);
app.use("/survey", surveyRoutes);
app.use("/role", roleRoutes);

// Add video upload route
app.use("/patientVideo", patientVideoRoutes);
app.use("/notification", notificationRoutes);
app.listen(process.env.PORT, function () {
  console.log("Server is running on port " + process.env.PORT);
});
