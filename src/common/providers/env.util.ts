import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;

  const local: string = resolve(`${dest}/.env`);
  if (local && existsSync(local)) {
    return local;
  }

  const filename: string = env ? `${env}.env` : '.env';
  const filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    throw new Error('Env Config could not be found!');
  }

  return filePath;
}
