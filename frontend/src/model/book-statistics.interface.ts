import ItemCount from "./item-count.interface";
import Book from "./book.interface";

export default interface BookStatistics {
  numberOfBooks: number;
  topTenFavoriteAuthors: ItemCount[];
  topTenBooksPerReleaseYear: { year: string; count: number }[];
  mostRatedBooks: Book[];
  topRatedBooks: Book[];
  topTenTags: ItemCount[];
}
