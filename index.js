// libss
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

// routes
import patientRoutes from "./routes/patient/patientRoutes.js";
import authRoutes from "./routes/auth/authRoutes.js";
import scheduleRoutes from "./routes/schedules/scheduleRoutes.js";
import medicineRoutes from "./routes/medication/medicineRoutes.js";
import patientVideoRoutes from "./routes/patientVideos/patientVideoRoutes.js";
import surveyRoutes from "./routes/survey/surveyRoutes.js";
// config
dotenv.config({ path: "./config/Config.env" });
const app = express();
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

app.use("/patient", patientRoutes);
app.use("/auth", authRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/medicine", medicineRoutes);
app.use("/survey", surveyRoutes);

// Add video upload route
app.use("/patientVideo", patientVideoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
