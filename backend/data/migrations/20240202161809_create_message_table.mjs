/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema
    .createTable('messages', function (table) {
      table.text('UUID').notNullable().primary()
      table.text('author').notNullable().defaultTo('')
      table.text('tags').notNullable().defaultTo('')
      table.text('content').notNullable().defaultTo('')
      table.timestamps(true, true, false)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('messages')
}
