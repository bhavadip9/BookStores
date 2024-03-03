import { mongoose } from "mongoose";
import { mongoDBURL } from "./config";
import { Books } from "./model/bookModel";

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected to database ");
  })
  .catch((err) => {
    console.log("Mongoose is not connect", err);
  });
