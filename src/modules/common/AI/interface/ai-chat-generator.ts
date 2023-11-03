import { ChatMessage } from "chatgpt";

export abstract class AIChatGenerator {
    abstract ask(question: string): Promise<ChatMessage | null>
}