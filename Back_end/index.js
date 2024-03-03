import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import book from "./model/bookModel.js";
import bookRouter from "./Routes/bookRouter.js";
// const cors = require("cors");
import cors from "cors";

const app = express();
app.use(express.json());
app.use("/books", bookRouter);

//Middleware for handling CORS Policy
//app.use(cors());
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     alloweHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  return response.status(232).send("Hello Bhaiio.....");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected to database ");
  })
  .catch((err) => {
    console.log("Mongoose is not connect", err);
  });

app.listen(PORT, () => {
  console.log(`Connetct With Server ... with ${PORT}`);
});
