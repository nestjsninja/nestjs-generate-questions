import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  OPENAI_API_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3000),
})

export type Env = z.infer<typeof envSchema>
