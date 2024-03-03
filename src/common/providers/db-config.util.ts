import { getEnvPath } from './env.util';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: [getEnvPath()] });

// This functions is being used to get the database configuration
// for both the migration and the application.
// That's why it is not a module scoped function.
export const getDbConfig = (): DataSourceOptions => ({
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  logging: process.env.ENABLE_DB_LOGS === 'true',
  entities: ['/src/**/*.entity{.ts,.js}'], // where our entities reside
  migrations: ['/src/migrations/*{.ts,.js}'], // where our migrations reside
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
