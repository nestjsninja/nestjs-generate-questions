import { Module } from '@nestjs/common';
import { AIChatGenerator } from './interface/ai-chat-generator';
import { AIChat } from './ai-chat';
import { EnvModule } from '../env';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: AIChatGenerator,
      useClass: AIChat
    },
  ],
  exports: [AIChatGenerator],
})
export class AIModule { }
