import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
})

const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

type InsertUser = typeof usersTable.$inferInsert
type SelectUser = typeof usersTable.$inferSelect
type InsertPost = typeof postsTable.$inferInsert
type SelectPost = typeof postsTable.$inferSelect

export type { InsertPost, InsertUser, SelectPost, SelectUser }
export { postsTable, usersTable }