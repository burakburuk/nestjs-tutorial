import { DataSource } from 'typeorm';
import { getDbConfig } from './common/providers/db-config.util';

export default new DataSource(getDbConfig());
