import fileHandler from "../common/file-handler";
import statisticsService from "./statistics-service";
var axios = require("axios");

const axiosConfig = {
  baseURL: process.env.API_URL,
  timeout: 1500,
};
const axiosInst = axios.create(axiosConfig);
const KEY = process.env.API_KEY;

const bookService = {
  getBySearhTerm: async (search) => {
    const { data } = await axiosInst.get(`/books.json`, {
      params: { q: search, key: KEY },
    });
    return data;
  },

  getById: async (id) => {
    const { data } = await axiosInst.get(`/book/${id}.json`, {
      params: { key: KEY },
    });
    return data;
  },

  getStatistics: async () => {
    const data = bookService.getBooks();
    if (data && !data.errno) {
      const numberOfBooks = data.table.length;

      const topTenBooksPerReleaseYear = statisticsService
        .countBooksPerReleaseYear(data.table)
        .slice(0, 10);
      const topTenFavoriteAuthors = statisticsService
        .countAuthors(data.table)
        .slice(0, 10);

      const topTenTags = statisticsService.countTags(data.table).slice(0, 10);

      const mostRatedBooks = data.table
        .sort((a, b) => b.like_count - a.like_count)
        .slice(0, 5);

      const topRatedBooks = data.table
        .sort((a, b) => b.like_average - a.like_average)
        .slice(0, 5);

      const statistics = {
        numberOfBooks,
        topTenBooksPerReleaseYear,
        topTenFavoriteAuthors,
        topTenTags,
        mostRatedBooks,
        topRatedBooks,
      };

      return { statistics };
    } else {
      return { errno: data.errno };
    }
  },

  saveToFile: (book) => {
    return fileHandler.saveOrUpdate("data.json", book);
  },

  getBooks: () => {
    return fileHandler.readJSON("data.json");
  },

  delete: (id) => {
    return fileHandler.deleteFromFile("data.json", id);
  },
};

export default bookService;
