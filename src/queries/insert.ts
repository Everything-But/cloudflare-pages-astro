import { db } from '../db'
import { postsTable, usersTable, type InsertPost, type InsertUser } from '../db/schema'

const createUser = async (data: InsertUser) => {
  await db.insert(usersTable).values(data)
}

const createPost = async (data: InsertPost) => {
  await db.insert(postsTable).values(data)
}

export { createPost, createUser }
