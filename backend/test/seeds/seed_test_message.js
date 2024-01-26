const crypto = require('node:crypto')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('messages').del()
  // load file
  const seedData = require('../json/items3.json')
  const dataToInsert = []
  seedData.forEach((el) => {
    dataToInsert.push({
      UUID: crypto.randomUUID(),
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
