import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ChatGPTAPI as IChatGPTAPI, ChatMessage } from 'chatgpt';
import { EnvService } from '../env';
import { AIChatGenerator } from './interface/ai-chat-generator';

@Injectable()
export class AIChat implements AIChatGenerator, OnModuleInit {
  private API: IChatGPTAPI;

  constructor(
    private envService: EnvService) {
  }

  async onModuleInit() {
    const importDynamic = new Function('modulePath', 'return import(modulePath)')
    const { ChatGPTAPI } = await importDynamic('chatgpt')

    this.API = new ChatGPTAPI({
      apiKey: this.envService.get('OPENAI_API_KEY'),
    });
  }

  async ask(question: string): Promise<ChatMessage | null> {
    try {
      const response = await this.API.sendMessage(question);
      return response;
    } catch (e) {
      throw new InternalServerErrorException('Was not possible to generate the answers');
    }

    return null;
  }
}
