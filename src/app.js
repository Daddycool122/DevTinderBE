const express = require("express");
const { connectDb } = require("./config/database");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's actual origin
  methods: "GET , POST , PUT,  PATCH , DELETE", //  Include 'PATCH' her
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], //  Specify allowed headers
};

//  Enable CORS with options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Database Connection and Server Start
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
