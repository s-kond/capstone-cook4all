import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userDataRoutes from "./routes/Userdata.js";

dotenv.config();
const app = express();

app.set("port", 8080);

//middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", userDataRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(app.get("port"), () => {
      console.log(`connected to DB & listening on port ${app.get("port")}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
