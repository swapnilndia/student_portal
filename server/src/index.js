import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connectDb.js";
import StudentRouter from "./routes/student.route.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/student", StudentRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server is listening at port:- ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection cannot be established");
  });

// General error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json(
      new ApiError(err.status || 500, err.message || "Internal Server Error")
    );
});
