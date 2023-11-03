
export abstract class AIChatGenerator {
    abstract ask(id: string): Promise<string | null>
}