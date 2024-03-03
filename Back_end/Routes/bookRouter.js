import express from "express";
const router = express.Router();
import book from "../model/bookModel.js";
import cors from "cors";

router.use(cors());

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

router.delete("/:id", cors(), async (request, response) => {
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

// import express from 'express';
// import Book from "../model/bookModel.js";
// import cors from "cors"

// const router = express.Router();
// router.use(cors())

// // Route for Save a new Book
// router.post('/', async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       });
//     }
//     const newBook = {
//       title: request.body.title,
//       author: request.body.author,
//       publishYear: request.body.publishYear,
//     };

//     const book = await Book.create(newBook);

//     return response.status(201).send(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Get All Books from database
// router.get('/', async (request, response) => {
//   try {
//     const books = await Book.find({});

//     return response.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Get One Book from database by id
// router.get('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const book = await Book.findById(id);

//     return response.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Update a Book
// router.put('/:id', async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       });
//     }

//     const { id } = request.params;

//     const result = await Book.findByIdAndUpdate(id, request.body);

//     if (!result) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book updated successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Delete a book
// router.delete('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book deleted successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// export default router;
