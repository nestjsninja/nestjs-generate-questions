import { EnvModule } from '@app/common';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { Modules } from './modules/module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    EnvModule,
    Modules
  ],
})
export class AppModule { }
