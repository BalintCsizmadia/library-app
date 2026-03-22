import fs from 'fs';
import fileHandler from '../common/file-handler.ts';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

const mockReadFile = fs.promises.readFile as jest.Mock;
const mockWriteFile = fs.promises.writeFile as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fileHandler.readJSON', () => {
  it('returns parsed JSON on success', async () => {
    mockReadFile.mockResolvedValue('{"table":[]}');
    const result = await fileHandler.readJSON('data.json');
    expect(result).toEqual({ table: [] });
    expect(mockReadFile).toHaveBeenCalledWith('./data/data.json', 'utf8');
  });

  it('returns error on read failure', async () => {
    const err = new Error('read error');
    mockReadFile.mockRejectedValue(err);
    const result = await fileHandler.readJSON('data.json');
    expect(result).toBe(err);
  });
});

describe('fileHandler.saveOrUpdate', () => {
  it('creates a new file when it does not exist', async () => {
    const enoentErr = Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    mockReadFile.mockRejectedValue(enoentErr);
    mockWriteFile.mockResolvedValue(undefined);

    const result = await fileHandler.saveOrUpdate('data.json', { id: 1, title: 'Test' } as any);
    expect(result).toEqual({ message: 'File created' });
    expect(mockWriteFile).toHaveBeenCalledWith(
      './data/data.json',
      JSON.stringify({ table: [{ id: 1, title: 'Test' }] })
    );
  });

  it('appends to existing file when item is new', async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ table: [{ id: 1 }] }));
    mockWriteFile.mockResolvedValue(undefined);

    const result = await fileHandler.saveOrUpdate('data.json', { id: 2, title: 'New' } as any);
    expect(result).toEqual({ message: 'File updated' });
    expect(mockWriteFile).toHaveBeenCalledWith(
      './data/data.json',
      JSON.stringify({ table: [{ id: 1 }, { id: 2, title: 'New' }] }),
      'utf8'
    );
  });

  it('does not duplicate existing item', async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ table: [{ id: 1 }] }));
    mockWriteFile.mockResolvedValue(undefined);

    await fileHandler.saveOrUpdate('data.json', { id: 1 } as any);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });
});

describe('fileHandler.deleteFromFile', () => {
  it('removes the item with matching id and writes back', async () => {
    mockReadFile.mockResolvedValue(JSON.stringify({ table: [{ id: 1 }, { id: 2 }] }));
    mockWriteFile.mockResolvedValue(undefined);

    const result = await fileHandler.deleteFromFile('data.json', 1);
    expect(result).toEqual({ message: 'Item deleted' });
    expect(mockWriteFile).toHaveBeenCalledWith(
      './data/data.json',
      JSON.stringify({ table: [{ id: 2 }] }),
      'utf8'
    );
  });
});
