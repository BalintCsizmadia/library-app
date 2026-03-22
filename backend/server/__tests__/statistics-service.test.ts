import statisticsService from '../service/statistics-service.ts';

describe('statisticsService.countObject', () => {
  it('counts values for a given field', () => {
    const list = [{ genre: 'fiction' }, { genre: 'fiction' }, { genre: 'fantasy' }];
    expect(statisticsService.countObject(list as any, 'genre')).toEqual({ fiction: 2, fantasy: 1 });
  });

  it('returns empty object for empty list', () => {
    expect(statisticsService.countObject([], 'genre')).toEqual({});
  });

  it('skips falsy items', () => {
    const list = [null, undefined, { genre: 'sci-fi' }];
    expect(statisticsService.countObject(list as any, 'genre')).toEqual({ 'sci-fi': 1 });
  });
});

describe('statisticsService.sortByValue', () => {
  const obj = { a: 3, b: 1, c: 2 };

  it('sorts ascending by default', () => {
    const result = statisticsService.sortByValue(obj, 'label');
    expect(result.map((r) => r.label)).toEqual(['b', 'c', 'a']);
  });

  it('sorts ascending when order=asc', () => {
    const result = statisticsService.sortByValue(obj, 'label', 'asc');
    expect(result.map((r) => r.label)).toEqual(['b', 'c', 'a']);
  });

  it('sorts descending when order=desc', () => {
    const result = statisticsService.sortByValue(obj, 'label', 'desc');
    expect(result.map((r) => r.label)).toEqual(['a', 'c', 'b']);
  });

  it('excludes null keys', () => {
    const result = statisticsService.sortByValue({ null: 5, x: 1 }, 'label');
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('x');
  });
});

describe('statisticsService.countBooksPerReleaseYear', () => {
  it('counts and sorts books by year descending', () => {
    const books = [
      { year_of_publishing: '2000' },
      { year_of_publishing: '2000' },
      { year_of_publishing: '1999' },
    ];
    const result = statisticsService.countBooksPerReleaseYear(books as any);
    expect(result[0]).toEqual({ year: '2000', count: 2 });
    expect(result[1]).toEqual({ year: '1999', count: 1 });
  });
});

describe('statisticsService.countAuthors', () => {
  it('counts authors by name descending', () => {
    const books = [
      { authors: [{ name: 'Alice' }] },
      { authors: [{ name: 'Alice' }] },
      { authors: [{ name: 'Bob' }] },
    ];
    const result = statisticsService.countAuthors(books as any);
    expect(result[0]).toEqual({ name: 'Alice', count: 2 });
  });
});

describe('statisticsService.countTags', () => {
  it('counts tags by name descending', () => {
    const books = [
      { tags: [{ name: 'sci-fi' }, { name: 'classic' }] },
      { tags: [{ name: 'sci-fi' }] },
    ];
    const result = statisticsService.countTags(books as any);
    expect(result[0]).toEqual({ name: 'sci-fi', count: 2 });
    expect(result[1]).toEqual({ name: 'classic', count: 1 });
  });
});
