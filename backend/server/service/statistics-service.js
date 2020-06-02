const statisticsService = {
  /**
   * @param list Array of objects
   * @param field string name of the object's key
   * @description count key-value pairs on given field
   * @returns Object(s) where key is the field's value and value is the counted result
   */
  countObject: (list, field) => {
    let res = {};
    list.map((item) => {
      if (item) {
        res[item[field]] = (res[item[field]] || 0) + 1;
      }
    });
    return res;
  },

  /**
   * @param object Object
   * @param field string name of the key (e.g. "year")
   * @param order string "asc" / "desc"
   * @example input: object: { "2000": 10, "2000": 3 }; output: [{ year:"2000", count: 2 }]
   */
  sortByValue: (object, fieldName, order) => {
    var sortedArray = [];
    for (let i in object) {
      if (i !== "null") {
        sortedArray.push({ [fieldName]: i, count: object[i] });
      }
    }
    if (order && order.toLowerCase() === "desc") {
      return sortedArray.sort((a, b) => b.count - a.count);
    } else if (order && order.toLowerCase() === "asc") {
      return sortedArray.sort((a, b) => a.count - b.count);
    } else {
      return sortedArray.sort((a, b) => a.count - b.count);
    }
  },

  countBooksPerReleaseYear: (list) => {
    const booksPerReleaseYear = statisticsService.countObject(
      list,
      "year_of_publishing"
    );
    return statisticsService.sortByValue(booksPerReleaseYear, "year", "desc");
  },

  countAuthors: (list) => {
    const authors = list.map((l) => l.authors[0]);
    const countedAuthors = statisticsService.countObject(authors, "name");
    return statisticsService.sortByValue(countedAuthors, "name", "desc");
  },

  countTags: (list) => {
    let allTags = [];
    list.map((l) => {
      l.tags.map((tag) => {
        allTags.push(tag);
      });
    });
    const countedTags = statisticsService.countObject(allTags, "name");
    return statisticsService.sortByValue(countedTags, "name", "desc");
  },
};

export default statisticsService;
