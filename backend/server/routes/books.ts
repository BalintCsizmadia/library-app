import Router from '@koa/router';
import type { Context } from 'koa';
import bookService from '../service/book-service.ts';

const router = new Router({ prefix: '/books' });

router.get('/', async (ctx: Context) => {
  const search = ctx.query.search;
  const books = await bookService.getBySearhTerm(search);
  ctx.status = 200;
  ctx.body = books;
});

router.get('/my-books', async (ctx: Context) => {
  const books = await bookService.getBooks();
  if (books && !(books as NodeJS.ErrnoException).errno) {
    ctx.status = 200;
    ctx.body = { books };
  } else {
    ctx.status = 500;
    ctx.body = { error: (books as NodeJS.ErrnoException).errno };
  }
});

router.get('/statistics', async (ctx: Context) => {
  const result = await bookService.getStatistics();
  if (result && (result as { statistics: object }).statistics) {
    ctx.status = 200;
    ctx.body = result;
  } else {
    ctx.status = 500;
    ctx.body = { data: { statistics: null, error: (result as { errno: unknown }).errno } };
  }
});

router.get('/:id', async (ctx: Context) => {
  const id = ctx.params.id;
  const result = await bookService.getById(id);
  ctx.status = 200;
  ctx.body = result;
});

router.post('/:id', async (ctx: Context) => {
  const book = (ctx.request.body as { book: Parameters<typeof bookService.saveToFile>[0] }).book;
  bookService.saveToFile(book);
  ctx.status = 200;
  ctx.body = { message: 'status message' };
});

router.delete('/:id', async (ctx: Context) => {
  const id = ctx.params.id;
  bookService.delete(id);
  ctx.status = 200;
  ctx.body = { message: 'status message' };
});

export default router;
