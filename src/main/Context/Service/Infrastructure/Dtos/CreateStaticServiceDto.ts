import { z } from 'zod'

const CreateStaticServiceSchema = z.object({
  name: z.coerce.string(),
  slug: z.coerce.string(),
  projectPath: z.coerce.string(),
  rootDir: z.optional(z.coerce.string()),
  buildCommand: z.optional(z.coerce.string()),
  publishDir: z.optional(z.coerce.string()),
  port: z.coerce.number().min(1).max(65535),
  envVars: z.optional(
    z.array(
      z.object({
        key: z.coerce.string(),
        value: z.coerce.string()
      })
    )
  )
})

export default CreateStaticServiceSchema
