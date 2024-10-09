// import lib
import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// import file
import { routesV1 } from "./api/v1/routes/index.route";
import connectDB from "./database/connect";

// config env
dotenv.config();

// app
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
routesV1(app);

app.get("/", (req, res) => {
  res.send("Hello, World abc!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
