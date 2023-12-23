import express from "express";
const router = express.Router();
import { BookModel } from "../models/bookModels.js";

//Route to add new book
router.post("/addBooks", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.statusCode(400).send({
        message: "Please Send all the required file",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await BookModel.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Route to get all the books
router.get("/getAllBooks", async (req, res) => {
  try {
    const allBooks = await BookModel.find({});
    return res.status(200).json({
      count: allBooks.length,
      data: allBooks,
    });
  } catch (err) {
    console.log(err);
  }
});

//Route to get a single book by ID
router.get("/getBookByID/:id", async (req, res) => {
  try {
    const bookID = req.params.id;
    const book = await BookModel.find({ _id: bookID });
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//Route to update a book by id
router.put("/updateABook/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all the required field: title, author, publishyear",
      });
    }
    const bookID = req.params.id;
    const bookById = await BookModel.findByIdAndUpdate(bookID, req.body);

    if (!bookById) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//Route to delete a book by ID
router.delete("/deleteBookById/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const newBooks = await BookModel.findByIdAndDelete(bookId);
    if (!newBooks) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book is deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

export default router;
