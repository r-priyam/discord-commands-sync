import type { PathLike } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function readEnv<T>(pathLike: PathLike): Promise<T> {
  return (await readFile(pathLike, { encoding: 'utf-8' })) as unknown as T;
}
