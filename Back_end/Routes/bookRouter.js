import express from "express";
const router = express.Router();
import book from "../model/bookModel.js";
import cors from "cors";
import multer from "multer";
import fs from "node:fs";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})

const maxSize = 1 * 1000 * 1000;
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})
router.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
router.use(express.json());
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});
router.post("/", upload.single('file'), async (request, response) => {
  const { originalname, path } = request.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

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

    const { author, title, publishYear } = request.body;
    const newBooks = await book.create({
      title,
      author,
      publishYear,
      cover: newPath,
    });


    response.send({ status: "ok" });
    console.log(newBooks);
    return response.json()
    // return response.status(201).send(newBooks);
  } catch (error) {
    console.log("ok error :", error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", cors(), async (request, response) => {
  try {
    const Books = await book.find();
    console.log(Books)
    return response.status(200).json({
      count: Books.length,
      data: Books,
    });
  } catch (error) {
    //console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", cors(), async (request, response) => {
  try {
    const { id } = request.params;
    const Book = await book.findById(id);
    return response.status(200).json(Book);
  } catch (error) {
    //console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", cors(), async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.file
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
    //console.log(error);
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
    //console.log(error.message);
    response.status(500).send({ message: "Book is not find" });
  }
});



export default router;


