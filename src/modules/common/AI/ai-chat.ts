import { Injectable } from '@nestjs/common'
import { AIChatGenerator } from './interface/ai-chat-generator'

@Injectable()
export class AIChat implements AIChatGenerator {
  constructor(private aIChatGenerator: AIChatGenerator) { }

  ask(question: string): Promise<string> {
    return this.aIChatGenerator.ask(question)
  }
}
