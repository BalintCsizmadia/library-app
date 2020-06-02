import express from 'express';
import bookService from '../service/book-service';
var router = express.Router();

/**
 * @param search string
 */
router.get("/", async function (req, res, next) {
  const search = req.query.search;
  const books = await bookService.getBySearhTerm(search);
  res.status(200).send(books);
});

/**
 * @returns a list of books
 */
router.get("/my-books", async function (req, res, next) {
  const books = bookService.getBooks();
  if (books && !books.errno) {
    res.status(200).send({ books });
  } else {
    res.status(500).send({ error: books.errno });
  }
});

router.get("/statistics", async function (req, res, next) {
  const result = await bookService.getStatistics();
  if (result && result.statistics) {
    res.status(200).send(result);
  } else {
    res.status(500).send({ data: { statistics: null,  error: result.data.errno } }); // -2 = no such file or directory
  }
});

/**
 * @param id number
 */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const result = await bookService.getById(id);
  res.status(200).send(result);
});

/**
 * @param book Book
 */
router.post("/:id", async function (req, res, next) {
  const book = req.body.book;
  bookService.saveToFile(book);
  res.status(200).send({ message: "status message here" });
});

/**
 * @param id number
 */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  bookService.delete(id);
  res.status(200).send({ message: "status message" });
});

module.exports = router;
