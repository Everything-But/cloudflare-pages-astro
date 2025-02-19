import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../db'
import { usersTable, postsTable, type SelectUser } from '../db/schema'

const getUsers = async (): Promise<Array<{ id: number; name: string; age: number; email: string }>> => {
  return db.select().from(usersTable)
}

const getUserById = async ({ id }: { id: SelectUser['id'] }): Promise<Array<{ id: number; name: string; age: number; email: string }>> => {
  return db.select().from(usersTable).where(eq(usersTable.id, id))
}

const getUsersWithPostsCount = async ({ page = 1, pageSize = 5 }): Promise<Array<{ postsCount: number, id: number, name: string, age: number, email: string}>> => {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
}

const getPostsForLast24Hours = async ({ page = 1, pageSize = 5 }): Promise<Array<{ id: number, title: string }>> => {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title,
    })
    .from(postsTable)
    .where(between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`))
    .orderBy(asc(postsTable.title), asc(postsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
}

export { getUsers, getUserById, getPostsForLast24Hours, getUsersWithPostsCount }
