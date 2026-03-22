import fileHandler from '../common/file-handler.ts';
import statisticsService from './statistics-service.ts';
import { apiClient, API_KEY } from '../common/api-client.ts';
import type { Book, BookData } from '../types.ts';

const bookService = {
  getBySearhTerm: async (search: string | string[] | undefined): Promise<unknown> => {
    if (search) {
      const q = Array.isArray(search) ? search.join(' ') : search;
      return apiClient.get('books.json', { searchParams: { q, key: API_KEY } }).json();
    } else {
      return new Error('Invalid input');
    }
  },

  getById: async (id: string): Promise<unknown> => {
    return apiClient.get(`book/${id}.json`, { searchParams: { key: API_KEY } }).json();
  },

  getStatistics: async (): Promise<{ statistics: object } | { errno: unknown }> => {
    const data = await bookService.getBooks();
    if (data && !(data as NodeJS.ErrnoException).errno) {
      const bookData = data as BookData;
      const numberOfBooks = bookData.table.length;

      const topTenBooksPerReleaseYear = statisticsService
        .countBooksPerReleaseYear(bookData.table)
        .slice(0, 10);
      const topTenFavoriteAuthors = statisticsService
        .countAuthors(bookData.table)
        .slice(0, 10);

      const topTenTags = statisticsService.countTags(bookData.table).slice(0, 10);

      const mostRatedBooks = [...bookData.table]
        .sort((a: Book, b: Book) => b.like_count - a.like_count)
        .slice(0, 6);

      const topRatedBooks = [...bookData.table]
        .sort((a: Book, b: Book) => b.like_average - a.like_average)
        .slice(0, 6);

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
      return { errno: (data as NodeJS.ErrnoException).errno };
    }
  },

  saveToFile: (book: Book): Promise<{ message: string } | { error: unknown } | undefined> => {
    if (book) {
      return fileHandler.saveOrUpdate('data.json', book);
    } else {
      throw new Error('Invalid parameter');
    }
  },

  getBooks: (): Promise<BookData | Error> => {
    return fileHandler.readJSON('data.json');
  },

  delete: (id: number | string): Promise<{ message: string }> => {
    return fileHandler.deleteFromFile('data.json', id);
  },
};

export default bookService;
