import { eq } from 'drizzle-orm'
import { db } from '../db'
import { usersTable, type SelectUser } from '../db/schema'

const deleteUser = async ({ id }: { id: SelectUser['id'] }) => {
  await db.delete(usersTable).where(eq(usersTable.id, id))
}

export { deleteUser }
