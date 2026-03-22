import fs from 'fs';
import type { Book, BookData } from '../types.ts';

const FILE_DIR = './data/';

const fileHandler = {
  async saveOrUpdate(path: string, file: Book): Promise<{ message: string } | { error: unknown } | undefined> {
    const fullPath = FILE_DIR + path;
    let data: BookData;
    try {
      const res = await fs.promises.readFile(fullPath, 'utf8');
      const obj: BookData = JSON.parse(res);
      const isAlreadyExists = obj.table.filter((f) => f.id === file.id);
      if (!isAlreadyExists.length) {
        obj.table.push(file);
        await fs.promises.writeFile(fullPath, JSON.stringify(obj), 'utf8');
        return { message: 'File updated' };
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        data = { table: [file] };
        await fs.promises.writeFile(fullPath, JSON.stringify(data));
        return { message: 'File created' };
      } else {
        console.log(err);
        return { error: err };
      }
    }
  },

  async readJSON(path: string): Promise<BookData | Error> {
    try {
      const data = await fs.promises.readFile(FILE_DIR + path, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return err as Error;
    }
  },

  async deleteFromFile(path: string, id: number | string): Promise<{ message: string }> {
    const fullPath = FILE_DIR + path;
    const res = await fs.promises.readFile(fullPath, 'utf8');
    const obj: BookData = JSON.parse(res);
    const updatedList = obj.table.filter((f) => f.id != id);
    const data: BookData = { table: updatedList };
    await fs.promises.writeFile(fullPath, JSON.stringify(data), 'utf8');
    return { message: 'Item deleted' };
  },
};

export default fileHandler;
