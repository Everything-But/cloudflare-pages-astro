import { eq } from 'drizzle-orm'
import { db } from '../db'
import { postsTable, type SelectPost } from '../db/schema'

const updatePost = async ({ id, data }: { id: SelectPost['id']; data: Partial<Omit<SelectPost, 'id'>> }) => {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id))
}

export { updatePost }
