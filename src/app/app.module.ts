import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';
import { getEnvPath } from '../common/providers/env.util';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { HealthModule } from '../health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { getDbConfig } from '../common/providers/db-config.util';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => getDbConfig(),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    TasksModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    { provide: APP_GUARD, useClass: AuthGuard, scope: Scope.REQUEST },
  ],
})
export class AppModule {}
