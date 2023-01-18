import { CacheModule, Module } from '@nestjs/common';

import * as redisStore from 'cache-manager-redis-store';

import { DatabaseModule } from 'infra/database/database.module';
import { HttpModule } from 'infra/http/http.module';

@Module({
  imports: [
    CacheModule.register({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}
