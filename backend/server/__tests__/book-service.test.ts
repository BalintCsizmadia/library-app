import fileHandler from '../common/file-handler.ts';

jest.mock('../common/file-handler.ts');

jest.mock('../common/api-client.ts', () => ({
  apiClient: { get: jest.fn() },
  API_KEY: 'test-key',
}));

import { apiClient } from '../common/api-client.ts';
import bookService from '../service/book-service.ts';

const mockGet = apiClient.get as jest.Mock;
const mockFileHandler = fileHandler as jest.Mocked<typeof fileHandler>;
const mockApiResponse = (data: unknown) => ({ json: () => Promise.resolve(data) });

beforeEach(() => {
  jest.clearAllMocks();
});

describe('bookService.getBySearhTerm', () => {
  it('returns data when search term provided', async () => {
    mockGet.mockReturnValue(mockApiResponse({ books: ['Harry Potter'] }));
    const result = await bookService.getBySearhTerm('harry');
    expect(result).toEqual({ books: ['Harry Potter'] });
  });

  it('returns Error when no search term', async () => {
    const result = await bookService.getBySearhTerm('');
    expect(result).toBeInstanceOf(Error);
  });

  it('returns Error when search term is undefined', async () => {
    const result = await bookService.getBySearhTerm(undefined);
    expect(result).toBeInstanceOf(Error);
  });
});

describe('bookService.getById', () => {
  it('fetches book by id', async () => {
    mockGet.mockReturnValue(mockApiResponse({ id: 42, title: 'Dune' }));
    const result = await bookService.getById('42');
    expect(result).toEqual({ id: 42, title: 'Dune' });
  });
});

describe('bookService.getStatistics', () => {
  it('returns statistics on success', async () => {
    const books = [
      {
        year_of_publishing: '2000',
        authors: [{ name: 'Alice' }],
        tags: [{ name: 'sci-fi' }],
        like_count: 10,
        like_average: 4.5,
      },
    ];
    mockFileHandler.readJSON.mockResolvedValue({ table: books } as any);

    const result = await bookService.getStatistics();
    expect(result).toHaveProperty('statistics');
    expect((result as any).statistics.numberOfBooks).toBe(1);
  });

  it('returns errno on error', async () => {
    const err = Object.assign(new Error('read fail'), { errno: -2 });
    mockFileHandler.readJSON.mockResolvedValue(err);

    const result = await bookService.getStatistics();
    expect(result).toHaveProperty('errno');
  });
});

describe('bookService.saveToFile', () => {
  it('calls fileHandler.saveOrUpdate with book', () => {
    mockFileHandler.saveOrUpdate.mockResolvedValue({ message: 'File updated' });
    const book = { id: 1, title: 'Test' } as any;
    bookService.saveToFile(book);
    expect(mockFileHandler.saveOrUpdate).toHaveBeenCalledWith('data.json', book);
  });

  it('throws when no book passed', () => {
    expect(() => bookService.saveToFile(null as any)).toThrow('Invalid parameter');
  });
});

describe('bookService.delete', () => {
  it('calls fileHandler.deleteFromFile with id', () => {
    mockFileHandler.deleteFromFile.mockResolvedValue({ message: 'Item deleted' });
    bookService.delete(5);
    expect(mockFileHandler.deleteFromFile).toHaveBeenCalledWith('data.json', 5);
  });
});
