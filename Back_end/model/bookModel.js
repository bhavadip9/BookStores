import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
    cover: String,
  },
  {
    collection: "Books"
  }
);
const Book = mongoose.model("Books", bookSchema);
export default Book;
