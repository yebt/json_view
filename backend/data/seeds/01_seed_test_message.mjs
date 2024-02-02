import { randomUUID } from 'node:crypto'
import { readFileSync } from 'fs'

// import seedData from '../json/items3.json' with {type: 'json'}

/**
 * Seed the database with initial data.
 *
 * @param {Object} knex - The Knex instance for database operations
 * @return {Promise} A promise representing the completion of the seeding process
 */
export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('messages').del()

  const dataToInsert = []
  const seedData = JSON.parse(readFileSync('data/json/items3.json', 'utf8'))

  seedData.forEach((el) => {
    dataToInsert.push({
      UUID: randomUUID(),
      content: JSON.stringify({
        content: el.content,
        tag: el.tag,
        priority: el.priority,
        message: el.message
      }),
      created_at: el.created_at,
      updated_at: el.updated_at
    })
  })
  await knex('messages').insert(dataToInsert)
}
