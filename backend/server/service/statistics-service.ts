import type { Book, Author, Tag, CountResult } from '../types.ts';

interface SortedEntry {
  [key: string]: string | number;
  count: number;
}

const statisticsService = {
  countObject: (list: (Book | Author | Tag | null | undefined)[], field: string): CountResult => {
    const res: CountResult = {};
    list.map((item) => {
      if (item) {
        const key = (item as unknown as Record<string, string>)[field];
        res[key] = (res[key] || 0) + 1;
      }
    });
    return res;
  },

  sortByValue: (object: CountResult, fieldName: string, order?: string): SortedEntry[] => {
    const sortedArray: SortedEntry[] = [];
    for (const i in object) {
      if (i !== 'null') {
        sortedArray.push({ [fieldName]: i, count: object[i] });
      }
    }
    if (order && order.toLowerCase() === 'desc') {
      return sortedArray.sort((a, b) => b.count - a.count);
    } else if (order && order.toLowerCase() === 'asc') {
      return sortedArray.sort((a, b) => a.count - b.count);
    } else {
      return sortedArray.sort((a, b) => a.count - b.count);
    }
  },

  countBooksPerReleaseYear: (list: Book[]): SortedEntry[] => {
    const booksPerReleaseYear = statisticsService.countObject(list, 'year_of_publishing');
    return statisticsService.sortByValue(booksPerReleaseYear, 'year', 'desc');
  },

  countAuthors: (list: Book[]): SortedEntry[] => {
    const authors = list.map((l) => l.authors[0]);
    const countedAuthors = statisticsService.countObject(authors, 'name');
    return statisticsService.sortByValue(countedAuthors, 'name', 'desc');
  },

  countTags: (list: Book[]): SortedEntry[] => {
    const allTags: Tag[] = [];
    list.map((l) => {
      l.tags.map((tag) => {
        allTags.push(tag);
      });
    });
    const countedTags = statisticsService.countObject(allTags, 'name');
    return statisticsService.sortByValue(countedTags, 'name', 'desc');
  },
};

export default statisticsService;
