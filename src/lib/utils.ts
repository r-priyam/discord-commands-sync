import type { PathLike } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function readEnv(pathLike: PathLike) {
  return readFile(pathLike, { encoding: 'utf-8' });
}

const LINE =
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

// https://github.com/motdotla/dotenv/blob/master/lib/main.js#L8
export function parseEnv(src: string) {
  const obj: Record<string, string> = {};

  let lines = src;
  lines = lines.replace(/\r\n?/gm, '\n');

  let match;
  while ((match = LINE.exec(lines)) !== null) {
    const key = match[1];
    let value = match[2] || '';
    value = value.trim();

    const maybeQuote = value[0];

    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, '$2');

    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n');
      value = value.replace(/\\r/g, '\r');
    }

    // Add to object
    obj[key] = value;
  }

  return obj;
}
