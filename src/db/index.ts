import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

config({ path: '.env.local' })

const sql = neon(process.env.NEON_DATABASE_URL!)
const db = drizzle({ client: sql })

export { db }
