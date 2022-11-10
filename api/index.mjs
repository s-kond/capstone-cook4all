import express from "express";
import bodyParser from "body-parser";
import userDataRoutes from "./routes/Userdata.js";

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

app.use("/api/users", userDataRoutes);

app.listen(app.get("port"), () => {
  console.log(`Node app listening on port ${app.get("port")}`);
});
