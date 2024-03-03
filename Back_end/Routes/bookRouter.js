import express from "express";
const router = express.Router();
import book from "../model/bookModel.js";
import cors from "cors";
//app.use(cors());

router.post("/", cors(), async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "sed all required field :title,author,publishYear",
      });
    }
    const newBooks = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const Book = await book.create(newBooks);
    await Book.save();
    return response.status(201).send(Book);
  } catch (error) {
    console.log("ok error :", error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", cors(), async (request, response) => {
  try {
    const Books = await book.find();
    return response.status(200).json({
      count: Books.length,
      data: Books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", cors(), async (request, response) => {
  try {
    const { id } = request.params;
    const Book = await book.findById(id);
    return response.status(200).json(Book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", cors(), async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required field :title,author,publishYear",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book update successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  //console.log("Clicked Delete Methode");
  try {
    const { id } = request.params;
    const result = await book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book not Found" });
    }
    return response.status(200).json({ message: "Book deleie successfully " });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Book is not find" });
  }
});

export default router;
