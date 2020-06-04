export default interface Book {
  id: number;
  authors: { id?: number; name: string }[];
  citations_count: number;
  cover: string;
  description: string;
  editors: any[];
  like_average: number;
  like_count: number;
  reviews_count: number;
  subtitle: string;
  tags: { id: number; name: string };
  title: string;
  url: string;
  year_of_publishing: number | string;
  authorsNames?: string;
}
