import { existsSync } from 'fs';
import { dirname, join } from 'path';

const appDir = dirname(require.main.filename);
const dest = join(appDir, 'common', 'envs');

export function getEnvPath(): string {
  const env: string | undefined = process.env.NODE_ENV;

  const local: string = join(dest, '.env');
  if (local && existsSync(local)) {
    return local;
  }

  const filename: string = env ? `${env}.env` : '.env';
  const filePath: string = join(dest, filename);

  if (!existsSync(filePath)) {
    throw new Error('Env Config could not be found!');
  }

  return filePath;
}
