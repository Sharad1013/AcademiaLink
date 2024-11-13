import express from "express";
const app = express();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});

// db connection
import connectDb from "./utils/db.js";

// routes
import authRoutes from "./routes/authRoutes.js";
// import classroomRoutes from "./routes/classroomRoutes.js";

const PORT = process.env.PORT;

const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed By CORS"));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.json()); // express.json()
app.use(
  cookieParser({
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    signed: true,
  })
);

// routehandlers
app.use("/auth", authRoutes);
// app.use("/class", classroomRoutes);

app.get("/", (req, res) => {
  res.send("Hello from AcademiaLink");
});

// ensures that Server is up only if the DB connection is successful.
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Up at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Errror in Server start at index.js ${error}`);
  });
