export interface Author { name: string; }
export interface Tag { name: string; }
export interface Book {
  id: number | string;
  title: string;
  year_of_publishing: string;
  authors: Author[];
  tags: Tag[];
  like_count: number;
  like_average: number;
}
export interface BookData { table: Book[]; }
export interface CountResult { [key: string]: number; }
