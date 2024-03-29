import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { AppConfigService } from '../common/services/app.config.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [AppConfigService],
})
export class HealthModule {}
